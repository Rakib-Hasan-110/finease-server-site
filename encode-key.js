// encode-key.js
const fs = require("fs");
try {
    const key = fs.readFileSync("./finease-firebase-admin.json", "utf8");
    const base64 = Buffer.from(key).toString("base64");
    console.log(base64); // Copy this and paste into .env
} catch (err) {
    console.error("Failed to read/encode service account file:", err);
}
