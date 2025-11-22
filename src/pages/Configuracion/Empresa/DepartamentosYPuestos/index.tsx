import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Users, Briefcase, Edit2, Trash2, ChevronDown, ChevronRight, UserCircle2 } from 'lucide-react';

interface Position {
  id: string;
  title: string;
  level: string;
  employeeCount: number;
}

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  positions: Position[];
  expanded?: boolean;
}

const DepartmentsAndPositions = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState<Department[]>([
    { 
      id: '1', 
      name: 'Tecnología', 
      description: 'Desarrollo y soporte técnico',
      manager: 'Carlos Martínez',
      employeeCount: 45,
      expanded: false,
      positions: [
        { id: 'p1', title: 'Desarrollador Senior', level: 'Senior', employeeCount: 12 },
        { id: 'p2', title: 'DevOps Engineer', level: 'Mid', employeeCount: 8 },
        { id: 'p3', title: 'QA Tester', level: 'Junior', employeeCount: 10 },
      ]
    },
    { 
      id: '2', 
      name: 'Recursos Humanos', 
      description: 'Gestión de talento y cultura',
      manager: 'Ana García',
      employeeCount: 15,
      expanded: false,
      positions: [
        { id: 'p4', title: 'HR Manager', level: 'Senior', employeeCount: 3 },
        { id: 'p5', title: 'Reclutador', level: 'Junior', employeeCount: 5 },
        { id: 'p6', title: 'Coordinador de Capacitación', level: 'Mid', employeeCount: 4 },
      ]
    },
    { 
      id: '3', 
      name: 'Ventas', 
      description: 'Estrategia comercial y ventas',
      manager: 'Roberto López',
      employeeCount: 32,
      expanded: false,
      positions: [
        { id: 'p7', title: 'Account Executive', level: 'Mid', employeeCount: 15 },
        { id: 'p8', title: 'Sales Manager', level: 'Senior', employeeCount: 5 },
        { id: 'p9', title: 'SDR', level: 'Junior', employeeCount: 8 },
      ]
    },
    { 
      id: '4', 
      name: 'Marketing', 
      description: 'Estrategia de marca y contenido',
      manager: 'Laura Hernández',
      employeeCount: 22,
      expanded: false,
      positions: [
        { id: 'p10', title: 'Content Creator', level: 'Junior', employeeCount: 8 },
        { id: 'p11', title: 'Marketing Director', level: 'Senior', employeeCount: 2 },
        { id: 'p12', title: 'Social Media Manager', level: 'Mid', employeeCount: 5 },
      ]
    },
  ]);

  const toggleDepartment = (deptId: string) => {
    setDepartments(departments.map(dept => 
      dept.id === deptId ? { ...dept, expanded: !dept.expanded } : dept
    ));
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.positions.some(pos => pos.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const bgPrimary = darkMode ? 'bg-[#1f1f1f]' : 'bg-white';
  const bgSecondary = darkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50';
  const bgHover = darkMode ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-100';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const border = darkMode ? 'border-[#3d3d3d]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#2d2d2d]' : 'bg-white';

  return (
    <div className={`min-h-screen ${bgSecondary} ${textPrimary} font-sans`}>
      {/* Header */}
      <div className={`${bgPrimary} border-b ${border} sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Departamentos y Puestos</h1>
              <p className={`text-sm ${textSecondary} mt-1`}>
                Gestiona la estructura organizacional
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-md ${bgSecondary} ${bgHover} text-sm font-medium transition-colors`}
            >
              {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} size={18} />
            <input
              type="text"
              placeholder="Buscar departamentos, puestos o jefes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${inputBg} ${textPrimary} border ${border} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
            />
          </div>
          <button className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center space-x-2 text-sm font-medium transition-colors">
            <Plus size={18} />
            <span>Nuevo departamento</span>
          </button>
        </div>

        {/* Departments List */}
        <div className="space-y-4">
          {filteredDepartments.map((dept) => (
            <div key={dept.id} className={`${bgPrimary} border ${border} rounded-lg overflow-hidden transition-all`}>
              {/* Department Header */}
              <div className={`p-5 ${bgHover} cursor-pointer`} onClick={() => toggleDepartment(dept.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <button className={`p-1 rounded ${bgSecondary}`}>
                      {dept.expanded ? (
                        <ChevronDown size={20} className={textSecondary} />
                      ) : (
                        <ChevronRight size={20} className={textSecondary} />
                      )}
                    </button>
                    
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Users size={24} className="text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{dept.name}</h3>
                      <p className={`text-sm ${textSecondary} mt-0.5`}>{dept.description}</p>
                    </div>

                    <div className="hidden md:flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className={`text-xs ${textSecondary} mb-1`}>Jefe de Área</div>
                        <div className="flex items-center space-x-2">
                          <UserCircle2 size={16} className={textSecondary} />
                          <span className="font-medium">{dept.manager}</span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-xs ${textSecondary} mb-1`}>Puestos</div>
                        <div className="font-semibold">{dept.positions.length}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-xs ${textSecondary} mb-1`}>Empleados</div>
                        <div className="font-semibold">{dept.employeeCount}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className={`p-2 rounded ${bgHover}`}
                    >
                      <Edit2 size={16} className={textSecondary} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className={`p-2 rounded ${bgHover}`}
                    >
                      <MoreVertical size={16} className={textSecondary} />
                    </button>
                  </div>
                </div>

                {/* Mobile info */}
                <div className="md:hidden mt-4 flex items-center justify-between text-sm border-t pt-4" style={{ borderColor: darkMode ? '#3d3d3d' : '#e5e7eb' }}>
                  <div className="flex items-center space-x-2">
                    <UserCircle2 size={14} className={textSecondary} />
                    <span className={textSecondary}>{dept.manager}</span>
                  </div>
                  <div className={`flex items-center space-x-4 ${textSecondary}`}>
                    <span>{dept.positions.length} puestos</span>
                    <span>•</span>
                    <span>{dept.employeeCount} empleados</span>
                  </div>
                </div>
              </div>

              {/* Positions List */}
              {dept.expanded && (
                <div className={`${bgSecondary} border-t ${border}`}>
                  <div className="px-5 py-3 flex items-center justify-between">
                    <h4 className={`text-sm font-semibold ${textSecondary} uppercase tracking-wider`}>
                      Puestos de trabajo
                    </h4>
                    <button className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:bg-opacity-20 rounded transition-colors">
                      + Agregar puesto
                    </button>
                  </div>
                  
                  <div className="divide-y" style={{ borderColor: darkMode ? '#3d3d3d' : '#e5e7eb' }}>
                    {dept.positions.map((pos) => (
                      <div key={pos.id} className={`px-5 py-4 flex items-center justify-between ${bgHover}`}>
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0">
                            <Briefcase size={18} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{pos.title}</div>
                            <div className={`text-sm ${textSecondary} mt-0.5`}>
                              {pos.employeeCount} {pos.employeeCount === 1 ? 'empleado' : 'empleados'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            pos.level === 'Senior' 
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300'
                              : pos.level === 'Mid'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {pos.level}
                          </span>
                          
                          <div className="flex items-center space-x-1">
                            <button className={`p-1.5 rounded ${bgHover}`}>
                              <Edit2 size={14} className={textSecondary} />
                            </button>
                            <button className={`p-1.5 rounded hover:bg-red-50 ${darkMode ? 'hover:bg-red-900 hover:bg-opacity-20' : ''}`}>
                              <Trash2 size={14} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className={`${bgPrimary} border ${border} rounded-lg p-12 text-center`}>
            <Users size={48} className={`${textSecondary} mx-auto mb-4`} />
            <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
            <p className={textSecondary}>Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsAndPositions;