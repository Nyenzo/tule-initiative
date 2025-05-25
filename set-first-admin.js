const admin = require('firebase-admin');

const serviceAccount = require('./tule-initiative-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setFirstAdmin(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true });
    console.log(`Success! ${email} is now an admin.`);
  } catch (error) {
    console.error('Error setting admin:', error);
  }
}

setFirstAdmin('alexisabwa@gmail.com');