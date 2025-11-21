import React from 'react'
import { empleadosService } from '../services';

export const useEmpleados = () => {
    const [personal, setPersonal] = React.useState<any[]>([])

    React.useEffect(() => {
        const fetchEmpleados = async () => {
            const response = await empleadosService.listar(10, 1);
            console.log(response);
        }
        fetchEmpleados()
    }, [])

  return {personal}
}


