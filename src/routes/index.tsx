import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginScreen from '../pages/Auth/login';
import { PrivateRoute } from './PrivateRoute';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboard from '../pages/home/Admin/AdminDashboard';
import DirectorioPage from '../pages/Empleados/Directorio';
const AppRouter: React.FC = () => {
  return (
     <ThemeProvider>

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route element={<PrivateRoute />}>

            <Route element={<DashboardLayout />}>
                <Route path="/home_admin" element={<AdminDashboard />} />
                 <Route path="/empleados/directorio" element={<DirectorioPage />} />
            </Route>

          </Route>
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
     </ThemeProvider>
  );
};

export default AppRouter;