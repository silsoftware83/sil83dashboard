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
// #Listen 12.34.56.78:80
// Listen 80
// silsoftware83
// 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
// VSzONcle

// MAIL_MAILER=smtp
// MAIL_HOST=mail.notaria83qroo.mx
// MAIL_PORT=587
// MAIL_USERNAME=no_reply@notaria83qroo.mx
// MAIL_PASSWORD=L+9<UAK0xpOr12%D
// MAIL_ENCRYPTION=tls
// MAIL_EHLO_DOMAIN=sil83.com
// MAIL_FROM_ADDRESS="no_reply@notaria83qroo.mx"
// MAIL_FROM_NAME="${APP_NAME}"

// MAIL_MAILER=smtp
// MAIL_HOST=mail.sil83.com
// MAIL_PORT=465
// MAIL_USERNAME=no_reply@sil83.com
// MAIL_PASSWORD=ioX08h*npSnd
// MAIL_ENCRYPTION=ssl
// MAIL_EHLO_DOMAIN=sil83.com
// MAIL_FROM_ADDRESS="no_reply@sil83.com"
// MAIL_FROM_NAME="${APP_NAME}"