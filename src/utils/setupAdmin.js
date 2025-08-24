import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Función para convertir un usuario existente en administrador
export const setupAdmin = async (userEmail) => {
  try {
    // Primero necesitas obtener el UID del usuario por email
    // Esto requeriría una función adicional o hacerlo manualmente
    
    // Ejemplo de uso (reemplaza 'USER_UID' con el UID real del usuario):
    // await setDoc(doc(db, 'users', 'USER_UID'), {
    //   role: 'admin',
    //   updatedAt: new Date()
    // }, { merge: true });
    
    console.log('Para configurar un administrador:');
    console.log('1. Ve a Firebase Console > Firestore Database');
    console.log('2. Crea una colección llamada "users"');
    console.log('3. Crea un documento con el UID del usuario');
    console.log('4. Agrega un campo "role" con valor "admin"');
    console.log('5. Agrega un campo "email" con el email del usuario');
  } catch (error) {
    console.error('Error al configurar administrador:', error);
  }
};