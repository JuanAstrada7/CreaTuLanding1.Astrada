import { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import './Notification.css';

const Notification = () => {
  const { notification } = useCart();
  const toastRef = useRef(null);

  useEffect(() => {
    if (notification && toastRef.current) {
      const toast = window.bootstrap.Toast.getOrCreateInstance(toastRef.current);
      toast.show();
    }
  }, [notification]);

  return (
    <div
      className="toast-container position-fixed top-0 start-50 translate-middle-x p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        ref={toastRef}
        className="toast align-items-center bg-custom border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-delay="2000"
      >
        <div className="d-flex">
          <div className="toast-body">
            {notification}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Notification;