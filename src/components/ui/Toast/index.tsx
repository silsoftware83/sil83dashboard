export { ToastProvider } from './ToastProvider';
export { useToast } from './useToast';
export type { ToastType, Toast } from './Types';

// ============================================
// App.tsx (ejemplo de uso)
// ============================================
// import React from 'react';
// import { ToastProvider, useToast } from './toast';

// const Demo = () => {
//   const { showToast } = useToast();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Sistema de Toast Notifications
//           </h1>
//           <p className="text-gray-600 mb-8">
//             Prueba los diferentes tipos de notificaciones
//           </p>

//           <div className="grid grid-cols-2 gap-4">
//             <button
//               onClick={() => showToast('¡Operación exitosa!', 'success')}
//               className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
//             >
//               Success Toast
//             </button>

//             <button
//               onClick={() => showToast('Algo salió mal', 'error')}
//               className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
//             >
//               Error Toast
//             </button>

//             <button
//               onClick={() => showToast('Información importante', 'info')}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
//             >
//               Info Toast
//             </button>

//             <button
//               onClick={() => showToast('¡Ten cuidado!', 'warning')}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
//             >
//               Warning Toast
//             </button>

//             <button
//               onClick={() => showToast('Esta notificación dura 5 segundos', 'info', 5000)}
//               className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors col-span-2"
//             >
//               Toast con duración personalizada (5s)
//             </button>
//           </div>

//           <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//             <h2 className="font-semibold text-gray-700 mb-2">📁 Estructura de archivos:</h2>
//             <pre className="text-sm text-gray-600 overflow-x-auto whitespace-pre">
// {`toast/
// ├── types.ts           # Tipos TypeScript
// ├── ToastContext.tsx   # Contexto de React
// ├── useToast.ts        # Hook personalizado
// ├── ToastItem.tsx      # Componente del toast individual
// ├── ToastProvider.tsx  # Provider del contexto
// └── const.ts           # Exportaciones públicas

// App.tsx                # Tu aplicación`}
//             </pre>
//           </div>

//           <div className="mt-4 p-4 bg-blue-50 rounded-lg">
//             <h2 className="font-semibold text-blue-700 mb-2">💡 Cómo usar:</h2>
//             <pre className="text-sm text-blue-600 overflow-x-auto">
// {`// En tu archivo principal (main.tsx o App.tsx)
// import { ToastProvider } from './toast';

// <ToastProvider>
//   <App />
// </ToastProvider>

// En cualquier componente
// import { useToast } from './toast';

// const MiComponente = () => {
//   const { showToast } = useToast();
  
//   const handleClick = () => {
//     showToast('¡Éxito!', 'success');
//   };
  
//   return <button onClick={handleClick}>Acción</button>;
// };`}
//             </pre>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <ToastProvider>
//       <Demo />
//     </ToastProvider>
//   );
// }