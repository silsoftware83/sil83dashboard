
import './App.css'
import { ToastProvider } from './components/ui/Toast';


import AppRouter from './routes';

function App() {

  return (
    <>
    <ToastProvider>

      <AppRouter />
    </ToastProvider>
   
    </>
  )
}

export default App
