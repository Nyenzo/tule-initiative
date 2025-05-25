'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('onAuthStateChanged fired:', firebaseUser); // Debug auth state changes
      if (firebaseUser) {
        try {
          const tokenResult = await getIdTokenResult(firebaseUser);
          // Use the full firebaseUser object and add custom claims
          setUser({
            ...firebaseUser, // Spread all properties including uid
            isAdmin: tokenResult.claims.isAdmin || false,
          });
        } catch (error) {
          console.error('Error fetching token result:', error);
          setUser(null); // Fallback if token fetch fails
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Auth state error:', error);
      setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}