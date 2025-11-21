import React, { useState } from 'react';

// Interfaz para las columnas
export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

// Props del DataTable
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  darkMode?: boolean;
  itemsPerPage?: number;
  searchable?: boolean;
}

// Componente DataTable
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  darkMode = false,
  itemsPerPage = 10,
  searchable = true,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Filtrar datos según búsqueda
  const filteredData = searchTerm
    ? data.filter((item) =>
        columns.some((col) => {
          const value = item[col.key];
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    : data;

  // Ordenar datos
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const baseClasses = darkMode
    ? 'bg-gray-900 text-gray-100'
    : 'bg-white text-gray-900';
  const borderClasses = darkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverClasses = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  const inputClasses = darkMode
    ? 'bg-gray-800 border-gray-700 text-gray-100'
    : 'bg-white border-gray-300 text-gray-900';

  return (
    <div className={`${baseClasses} rounded-lg shadow-lg p-6`}>
      {/* Barra de búsqueda */}
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={`${inputClasses} w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${borderClasses}`}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    col.sortable !== false ? 'cursor-pointer select-none' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable !== false && sortConfig?.key === col.key && (
                      <span className="text-blue-500">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr
                key={idx}
                className={`border-b ${borderClasses} ${hoverClasses} transition-colors`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, sortedData.length)} de{' '}
            {sortedData.length} resultados
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-600'
              } ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              Anterior
            </button>
            <span className="px-4 py-2">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-600'
              } ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Ejemplo de uso
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const sampleData: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin', status: 'Activo' },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'Usuario', status: 'Activo' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'Editor', status: 'Inactivo' },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Usuario', status: 'Activo' },
    { id: 5, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'Admin', status: 'Activo' },
    { id: 6, name: 'Laura Fernández', email: 'laura@example.com', role: 'Editor', status: 'Activo' },
    { id: 7, name: 'Miguel Rodríguez', email: 'miguel@example.com', role: 'Usuario', status: 'Inactivo' },
    { id: 8, name: 'Sofia Torres', email: 'sofia@example.com', role: 'Usuario', status: 'Activo' },
  ];

  const columns: Column<User>[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Nombre', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { 
      key: 'role', 
      header: 'Rol',
      render: (user) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          user.role === 'Admin' ? 'bg-purple-500 text-white' :
          user.role === 'Editor' ? 'bg-blue-500 text-white' :
          'bg-gray-500 text-white'
        }`}>
          {user.role}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Estado',
      render: (user) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          user.status === 'Activo' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {user.status}
        </span>
      )
    },
  ];

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-950' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            DataTable Component
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-medium ${
              darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-white'
            }`}
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </div>

        <DataTable
          data={sampleData}
          columns={columns}
          darkMode={darkMode}
          itemsPerPage={5}
          searchable={true}
        />
      </div>
    </div>
  );
}