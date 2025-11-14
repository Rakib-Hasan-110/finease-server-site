require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase Admin
const decoded = Buffer.from(process.env.FIREBASE_SECRETE, "base64").toString("utf8");
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware
app.use(cors());
app.use(express.json());

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "unauthorized access" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.token_email = decodedToken.email;
    next();
  } catch (error) {
    return res.status(401).send({ message: "unauthorized access" });
  }
};

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@finease.g61kjt3.mongodb.net/?appName=FinEase`;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function run() {
  try {
    const db = client.db("fineaseDB");
    const transactions = db.collection("transactions");
    const users = db.collection("users");

    // Users routes
    app.post("/users", async (req, res) => {
      const { email } = req.body;
      const existing = await users.findOne({ email });
      if (existing) return res.send({ message: "User already exists" });
      const result = await users.insertOne(req.body);
      res.send(result);
    });

    app.patch("/users/:email", async (req, res) => {
      const filter = { email: req.params.email };
      const updateDoc = { $set: { name: req.body.name, photo: req.body.photo } };
      const result = await users.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Transactions routes (protected)
    app.get("/transactions", verifyFirebaseToken, async (req, res) => {
      const email = req.query.email;
      const data = await transactions.find({ user_email: email }).sort({ created_at: -1 }).toArray();
      res.send(data);
    });

    app.post("/transactions", verifyFirebaseToken, async (req, res) => {
      const result = await transactions.insertOne(req.body);
      res.send(result);
    });

    app.patch("/transactions/:id", verifyFirebaseToken, async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const updateDoc = { $set: req.body };
      const result = await transactions.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.delete("/transactions/:id", verifyFirebaseToken, async (req, res) => {
      const result = await transactions.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    app.get("/transactions/:id", verifyFirebaseToken, async (req, res) => {
      try {
        const result = await transactions.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ message: "Transaction not found" });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
      }
    });


    console.log("✅ MongoDB connected and routes ready");
  } finally {
    // Optional: client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => res.send("FinEase Server is running"));

app.listen(port, () => console.log(`Server running on port: ${port}`));
