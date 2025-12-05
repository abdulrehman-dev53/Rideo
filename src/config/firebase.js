const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

console.log("DEBUG Project ID:", process.env.FIREBASE_PROJECT_ID);


const admin = require("firebase-admin");
require("dotenv").config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (privateKey && privateKey.includes("\\n")) {
  privateKey = privateKey.replace(/\\n/g, "\n");
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

// 🔍 Sanity check
try {
  const app = admin.app();
  console.log("✅ Firebase initialized:", app.name); // should print [DEFAULT]
} catch (err) {
  console.error("❌ Firebase not initialized:", err);
}

const sendNotification = async ({ tokens = [], title, body, data = {} }) => {
  if (!tokens.length) return { success: false, message: "No tokens provided" };
  const message = {
    notification: { title, body },
    data,
    tokens,
  };
  const res = await admin.messaging().sendMulticast(message);
  return res;
};

module.exports = { admin, sendNotification };
