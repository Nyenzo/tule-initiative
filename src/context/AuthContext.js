'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, getIdTokenResult, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('onAuthStateChanged fired:', firebaseUser);
      if (firebaseUser) {
        try {
          const tokenResult = await getIdTokenResult(firebaseUser);
          setUser({
            ...firebaseUser,
            isAdmin: tokenResult.claims.isAdmin || false,
          });
        } catch (error) {
          console.error('Error fetching token result:', error);
          setUser(null);
        }
      } else {
        setUser(null);
        console.log('User set to null after logout');
      }
      setLoading(false);
    }, (error) => {
      console.error('Auth state error:', error);
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