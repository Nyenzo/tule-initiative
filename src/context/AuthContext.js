'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, getIdTokenResult, signOut } from 'firebase/auth';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('onAuthStateChanged fired:', firebaseUser ? firebaseUser.uid : 'null', 'at:', new Date().toISOString());
      if (firebaseUser) {
        try {
          // Force token refresh to ensure auth state is stable
          await firebaseUser.getIdTokenResult(true);
          console.log('Token refreshed for UID:', firebaseUser.uid, 'Email:', firebaseUser.email);

          const userDocRef = doc(db, 'users', firebaseUser.uid);

          // Attempt to fetch document, handle permissions gracefully
          let userDoc;
          try {
            userDoc = await getDoc(userDocRef);
            console.log('User document fetch succeeded, exists:', userDoc.exists(), 'Data:', userDoc.data());
          } catch (fetchError) {
            console.warn('Failed to fetch user document due to permissions:', fetchError.message);
            userDoc = null;
          }

          let isAdmin = false;
          if (userDoc && userDoc.exists()) {
            isAdmin = userDoc.data().isAdmin === true;
            console.log('Existing user, isAdmin:', isAdmin);
          } else {
            console.log('User document not found, attempting to create for UID:', firebaseUser.uid, 'Email:', firebaseUser.email);
            try {
              await setDoc(userDocRef, {
                email: firebaseUser.email || 'unknown@example.com',
                isAdmin: false,
                createdAt: new Date().toISOString(),
              }, { merge: true });
              console.log('New user document created successfully at:', new Date().toISOString());
              // Re-fetch the document after creating
              userDoc = await getDoc(userDocRef);
              isAdmin = userDoc.exists() ? userDoc.data().isAdmin === true : false;
            } catch (writeError) {
              console.error('Write error during registration:', writeError.code, writeError.message, writeError.stack);
              throw writeError; // Propagate the error to fail gracefully
            }
          }

          setUser({
            ...firebaseUser,
            isAdmin: isAdmin,
          });
        } catch (error) {
          console.error('Auth or Firestore error during auth state change:', error.code, error.message, error.stack);
          setUser(null);
        }
      } else {
        setUser(null);
        console.log('User set to null after logout at:', new Date().toISOString());
      }
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error.code, error.message, error.stack);
      setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}