import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useLogin } from "./hooks/useLogin";

const LoginScreen = () => {
  const {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header con gradiente sutil */}
          <div className="bg-linear-to-r from-blue-800 to-purple-700 px-8 py-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-white text-center">
              Bienvenido
            </h1>
            <p className="text-slate-300 text-center mt-2 text-sm">
              Inicia sesión en tu cuenta
            </p>
          </div>

          {/* Formulario */}
          <div className="px-8 py-8">
            <div className="space-y-5">
              {/* Campo de email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all outline-none bg-slate-50 hover:bg-white"
                    placeholder="usuario@empresa.com"
                    required
                  />
                </div>
              </div>

              {/* Campo de contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all outline-none bg-slate-50 hover:bg-white"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Recordarme y olvidé contraseña */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-slate-700"
                  >
                    Recordarme
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-slate-600 hover:text-slate-800 font-medium transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Botón de submit */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-linear-to-r from-blue-700 to-blue-800 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
              >
                Iniciar sesión
              </button>
            </div>

            {/* Divider */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">
                  ¿Necesitas ayuda?
                </span>
              </div>
            </div>

            {/* Link de soporte */}
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                
              >
                Contactar con soporte técnico
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>© 2025 Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
