// /* eslint-disable @typescript-eslint/no-explicit-any */
// /**
//  * @version 1.0.0
//  * @author Alexis
//  * @description HTTP client for all Web requests based on superagent: GET, POST, DELETE, PUT, PATCH
//  * @param {string} url: "/EndPoint"
//  * @param {object} data: Payload
//  */
// import request from "superagent";
// import { decryptString } from "./encript";
// import { pathApi } from "./configuracion";  // Web API URL

// const baseUrl = pathApi;

// class Request {
//   async get(url: string, data?: any): Promise<{ result?: any; statusCode?: number,message?:any }> {
//     let token = "";
//     const tkn = sessionStorage.getItem("auth_token");
//     if (tkn) {
//       token = decryptString(tkn);
//     }

//     try {
//       const response = await request
//         .get(baseUrl + url)
//         .query(data)
//         .set({
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         });
//       return { result: response.body, statusCode: response.status };
//     } catch (error: any) {
     
//       const { status, response } = error;

//       // Manejo de error 404 específico
//       if (status === 404) {
//         return {
//           message: response.body.message || "No se encontraron datos.",
//           statusCode: 404,
//         };
//       }
    
//       // Otros errores 4xx
//       if (status >= 400 && status < 500) {
//         return {
//           message: response.body.message || "Ocurrió un error al procesar la solicitud.",
//           statusCode: status,
//         };
//       }
    
//       // Errores 5xx
//       if (status >= 500) {
//         return {
//           message: "Error del servidor, intenta más tarde.",
//           statusCode: status,
//         };
//       }
    
//       // Manejo de errores desconocidos
//       return {
//         message: error.message || "Error desconocido.",
//         statusCode: 503,
//       }
//     }
//   }

//   async post(url: string, data: object): Promise<{ result?: any; statusCode: number,message?:any }> {
//     let token = "";
//     const tkn = sessionStorage.getItem("auth_token");
//     if (tkn) {
//       token = decryptString(tkn);
//     }

//     try {
//       const response = await request
//         .post(baseUrl + url)
//         .set({
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         })
//         .send(data);
//       return { result: response.body, statusCode: response.status };
//     } catch (error: any) {
//       return { message: error.message, statusCode: 503 };
//     }
//   }

//   async delete(url: string, data?: object): Promise<{ result?: any; statusCode: number,message?:any }> {
//     let token = "";
//     const tkn = sessionStorage.getItem("auth_token");
//     if (tkn) {
//       token = decryptString(tkn);
//     }

//     try {
//       const response = await request
//         .delete(baseUrl + url)
//         .send(data)
//         .set({
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         });
//       return { result: response.body, statusCode: response.status };
//     } catch (error: any) {
//       return { message: error.message, statusCode: 503 };
//     }
//   }

//   async put(url: string, data: object): Promise<{ result?: any; statusCode: number,message?:any }> {
//     let token = "";
//     const tkn = sessionStorage.getItem("auth_token");
//     if (tkn) {
//       token = decryptString(tkn);
//     }

//     try {
//       const response = await request
//         .put(baseUrl + url)
//         .send(data)
//         .set({
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         });
//       return { result: response.body, statusCode: response.status };
//     } catch (error: any) {
//       return { message: error.message, statusCode: 503 };
//     }
//   }

//   async patch(url: string, data: object): Promise<{ result?: any; statusCode: number,message?:any }> {
//     let token = "";
//     const tkn = sessionStorage.getItem("auth_token");
//     if (tkn) {
//       token = decryptString(tkn);
//     }

//     try {
//       const response = await request
//         .patch(baseUrl + url)
//         .send(data)
//         .set({
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         });
//       return { result: response.body, statusCode: response.status };
//     } catch (error: any) {
//       return { message: error.message, statusCode: 503 };
//     }
//   }
//   async postFiles(url: string, data: object): Promise<{ result?: any; statusCode: number, message?:any }> {
//     let token = "";
//     const tkn = sessionStorage.getItem("auth_token");
//     if (tkn) {
//       token = decryptString(tkn);
//     }
  
//     try {
//       const response = await request
//         .post(baseUrl + url)
//         .set({
//           // Remove Accept header for multipart/form-data
//           Authorization: "Bearer " + token,
//         })
//         // Check if data is a FormData object
//         .send(data instanceof FormData ? data : data);
  
//       return { result: response.body, statusCode: response.status };
//     } catch (error: any) {
//       return { message: error.message, statusCode: 503 };
//     }
//   }
// }

// export default Request;
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @version 1.0.0
 * @author Alexis
 * @description HTTP client for all Web requests based on superagent: GET, POST, DELETE, PUT, PATCH
 * @param {string} url: "/EndPoint"
 * @param {object} data: Payload
 */
import request from "superagent";
import { decryptString } from "./encript";
import { pathApi } from "./configuracion";
 // Web API URL

const baseUrl = pathApi;

class Request {
  /**
   * Maneja los errores de las peticiones HTTP de manera consistente
   */
  
 private handleError(error: any): { message: string; statusCode: number; errors?: any } {

  const status = error?.status;
  const response = error?.response;
  const body = response?.body;

// 👇 Aquí está la corrección:
 
 
const mensajes = body && body.errors && typeof body.errors === "object"
  ? Object.values(body.errors).map((arr: any) => (Array.isArray(arr) ? arr[0] : arr))
  : [];

  if (status === 404) {
    return {
      message: body?.message || "No se encontraron datos.",
      statusCode: 404,
      errors:mensajes[0], // 👈 ahora sí se retorna correctamente
    };
  }

  if (status >= 400 && status < 500) {
    return {
      message: body?.message || "Ocurrió un error al procesar la solicitud.",
      statusCode: status,
      errors:mensajes[0], // 👈 ahora sí se retorna correctamente
    };
  }

  if (status >= 500) {
    return {
      message: body?.message || "Error del servidor, intenta más tarde.",
      statusCode: status,
      errors:mensajes[0], // 👈 ahora sí se retorna correctamente
    };
  }

  return {
    message: error.message || "Error desconocido.",
    statusCode: 503,
  };
}


  async get(url: string, data?: any): Promise<{ result?: any; statusCode?: number; message?: any }> {
    let token = "";
    const tkn = sessionStorage.getItem("auth_token");
    if (tkn) {
      token = decryptString(tkn);
    }

    try {
      const response = await request
        .get(baseUrl + url)
        .query(data)
        .set({
          Accept: "application/json",
          Authorization: "Bearer " + token,
        });
        
      return { result: response.body, statusCode: response.status };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async post(url: string, data: object): Promise<{ result?: any; statusCode: number; message?: any }> {
    let token = "";
    const tkn = sessionStorage.getItem("auth_token");
    if (tkn) {
      token = decryptString(tkn);
    }

    try {
      const response = await request
      .post(baseUrl + url)
      .set({
        Accept: "application/json",
        Authorization: "Bearer " + token,
      })
      .send(data);
    
        
      return { result: response.body, statusCode: response.status };
    } catch (error: any) {
 
      return this.handleError(error);
    }
  }

  async delete(url: string, data?: object): Promise<{ result?: any; statusCode: number; message?: any }> {
    let token = "";
    const tkn = sessionStorage.getItem("auth_token");
    if (tkn) {
      token = decryptString(tkn);
    }

    try {
      const response = await request
        .delete(baseUrl + url)
        .send(data)
        .set({
          Accept: "application/json",
          Authorization: "Bearer " + token,
        });
      return { result: response.body, statusCode: response.status };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async put(url: string, data: object): Promise<{ result?: any; statusCode: number; message?: any }> {
    let token = "";
    const tkn = sessionStorage.getItem("auth_token");
    if (tkn) {
      token = decryptString(tkn);
    }

    try {
      const response = await request
        .put(baseUrl + url)
        .send(data)
        .set({
          Accept: "application/json",
          Authorization: "Bearer " + token,
        });
      return { result: response.body, statusCode: response.status };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async patch(url: string, data: object): Promise<{ result?: any; statusCode: number; message?: any }> {
    let token = "";
    const tkn = sessionStorage.getItem("auth_token");
    if (tkn) {
      token = decryptString(tkn);
    }

    try {
      const response = await request
        .patch(baseUrl + url)
        .send(data)
        .set({
          Accept: "application/json",
          Authorization: "Bearer " + token,
        });
      return { result: response.body, statusCode: response.status };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async postFiles(url: string, data: object): Promise<{ result?: any; statusCode: number; message?: any }> {
    let token = "";
    const tkn = sessionStorage.getItem("auth_token");
    if (tkn) {
      token = decryptString(tkn);
    }

    try {
      const response = await request
        .post(baseUrl + url)
        .set({
          // Remove Accept header for multipart/form-data
          Authorization: "Bearer " + token,
        })
        // Check if data is a FormData object
        .send(data instanceof FormData ? data : data);

      return { result: response.body, statusCode: response.status };
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}

export default Request;