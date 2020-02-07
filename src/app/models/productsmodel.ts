export class Productsmodel {
	constructor(
        public idproducts: number,
        public name: string,
        public barcode: string,
        public idcstatus: number,
        public unitary_price: number,
        public unitary_cost: number,
        public existence: number,
        public idproductsentries: number,
        public quantity: number) { }
}
