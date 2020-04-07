export class Productsmodel {
        constructor(
                public idproducts: number,
                public name: string,
                public description: string,
                public barcode: string,
                public idcstatus: number = 2,
                public unitary_price: number,
                public unitary_cost: number,
                public existence: number,
                public quantity: number,
                public pathimg: string,
                public id: string,
                public idcompany: number,
                public maker: string,
                public date_add: number,
                public date_set: number,
        ) { }
}
// export interface Productstestmodel {
//         //     id: number;
//         //     unitary_cost: number;
//         //     unitary_price: number;
//         //     quantity: number;
//         name: string

// }

