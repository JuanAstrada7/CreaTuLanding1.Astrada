import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado');
      } else {
        setError('Error al crear la cuenta');
      }
      console.error('Error de registro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Crear Cuenta</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;