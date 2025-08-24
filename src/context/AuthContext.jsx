import { createContext, useContext, useState, useEffect } from 'react';
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

  // Función para obtener el rol del usuario desde Firestore
  const getUserRole = async (uid) => {
    try {
      console.log('Obteniendo rol para UID:', uid);
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Datos del usuario encontrados:', userData);
        const role = userData.role || 'user';
        console.log('Rol obtenido:', role);
        return role;
      }
      console.log('Usuario no encontrado en Firestore, rol por defecto: user');
      return 'user'; // Rol por defecto
    } catch (error) {
      console.error('Error al obtener rol del usuario:', error);
      return 'user';
    }
  };

  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Crear documento del usuario en Firestore con rol por defecto
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

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return userRole === 'admin';
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('AuthStateChanged - Usuario:', user);
      setUser(user);
      if (user) {
        console.log('Usuario autenticado, obteniendo rol...');
        const role = await getUserRole(user.uid);
        console.log('Rol establecido:', role);
        setUserRole(role);
      } else {
        console.log('Usuario no autenticado, rol establecido a null');
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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