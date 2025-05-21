import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Виправлено імпорт
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/style3.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/about');
    } catch (err) {
      setError('Не вдалося увійти. Перевірте email або пароль.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>
      </form>
      <p>
        <a href="/forgot-password">Забули пароль?</a>
      </p>
      <p>
        Немає акаунта? <a href="/register">Зареєструватися</a>
      </p>
    </div>
  );
}

export default Login;