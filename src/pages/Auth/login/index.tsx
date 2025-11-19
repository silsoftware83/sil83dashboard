import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Users } from 'lucide-react';

export default function FluentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('alexisduarte1512@gmail.com');
  const [password, setPassword] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">NOTARÍA</h1>
                <p className="text-sm opacity-90">PÚBLICA 83</p>
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-3xl font-semibold mb-4">Sistema Integral Laboral</h2>
              <p className="text-lg opacity-90">Sistema de gestión empresarial</p>
            </div>
          </div>

          <div className="space-y-3 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <p>Gestión de recursos humanos</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <p>Control de asistencia</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <p>Nómina integrada</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Bienvenido</h2>
            <p className="text-gray-600">Inicia sesión en tu cuenta</p>
          </div>

          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className={`relative transition-all duration-200 ${
                isFocusedEmail 
                  ? 'ring-2 ring-blue-500 rounded-lg' 
                  : 'ring-1 ring-gray-300 rounded-lg'
              }`}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => setIsFocusedEmail(false)}
                  className="w-full pl-12 pr-4 py-3.5 text-gray-900 bg-transparent focus:outline-none"
                  placeholder="usuario@ejemplo.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className={`relative transition-all duration-200 ${
                isFocusedPassword 
                  ? 'ring-2 ring-blue-500 rounded-lg' 
                  : 'ring-1 ring-gray-300 rounded-lg'
              }`}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                  className="w-full pl-12 pr-12 py-3.5 text-gray-900 bg-transparent focus:outline-none"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500" />
                <span className="text-sm text-gray-700">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
            >
              Iniciar Sesión
            </button>

            {/* Help Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                ¿Necesitas ayuda?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contacta a RH
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}