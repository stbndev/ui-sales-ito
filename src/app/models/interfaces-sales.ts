export interface ILogin {
    email:string;
    password:string;
}
export interface IUser {
        id: string;
        name: string;
        email: string;
        password: string;
        idrol: string;
        rolname: string;
        date_add: number;   
        company: number;   
        token:string;
        modules:any[];
}
export interface IProducts {
    idproducts: number;
    idcstatus: number;
    idcompany: number;
    unitary_price: number;
    unitary_cost: number;
    existence: number;
    quantity: number;
    date_add: number;
    date_set: number;
    bestseller: number;
    id: string;
    name: string;
    description: string;
    barcode: string;
    pathimg: string;
    maker: string;
    setup?: boolean;
}
export interface IPage {
    pagetitle: string;
    name: string;
    username:string;
}
export interface IEntries {
    identries: number,
    idproducts: number,
    total: number,
    unitary_cost: number,
    unitary_price: number,
    quantity: number,
    existence: number,
    id: string,
    name: string,
    idcstatus: number,
    idcompany: number,
    maker: string,
    date_add: number,
    date_set: number
}
// export class IPage {
//     constructor(){}
//     public pagetitle: string;
//     public  name:string;
// }

