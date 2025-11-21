
// layouts/DashboardLayout.tsx
import  { useState } from 'react';
import {  useTheme } from '../context/ThemeContext';

import { Outlet } from 'react-router-dom';

import { Header } from './Navbar';
import { Sidebar } from './Sidebar';




export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);




  return (



    <GeneralContainer>
      <div className={`flex h-screen  transition-colors duration-200`}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <MainLayout />
        </div>
      </div>
    </GeneralContainer>

  );
};

const MainLayout = () => {

  return (
    <main className={"flex-1 relative overflow-y-auto focus:outline-none bg"}>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />

      </div>
    </main>
  )
}

const GeneralContainer = ({ children }: any) => {
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen ${!darkMode ? 'bg-gray-100' : 'bg-gray-900 '}  transition-colors duration-200`}>
      {children}
    </div>
  )
}