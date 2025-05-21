import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/style.css';
import '../styles/style3.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const navigate = useNavigate();

  const passwordRules = [
    'Мінімум 8 символів',
    'Має містити принаймні одну велику літеру',
    'Має містити принаймні одну малу літеру',
    'Має містити принаймні одну цифру',
    'Має містити принаймні один спеціальний символ (@$!%*?&)'
  ];

  const validatePassword = (pwd) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(pwd);
  };

  const handlePasswordFocus = () => {
    setShowPasswordRules(true);
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setShowPasswordRules(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

  
    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    
    if (!validatePassword(password)) {
      setError('Пароль не відповідає вимогам');
      return;
    }

    try {
      
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          setError('Уппс, лапша уже раз була зварена');
          return;
        }
      } catch (fetchError) {
        console.error('Помилка перевірки email:', fetchError);
        setError('Не вдалося перевірити email. Спробуйте ще раз.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: '',
        phone: '',
        address: '',
      });
      navigate('/profile');
    } catch (err) {
      console.error('Помилка реєстрації:', err);
      setError('Не вдалося зареєструватися. Спробуйте ще раз.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            required
            className="register-input"
          />
          {showPasswordRules && (
            <div className="password-rules">
              <h4>Вимоги до паролю:</h4>
              <ul>
                {passwordRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Підтвердіть пароль</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="register-input"
          />
        </div>
        <button type="submit" className="register-submit-btn">
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;