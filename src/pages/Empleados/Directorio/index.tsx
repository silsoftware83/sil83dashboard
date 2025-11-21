

import { DataTable } from "../../../components/ui/DataTable";
import { useTheme } from "../../../context/ThemeContext";
import { useEmpleados } from "./hooks/useEmpleados";

// Página principal del módulo Directorio
export default function DirectorioPage() {
  const {darkMode} = useTheme()
  const { personal } = useEmpleados();
  return( 
  
       <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-950' : 'bg-gray-100'}`}>
             <div className="">
               <div className="flex justify-between items-center mb-6">
                 <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Lista de Colaboradores
                 </h1>
                 <button
                   
                   className={`px-4 py-2 rounded-lg font-medium ${
                     darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-white'
                   }`}
                 >
                  + Agregar Colaborador 
                 </button>
               </div>
       
               <DataTable
                 data={[]}
                 columns={[]}
                 darkMode={darkMode}
                 itemsPerPage={5}
                 searchable={true}
               />
             </div>
           </div>
  
  );
}
