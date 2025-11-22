// components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown,
  Sparkles,
  type LucideIcon
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface Submodule {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  route: string | null;
  is_active: boolean;
  level: number;
  childSubmodules?: Submodule[];
  child_submodules?: Submodule[];
}

interface Module {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  route: string | null;
  is_active: boolean;
  order: number;
  submodules?: Submodule[];
}
import logotipo from '../assets/logotipo.png';
// Función helper para obtener el componente de icono
const getIconComponent = (iconName: string | null): LucideIcon | null => {
  if (!iconName) return null;
  
  // @ts-ignore - Lucide icons son accesibles por nombre
  const IconComponent = LucideIcons[iconName];
  
  return IconComponent || null;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({});
  const [expandedSubmodules, setExpandedSubmodules] = useState<{ [key: number]: boolean }>({});
  
  useEffect(() => {
    // Cargar módulos del sessionStorage
    const storedModules = sessionStorage.getItem('modules');
    if (storedModules) {
      try {
        const parsedModules = JSON.parse(storedModules);
        setModules(parsedModules);
      } catch (error) {
        console.error('Error parsing modules:', error);
      }
    }
  }, []);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const toggleSubmodule = (submoduleId: number) => {
    setExpandedSubmodules(prev => ({
      ...prev,
      [submoduleId]: !prev[submoduleId]
    }));
  };

  const handleNavigation = (route: string | null) => {
    if (route) {
      navigate(route);
    }
  };

  const isActiveRoute = (route: string | null): boolean => {
    if (!route) return false;
    return location.pathname === route;
  };

  const cardBg = darkMode ? 'bg-slate-900/50' : 'bg-white';
  const borderColor = darkMode ? 'border-slate-800' : 'border-slate-200';
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-600';
  const hoverBg = darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50';
  const activeBg = darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600';

  const renderSubmodule = (submodule: Submodule, depth: number = 0) => {
    const hasChildren = submodule.childSubmodules && submodule.childSubmodules.length > 0;
    const isExpanded = expandedSubmodules[submodule.id];
    const paddingLeft = isOpen ? `${(depth + 1) * 0.75}rem` : '0';
    const IconComponent = getIconComponent(submodule.icon);
    const isActive = isActiveRoute(submodule.route);
    
    // Si tiene hijos, solo expande/colapsa. Si no tiene hijos, navega
    const handleClick = () => {
      if (hasChildren) {
        toggleSubmodule(submodule.id);
      } else if (submodule.route) {
        handleNavigation(submodule.route);
      }
    };

    return (
      <div key={submodule.id}>
        <button
          onClick={handleClick}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group relative ${
            isActive ? activeBg : `${textSecondary} ${hoverBg}`
          }`}
          style={{ paddingLeft: isOpen ? `calc(1rem + ${paddingLeft})` : '1rem' }}
        >
          {IconComponent ? (
            <IconComponent size={16} className="flex-shrink-0" />
          ) : (
            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-500' : 'bg-current opacity-50'}`} />
          )}
          
          {isOpen && (
            <>
              <span className="font-medium flex-1 text-left text-sm">{submodule.name}</span>
              {hasChildren && (
                isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
              )}
            </>
          )}
          
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
          )}
        </button>
        
        {hasChildren && isExpanded && isOpen && (
          <div className="space-y-0.5">
            {submodule.childSubmodules?.map(child => 
              renderSubmodule(child, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderModule = (module: Module) => {
    const hasSubmodules = module.submodules && module.submodules.length > 0;
    const isExpanded = expandedModules[module.id];
    const IconComponent = getIconComponent(module.icon);

    return (
      <div key={module.id}>
        <button
          onClick={() => hasSubmodules && toggleModule(module.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${textSecondary} ${hoverBg}`}
        >
          {IconComponent ? (
            <IconComponent size={20} className="flex-shrink-0" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
          )}
          
          {isOpen && (
            <>
              <span className="font-medium flex-1 text-left">{module.name}</span>
              {hasSubmodules && (
                isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
              )}
            </>
          )}
        </button>

        {hasSubmodules && isExpanded && isOpen && (
          <div className="mt-1 space-y-0.5">
            {module.submodules?.map(submodule => renderSubmodule(submodule))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`${cardBg} backdrop-blur-xl border-r ${borderColor} transition-all duration-300 ${
        isOpen ? 'w-72' : 'w-20'
      } flex flex-col relative`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-2">
            
          <img src={logotipo} alt="logotipo" />
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg ${hoverBg} transition-all hover:scale-110`}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {modules.length > 0 ? (
          modules.map(module => renderModule(module))
        ) : (
          <div className="text-center text-slate-500 py-8 text-sm">
            {isOpen ? 'No hay módulos disponibles' : '...'}
          </div>
        )}
      </nav>

      {/* User Profile */}
      {isOpen && (
        <div className={`p-4 border-t ${borderColor}`}>
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold ring-2 ring-blue-500/20">
              A
            </div>
            <div className="flex-1">
              <p className="font-medium">Admin User</p>
              <p className={`text-xs ${textSecondary}`}>admin@empresa.com</p>
            </div>
            <ChevronRight size={16} className={textSecondary} />
          </div>
        </div>
      )}
    </aside>
  );
};