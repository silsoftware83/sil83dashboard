
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'

import ProtectedRoute from './context/ProtectedRoute';

import type { JSX } from 'react';
import LoginScreen from './pages/Auth/login';



type Route = {
  path: string;
  element: JSX.Element;
}
const routes:Route[] = [];
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="*"
            element={
              <Routes>
                {routes.map((route, idx) => (
                  <Route key={idx} path={route.path} element={
                      <ProtectedRoute>
                        {route.element}
                      </ProtectedRoute>
                  } />
                ))}
              </Routes>
            }
          />


          <Route path="*" element={<div> 404 - Página no encontrada </div>} />
        </Routes>
      </Router>
   
    </>
  )
}

export default App
