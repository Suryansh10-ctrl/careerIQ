import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Eye, EyeOff, LogIn, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../services/api';
import steeringWheelImg from '../assets/steering_wheel.jpg';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('captain@careeriq.io');
  const [password, setPassword] = useState<string>('password123');
  const [name, setName] = useState<string>('Captain Explorer');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isRegisterMode) {
        const res = await api.register(email, password, name);
        if (res.success) {
          localStorage.setItem('careeriq_token', res.access_token);
          localStorage.setItem('careeriq_user', JSON.stringify(res.user));
          setSuccessMsg('Account registered successfully! Redirecting...');
          setTimeout(() => navigate('/roadmap'), 800);
        } else {
          setErrorMsg(res.detail || res.message || 'Registration failed.');
        }
      } else {
        const res = await api.login(email, password);
        if (res.success) {
          localStorage.setItem('careeriq_token', res.access_token);
          localStorage.setItem('careeriq_user', JSON.stringify(res.user));
          setSuccessMsg('Login successful! Redirecting to roadmap...');
          setTimeout(() => navigate('/roadmap'), 800);
        } else {
          setErrorMsg(res.detail || res.message || 'Invalid email or password.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error connecting to backend authentication service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040810] flex items-center justify-center p-6 relative font-serif">
      
      {/* Return to Home link */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-[#ece4d0]/80 hover:text-[#e5c158] transition-colors text-xs font-semibold uppercase tracking-wider z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Split Card matching Image 3 Bottom Left */}
      <div className="w-full max-w-4xl bg-[#081220] rounded-3xl border border-[#c5a059]/40 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10">
        
        {/* Left Column: Steering Wheel Background Graphic */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-black/60 overflow-hidden">
          <img
            src={steeringWheelImg}
            alt="Steering Wheel"
            className="absolute inset-0 w-full h-full object-cover filter brightness-40 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040810] via-black/30 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1a1008] border border-[#c5a059] flex items-center justify-center text-[#e5c158]">
                <Compass className="w-5 h-5 text-[#e5c158]" />
              </div>
              <span className="text-xl font-serif font-bold text-[#f4f1de]">CareerIQ</span>
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <h3 className="text-2xl font-serif font-bold text-[#f4f1de]">
              Chart Your Skills.
            </h3>
            <p className="text-xs text-[#ece4d0]/80">
              Sign in to access your personalized learning roadmap and verified skill-gap insights.
            </p>
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-bold text-[#f4f1de]">
              {isRegisterMode ? 'Enlist with CareerIQ' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-[#ece4d0]/70">
              {isRegisterMode ? 'Create your account to start your journey' : 'Sign in to continue your journey'}
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegisterMode && (
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Captain Explorer"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#040810] border border-[#c5a059]/30 text-[#f4f1de] text-xs focus:border-[#e5c158] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#040810] border border-[#c5a059]/30 text-[#f4f1de] text-xs focus:border-[#e5c158] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">
                  Password
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={() => alert('Default demo password is password123')}
                    className="text-[10px] text-[#e5c158] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#040810] border border-[#c5a059]/30 text-[#f4f1de] text-xs focus:border-[#e5c158] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ece4d0]/60 hover:text-[#e5c158]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isRegisterMode && (
              <div className="flex items-center justify-between text-xs text-[#ece4d0]/70">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#c5a059]/40 bg-[#040810] text-[#e5c158]"
                  />
                  Remember me
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e5c158] via-[#c5a059] to-[#d4af37] border border-[#f4f1de]/40 text-[#040810] font-serif font-bold text-xs hover:brightness-110 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-spin text-[#040810]">⚓</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  {isRegisterMode ? 'Create Account' : 'Login'}
                </>
              )}
            </button>

          </form>

          {/* Social Buttons matching Image 3 Bottom Left */}
          <div className="space-y-2 pt-2 border-t border-[#c5a059]/20">
            <button
              type="button"
              onClick={() => alert('Google Social Sign-in is available in preview mode.')}
              className="w-full py-2.5 rounded-xl bg-[#040810] border border-[#c5a059]/30 text-xs text-[#ece4d0] hover:border-[#e5c158] flex items-center justify-center gap-2 transition-colors"
            >
              <span>🌐</span> Continue with Google
            </button>
            <button
              type="button"
              onClick={() => alert('GitHub Social Sign-in is available in preview mode.')}
              className="w-full py-2.5 rounded-xl bg-[#040810] border border-[#c5a059]/30 text-xs text-[#ece4d0] hover:border-[#e5c158] flex items-center justify-center gap-2 transition-colors"
            >
              <span>🐙</span> Continue with GitHub
            </button>
          </div>

          <div className="text-center text-xs text-[#ece4d0]/70">
            {isRegisterMode ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegisterMode(false)}
                  className="text-[#e5c158] font-bold hover:underline ml-1"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                New to CareerIQ?{' '}
                <button
                  onClick={() => setIsRegisterMode(true)}
                  className="text-[#e5c158] font-bold hover:underline ml-1"
                >
                  Create an account
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
