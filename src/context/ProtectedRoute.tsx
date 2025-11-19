/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AdminLayout } from '../Layouts/Layout';

interface Props {
  children: React.JSX.Element;
}

const ProtectedRoute = ({ children }: Props): React.JSX.Element => {
  const { checkIsAuth, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkIsAuth();
    setLoading(false); // simula espera de verificación, opcionalmente podrías esperar a una promesa si checkIsAuth fuera async
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // o spinner
  }

  return isAuthenticated ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
