import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/style3.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Лист для скидання пароля надіслано. Перевірте вашу пошту.');
      setTimeout(() => navigate('/login'), 3000); // Перенаправлення через 3 секунди
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('Користувача з таким email не знайдено.');
      } else {
        setError('Не вдалося надіслати лист для скидання пароля. Спробуйте ще раз.');
      }
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Скидання пароля</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleResetPassword} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgot-password-input"
            placeholder="Введіть ваш email"
          />
        </div>
        <button type="submit" className="forgot-password-submit-btn">
          Надіслати лист для скидання
        </button>
      </form>
      <p>
        <a href="/login">Повернутися до входу</a>
      </p>
    </div>
  );
}

export default ForgotPassword;