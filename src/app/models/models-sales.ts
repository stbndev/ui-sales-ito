import { CSTATUS_PRODUCTS } from "../config/enums-global.enum";
export class Usersmodel {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public idrol: string,
        public date_add: number
    ) { }
}
export class Productsmodel {
        constructor(
                public idproducts: number,
                public idcstatus: number,
                public idcompany: number,
                public unitary_price: number,
                public unitary_cost: number,
                public existence: number,
                public quantity: number,
                public date_add: number,
                public date_set: number,
                public bestseller: number,
                public id: string,
                public name: string,
                public description: string,
                public barcode: string,
                public pathimg: string,
                public maker: string
        ) {
        }
        public setup: boolean;
}
export class SaleDetailsModel {
     unitary_cost: number;
     unitary_price: number;
     quantity: number;
     idproducts: number;
     

}

export class Sales2Model {
    id: string;
    total: number;
    idsales: number;
    idcstatus: number;
    idcompany: number;
    maker: string;
    date_add: number;
    date_set: number;
    details: SaleDetailsModel[];
    getNumber(): number { return this.idsales };
}

export class Salesmodel {
    constructor(
        // public id: string,
        public total: number,
        public idsales: number,
        public idcstatus: number,
        public idcompany: number,
        public maker: string,
        public date_add: number,
        public date_set: number,
        public details: SaleDetails[]
    ) {

    }

}
export class SaleDetails {
    constructor(
        public unitary_cost: number,
        public unitary_price: number,
        public quantity: number,
        public idproducts: number
    ) {

    }
}
// export interface Saledetail {
//     id: number;
//     unitary_cost: number;
//     unitary_price: number;
//     quantity: number;
//     idproducts: number;
// }

// export interface RootObject {
//     total: number;
//     idcstatus: number;
//     maker: string;
//     idsales: number;
//     Saledetails: Saledetail[];
// }