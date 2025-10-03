import { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="password-reset-form-card">
        <div className="password-reset-header">
          <h1>Recuperar contraseña</h1>
          <p className="password-reset-subtitle">
            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {message && (
          <div className="success-alert" role="alert">
            {message}
          </div>
        )}

        {error && (
          <div className="error-alert" role="alert">
            {error}
          </div>
        )}

        <form className="password-reset-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-reset"
          >
            {loading ? 'ENVIANDO...' : 'Enviar email de recuperación'}
          </button>
        </form>

        <div className="password-reset-links">
          <Link to="/login" className="link-back">
            ← Volver al login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;