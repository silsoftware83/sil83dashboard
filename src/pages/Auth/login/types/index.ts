export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    department?:string;
    permissions?:string[];
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }