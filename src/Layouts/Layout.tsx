/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ToastProvider } from "../context/ToastProvider";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { ThemeProvider } from "../context/ThemeContext";
import { useTheme } from "../hooks/useTheme";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

// Componente interno que usa el contexto
const AdminLayoutContent = ({ children }: { children: any }) => {
  const { darkMode, setDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
  <>
<ToastProvider darkMode={darkMode}>
  <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
    <Sidebar {...{ sidebarOpen, darkMode }} />
    
    <div className="flex-1 flex flex-col">
      <Navbar {...{ darkMode, sidebarOpen, setSidebarOpen, setDarkMode }} />
      <main id="main-content" className="flex-1 px-6 overflow-auto">
        {children}
      </main>
    </div>
  </div>
  
  <ScrollToTopButton darkMode={darkMode} scrollContainerId="main-content" />
    </ToastProvider>
</>
  );
};

// Componente principal que provee el contexto
export const AdminLayout = ({ children }: any) => {
  return (


    <ThemeProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </ThemeProvider>
  );
};