



import Request from '../../../../utils/http' 
import { encryptString } from '../../../../utils/encript';
import type { User } from '../types';
const request = new Request();
// Simulación del servicio de autenticación - reemplaza con llamadas reales a tu API
export const authService = {
  login: async (email: string, password: string) => {
   
    const response = await request.post('auth/login', { email, password });

      if (response.statusCode === 200 && response.result) {

        sessionStorage.setItem('auth_token', encryptString(response.result.access_token));
        sessionStorage.setItem('user', JSON.stringify(response.result.user));
        sessionStorage.setItem('modules', JSON.stringify(response.result.modules));
        return response.result.user;
      }
    return null
    },
    
  

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (name: string, email: string, _password: string): Promise<User> => {
      
    // Simula una llamada a API
    return new Promise((resolve: (value: (PromiseLike<User> | any)) => void):void => {
      setTimeout(() => {
        // Aquí conectarías con tu backend real
        const user: User = {
          id: '1',
          name,
          email,
          role: 'user',
        };
        
        sessionStorage.setItem('auth_token', 'demo_token_' + Math.random());
        sessionStorage.setItem('user', JSON.stringify(user));
        
        resolve(user);
      }, 500);
    });
  },

  logout: async (): Promise<void> => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    return Promise.resolve();
  },

  getCurrentUser: async (): Promise<User | null> => {
    const userJson = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('auth_token');
    
    if (token && userJson) {
      return Promise.resolve(JSON.parse(userJson));
    }
    
    return Promise.resolve(null);
  }
};