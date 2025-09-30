// Servicio de Notificaciones para Estados de Órdenes

export const sendStatusNotification = async (order, newStatus, userEmail) => {
  // Aquí puedes integrar servicios como EmailJS, SendGrid, etc.
  
  const notifications = {
    'pendiente': {
      subject: 'Orden Recibida - Capricho Pastelería',
      message: `¡Hola! Hemos recibido tu orden #${order.id.slice(-8)}. Pronto comenzaremos a prepararla.`
    },
    'en_preparacion': {
      subject: 'Tu orden está en preparación',
      message: `¡Buenas noticias! Tu orden #${order.id.slice(-8)} está siendo preparada por nuestros pasteleros.`
    },
    'enviado': {
      subject: 'Tu orden ha sido enviada',
      message: `Tu orden #${order.id.slice(-8)} está en camino. ¡Pronto podrás disfrutar de nuestros productos!`
    },
    'entregado': {
      subject: 'Orden entregada - ¡Esperamos que la disfrutes!',
      message: `Tu orden #${order.id.slice(-8)} ha sido entregada. ¡Gracias por elegir Capricho Pastelería!`
    },
    'cancelado': {
      subject: 'Orden cancelada',
      message: `Lamentamos informarte que tu orden #${order.id.slice(-8)} ha sido cancelada. Si tienes dudas, contáctanos.`
    }
  };

  const notification = notifications[newStatus];
  
  if (notification) {
    console.log(`📧 Enviando notificación a ${userEmail}:`);
    console.log(`Asunto: ${notification.subject}`);
    console.log(`Mensaje: ${notification.message}`);
    
    // Aquí integrarías el servicio real de email
    // Ejemplo con EmailJS:
    /*
    try {
      await emailjs.send(
        'your_service_id',
        'your_template_id',
        {
          to_email: userEmail,
          subject: notification.subject,
          message: notification.message,
          order_id: order.id.slice(-8),
          customer_name: order.buyer?.name || 'Cliente'
        },
        'your_user_id'
      );
    } catch (error) {
      console.error('Error enviando email:', error);
    }
    */
  }
};

export const getStatusMessages = () => ({
  'pendiente': {
    icon: '⏳',
    message: 'Tu orden está pendiente de procesamiento.',
    color: '#ffc107'
  },
  'en_preparacion': {
    icon: '👨‍🍳',
    message: 'Nuestros pasteleros están preparando tu orden.',
    color: '#17a2b8'
  },
  'enviado': {
    icon: '🚚',
    message: 'Tu orden está en camino.',
    color: '#007bff'
  },
  'entregado': {
    icon: '✅',
    message: '¡Tu orden ha sido entregada!',
    color: '#28a745'
  },
  'cancelado': {
    icon: '❌',
    message: 'Esta orden ha sido cancelada.',
    color: '#dc3545'
  }
});