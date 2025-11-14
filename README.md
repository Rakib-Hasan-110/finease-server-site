## 📋 Overview ##

FinEase Server is a robust backend API built with Node.js and Express that powers the FinEase personal finance management application. It provides secure RESTful APIs for managing financial transactions with Firebase authentication and MongoDB cloud database.

⚙️ **Server:** [FinEase Server Site](https://finease-server-snowy.vercel.app/)

## 🚀 Features ##

🔐 Firebase Authentication - Secure user authentication with JWT tokens

💰 Transaction Management - Full CRUD operations for income/expense tracking

🛡️ Security First - Protected routes with token verification

🗄️ MongoDB Integration - Cloud database with optimized queries

🌐 CORS Enabled - Cross-origin support for frontend applications

⚡ High Performance - Optimized for production deployment

📊 User Isolation - Users can only access their own data

## 🛠️ Tech Stack ##

Technology	    Purpose
Node.js	        Runtime Environment
Express.js	    Web Framework
MongoDB	        Database
Firebase Admin	Authentication
CORS	        Cross-Origin Support
Vercel	        Deployment Platform

## 📁 Project Structure ##

finease-server/
├── index.js              # Main server application
├── package.json          # Dependencies and scripts
├── vercel.json           # Vercel deployment configuration
├── .env                  # Environment variables (local)
└── README.md            # Project documentation

## 🔧 Installation & Setup ##

- Prerequisites

Node.js (v18 or higher)

MongoDB Atlas account

Firebase project with Service Account

Git

1. Clone and Setup

bash
# Clone the repository
git clone <repository-url>
cd finease-server

# Install dependencies

npm install

2. Environment Configuration

Create a .env file in the root directory:

env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
FIREBASE_SECRETE=your_base64_encoded_service_account

3. Firebase Setup

Go to Firebase Console

Select your project → Project Settings → Service Accounts

Click "Generate New Private Key"

Convert the downloaded JSON to base64:

bash

# Linux/Mac

base64 -i serviceAccountKey.json -w 0

# Windows PowerShell

[Convert]::ToBase64String([IO.File]::ReadAllBytes("serviceAccountKey.json"))
Copy the base64 string to FIREBASE_SECRETE in your .env

4. MongoDB Setup
Create a MongoDB Atlas account

Create a cluster and database

Create a database user and get connection string

Update DB_USER and DB_PASS in .env

🚀 Running the Server

Development Mode
bash
npm run dev
Production Mode
bash
npm start
Server runs on: http://localhost:5000



