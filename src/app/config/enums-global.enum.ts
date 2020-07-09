// module String {
//     export function isNullOrEmpty(s: string): boolean {
//         return !s;
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
export enum eCSTATUS {
    ACTIVO = 1,
    INACTIVO = 2,
    ELIMINADO = 3,
    CANCELADO = 4,

}

export var CSTATUS = [
    { value: '1', viewValue: 'ACTIVO' },
    { value: '2', viewValue: 'INACTIVO' },
    { value: '3', viewValue: 'ELIMINADO' },
    { value: '4', viewValue: 'CANCELADO' }

];