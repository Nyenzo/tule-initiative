const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Function to set admin role for a user
exports.setAdminRole = functions.https.onCall(async (data, context) => {
  // Check if the caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to perform this action.');
  }

  // Check if the caller is an admin
  const callerUid = context.auth.uid;
  const callerClaims = await admin.auth().getUser(callerUid);
  if (!callerClaims.customClaims || !callerClaims.customClaims.isAdmin) {
    throw new functions.https.HttpsError('permission-denied', 'You must be an admin to perform this action.');
  }

  // Get the target user's email
  const { email } = data;
  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required.');
  }

  try {
    // Find the user by email
    const user = await admin.auth().getUserByEmail(email);
    // Set the isAdmin custom claim
    await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true });
    return { message: `Success! ${email} is now an admin.` };
  } catch (error) {
    throw new functions.https.HttpsError('internal', `Error setting admin role: ${error.message}`);
  }
});