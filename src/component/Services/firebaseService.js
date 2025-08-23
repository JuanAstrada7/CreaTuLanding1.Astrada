import { collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { db, auth } from '../../firebaseConfig';

// Obtener órdenes de un usuario específico
export const getUserOrders = async (userId) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef, 
      where("userId", "==", userId),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      date: doc.data().date?.toDate()
    }));
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    throw error;
  }
};

// Obtener una orden específica
export const getOrderById = async (orderId) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      return { id: orderSnap.id, ...orderSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error al obtener orden:', error);
    throw error;
  }

};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Email de recuperación enviado correctamente' };
  } catch (error) {
    console.error('Error al enviar email de recuperación:', error);
    let message = 'Error al enviar email de recuperación';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No existe una cuenta con este email';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido';
        break;
      case 'auth/too-many-requests':
        message = 'Demasiados intentos. Intenta más tarde';
        break;
      default:
        message = 'Error al enviar email de recuperación';
    }
    
    throw new Error(message);
  }
};