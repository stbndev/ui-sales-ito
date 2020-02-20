export class Salesmodel {

    constructor(
        public total:number,
        public idcstatus: number,
        public maker:string,
        public idsales: number,
        public SaleDetails: SaleDetails[]
    ){

    }
    
}
export class SaleDetails{
    constructor(
        public id:number,
        public unitary_cost: number,
        public unitary_price: number,
        public quantity:number,
        public idproducts : number
    ){

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