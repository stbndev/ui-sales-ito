// export interface Usersmodel {
//     id: string,
//     name: string,
//     email: string,
//     password: string,
//     idrol:string,
//     date_add:number
// }

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

// export class Sales2Model {
//     id: string;
//     total: number;
//     idsales: number;
//     idcstatus: number;
//     idcompany: number;
//     maker: string;
//     date_add: number;
//     date_set: number;
//     details: SaleDetailsModel[];
//     getNumber(): number { return this.idsales };
// }