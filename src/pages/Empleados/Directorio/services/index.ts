
import Request from '../../../../utils/http' 

const request = new Request();
export const empleadosService = {
  listar: async (per_page: number, active: number) => {
   
    const response = await request.get('personal?per_page=' + per_page + '&active=' + active);

      if (response.statusCode === 200 && response.result) {
        return response.result;
      }
    return null
    },
    
  

};