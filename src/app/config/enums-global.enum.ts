// module String {
//     export function isNullOrEmpty(s: string): boolean {
//         return !s;
//     }
// }

// export var ValidateEmail = function (mail) {
//     var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if (mail) {
//         // if (typeof (mail) != "undefined" && mail.match(mailformat)) {
//         if (mail.match(mailformat)) {
//             return true;
//         } else {
//             return false;
//         }
//     }

// }

export var isNullOrEmpty = function (s: string) {
    return !s;
};

export enum EnumsGlobal {
}

export enum eTipos {
    POST = 1,
    PUT = 2,
    PATCH = 3,
    DELETE = 4,
}

export enum eCSTATUS{
    OK = 1, 
    ERROR = -1,
    ACTIVO = 1,
    INACTIVO = 2,
    ELIMINADO = 3,
    CANCELADO = 4,
    PENDIENTE = 5,
}
// export enum CSTATUS_PRODUCTS {
//     ACTIVO = 1,
//     INACTIVO = 2,
//     ELIMINADO = 3,
//     CANCELADO = 4,
//     PENDIENTE = 5,
// }

export var CSTATUS_PRODUCTS = [
    { id: 1, value: 'ACTIVO' },
    { id: 2, value: 'INACTIVO' },
    { id: 3, value: 'ELIMINADO' },
    { id: 4, value: 'CANCELADO' },
    { id: 5, value: 'PENDIENTE' }
];