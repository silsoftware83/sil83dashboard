/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

// ==================== TIPOS ====================
type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  position: ToastPosition;
  duration: number;
  darkMode: boolean;
}

interface ToastOptions {
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
  hideToast: (id: string) => void;
}

export interface RespuestaToast{
  type:ToastType,
  message:string
}

// ==================== CONTEXT ====================
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider');
  }
  return context;
};

// ==================== COMPONENTE TOAST ====================
interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const typeStyles = {
    success: {
      bg: toast.darkMode ? 'bg-green-900' : 'bg-green-50',
      border: 'border-green-500',
      text: toast.darkMode ? 'text-green-100' : 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    error: {
      bg: toast.darkMode ? 'bg-red-900' : 'bg-red-50',
      border: 'border-red-500',
      text: toast.darkMode ? 'text-red-100' : 'text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
    warning: {
      bg: toast.darkMode ? 'bg-yellow-900' : 'bg-yellow-50',
      border: 'border-yellow-500',
      text: toast.darkMode ? 'text-yellow-100' : 'text-yellow-800',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
    info: {
      bg: toast.darkMode ? 'bg-blue-900' : 'bg-blue-50',
      border: 'border-blue-500',
      text: toast.darkMode ? 'text-blue-100' : 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
  };

  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  const style = typeStyles[toast.type];

  return (
    <div
      className={`fixed ${positionStyles[toast.position]} z-50 flex items-center gap-3 min-w-[300px] max-w-md p-4 rounded-lg shadow-lg border-l-4 ${style.bg} ${style.border} animate-[slideIn_0.3s_ease-out]`}
    >
      <div className="flex-shrink-0">{style.icon}</div>
      <p className={`flex-1 text-sm font-medium ${style.text}`}>{toast.message}</p>
      <button
      title='d'
        onClick={() => onClose(toast.id)}
        className={`flex-shrink-0 ${style.text} hover:opacity-70 transition-opacity`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

// ==================== PROVIDER ====================
interface ToastProviderProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, darkMode = false }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = {
      id,
      message,
      type: options?.type || 'info',
      position: options?.position || 'top-right',
      duration: options?.duration || 3000,
      darkMode,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove después del duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, newToast.duration);
    }
  }, [darkMode]);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onClose={hideToast} />
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

// ==================== DEMO ====================
export default function ToastDemo() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ToastProvider darkMode={darkMode}>
      <DemoContent darkMode={darkMode} setDarkMode={setDarkMode} />
    </ToastProvider>
  );
}

function DemoContent({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (val: boolean) => void }) {
  const { showToast } = useToast();

  const positions: ToastPosition[] = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                Toast System Global
              </h1>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Llama toasts desde cualquier componente
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>
                Tipos de Notificación
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => showToast('¡Operación exitosa!', { type: 'success' })}
                  className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Éxito
                </button>
                <button
                  onClick={() => showToast('Error al procesar', { type: 'error' })}
                  className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Error
                </button>
                <button
                  onClick={() => showToast('Advertencia importante', { type: 'warning' })}
                  className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                >
                  Alerta
                </button>
                <button
                  onClick={() => showToast('Información útil', { type: 'info' })}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Info
                </button>
              </div>
            </div>

            <div>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>
                Posiciones
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {positions.map(pos => (
                  <button
                    key={pos}
                    onClick={() => showToast(`Toast en ${pos}`, { position: pos })}
                    className="px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium text-sm"
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`mt-8 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              Cómo usar en tu aplicación:
            </h3>
            <div className="space-y-3">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  1. Envuelve tu app con el ToastProvider:
                </p>
                <pre className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} overflow-x-auto p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
{`<ToastProvider darkMode={darkMode}>
  <AdminLayoutContent>
    {children}
  </AdminLayoutContent>
</ToastProvider>`}
                </pre>
              </div>
              
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  2. Usa el hook en cualquier componente:
                </p>
                <pre className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} overflow-x-auto p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
{`const { showToast } = useToast();

showToast('Guardado exitosamente', { 
  type: 'success',
  position: 'top-right',
  duration: 3000 
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}