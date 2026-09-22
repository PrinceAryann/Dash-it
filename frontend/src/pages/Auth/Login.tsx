import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/animations/PageTransition';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('username', email); // OAuth2 expects 'username'
      formData.append('password', password);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (response.ok) {
        await checkAuth();
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google/login';
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-bg-base relative overflow-hidden">
        {/* Background glow elements */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px] -translate-y-1/2" />
        
        <div className="relative z-10 w-full max-w-md p-8 bg-bg-base/50 backdrop-blur-xl border border-border-base rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-text-primary">Welcome Back</h1>
            <p className="text-text-secondary mt-2">Sign in to your admin dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-bg-base border border-border-base rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-bg-base border border-border-base rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full py-3" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px bg-border-base flex-1" />
            <span className="text-text-secondary text-sm">OR</span>
            <div className="h-px bg-border-base flex-1" />
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-6 py-3"
            onClick={handleGoogleLogin}
            type="button"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
