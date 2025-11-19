// **production
// **development
// **testing
// **productionapi
// "homepage": "https://sil83.com/", //poner un package.json
export const productionMode:string = 'development';

let pathApiBase
let pathImages
let pathBase
let pathLogOutBase

switch (productionMode) {
    case 'development':
        pathApiBase ="http://127.0.0.1:8000/api/";
        pathImages ="http://127.0.0.1:8000/";
        // pathImages = 'https://apisil.sil83.com/api/';
        pathBase = ''
        pathLogOutBase = '/'
        break;
   
    case 'productionapi':
        pathApiBase = 'https://apiproduction.sil83.com/api/';
        pathImages = 'https://apiproduction.sil83.com/api/';
        pathBase = '/'
        pathLogOutBase = '/'
        break;
    default:
        pathApiBase = 'http://192.168.100.40/apisil83/public/api/';
        pathImages = 'http://192.168.100.40/apisil83/public/';
        pathBase = ''
        pathLogOutBase = '/'
        // pathApiBase    = 'https://apisil.sil83.com/api/api/';
        // pathImages     = 'https://apisil.sil83.com/api/';
        // pathBase       = ''
        // pathLogOutBase = '/'
        break;
        
}

export const pathApi=pathApiBase;
export const path=pathBase;
export const pathLogOut=pathLogOutBase;
export const pathImagesb=pathImages;
