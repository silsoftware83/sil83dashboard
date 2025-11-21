import { createContext } from 'react';
import type { ToastContextType } from './Types';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
