import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/input';
import { Button } from '../components/button';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await signup(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', res.email);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
        <div className="relative">
          <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="button" className="absolute right-2 top-2 text-xs text-blue-600" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</Button>
        <div className="text-sm text-center">Already have an account? <a href="/login" className="text-blue-600">Login</a></div>
      </form>
    </div>
  );
};

export default Signup; 