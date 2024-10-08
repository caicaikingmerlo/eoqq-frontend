"use client";
import { useState } from 'react';
import Link from 'next/link';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    const API_KEY = "asd";
    if (res.ok) {
      setSuccessMessage('Login successful!');
      localStorage.setItem('token',data.token);
      // const decoded = jwt.verify(localStorage.getItem('token'),API_KEY);
      // console.log(decoded)
      window.location = 'http://localhost:3000/use'
    } else {
      setErrorMessage(data.message || 'Login failed.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {/* Botão de cadastro */}
      <p>Não tem uma conta? <Link href="/register">Cadastre-se</Link></p>
    </div>
  );
}
