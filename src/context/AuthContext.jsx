import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimeout = useRef(null);

  const getUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role || 'user';
        return role;
      }
      return 'user';
    } catch (error) {
      return 'user';
    }
  };

  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        displayName: name,
        role: 'user',
        createdAt: new Date()
      });
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = () => {
    return userRole === 'admin';
  };

  const startInactivityTimer = () => {
    clearTimeout(inactivityTimeout.current);
    inactivityTimeout.current = setTimeout(() => {
      logout();
      alert('Sesión cerrada por inactividad');
    }, 15 * 60 * 1000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const events = ['mousemove', 'keydown', 'click'];
      events.forEach(event =>
        window.addEventListener(event, startInactivityTimer)
      );
      startInactivityTimer();

      return () => {
        events.forEach(event =>
          window.removeEventListener(event, startInactivityTimer)
        );
        clearTimeout(inactivityTimeout.current);
      };
    }
  }, [user]);

  const value = {
    user,
    userRole,
    isAdmin,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};