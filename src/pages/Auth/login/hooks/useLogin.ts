import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async() => {
   
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
     setTimeout(() => {
      navigate('/home_admin');
    }, 100);


    } catch (error) {
      setError('Credenciales inválidas. Por favor, intenta de nuevo.');
      console.log("TCL: handleSubmit -> error", error)
    } finally {
      setIsLoading(false);
    }

  };


  return { showPassword, setShowPassword, email, setEmail, password, setPassword, rememberMe, setRememberMe, handleSubmit }

}