export class Productsmodel {
        constructor(
                public idproducts: number,
                public idcstatus: number ,
                public idcompany: number,
                public unitary_price: number,
                public unitary_cost: number,
                public existence: number,
                public quantity: number,
                public date_add: number,
                public date_set: number,
                public bestseller:number,
                public id: string,
                public name: string,
                public description: string,
                public barcode: string,
                public pathimg: string,
                public maker: string
        ) { }
         public setup:boolean;
}
// export interface Productstestmodel {
//         //     id: number;
//         //     unitary_cost: number;
//         //     unitary_price: number;
//         //     quantity: number;
//         name: string
// }

