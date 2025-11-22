import React from 'react'
import { empleadosService } from '../services';
import type { Employee } from '../types';

export const useEmpleados = () => {
    const [personal, setPersonal] = React.useState<Employee[]>([])

    React.useEffect(() => {
        const fetchEmpleados = async () => {
            const response = await empleadosService.listar(20, 1);
            console.log(response);
            if (response && response.statusCode === 200) {
                setPersonal(response.result.data.data)
            }
        }
        fetchEmpleados()
    }, [])

    return { personal }
}


