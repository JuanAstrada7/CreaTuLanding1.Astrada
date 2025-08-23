import { useState } from 'react';
import { resetPassword } from '../Services/firebaseService';
import './PasswordReset.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await resetPassword(email);
      setMessage('¡Email de recuperación enviado! Revisa tu bandeja de entrada.');
      setEmail('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-card">
        <h2>Recuperar Contraseña</h2>
        <p className="description">
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="tu@email.com"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? 'Enviando...' : 'Enviar Email de Recuperación'}
          </button>
        </form>

        <div className="mt-3 text-center">
          <a href="/login" className="text-decoration-none">
            ← Volver al login
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;