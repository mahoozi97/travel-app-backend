// for sending notifications FCM

const admin = require('firebase-admin');
const serviceAccount = require('./p2trip-af0f3-firebase-adminsdk-fbsvc-d5442e0a15.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;