var admin = require("firebase-admin");

var serviceAccount = require("../peldafeladat-firebase-adminsdk-klfpz-a57f922f4c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };
