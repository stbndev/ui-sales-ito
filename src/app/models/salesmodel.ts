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