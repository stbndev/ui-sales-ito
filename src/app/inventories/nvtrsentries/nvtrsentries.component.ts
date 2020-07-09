import { Component, OnInit } from '@angular/core';
import { Entriesmodel } from 'src/app/models/entriesmodel';
import { ConfigService } from 'src/app/config/config-service.service';
import { Productsmodel } from 'src/app/models/productsmodel';

@Component({
  selector: 'app-nvtrsentries',
  templateUrl: './nvtrsentries.component.html',
  styleUrls: ['./nvtrsentries.component.css']
})

export class NvtrsentriesComponent implements OnInit {
  dataSource: Entriesmodel[];
  dataProducts: Productsmodel[];
  displayedColumns: string[] = [
    // 'identries',
    // 'idproducts',
    'name',
    'total',
    // 'unitary_cost',
    'unitary_price',
    'quantity',
    'existence',
    // 'idcstatus',
    // 'idcompany',
    // 'maker',
    'date_add',
    // 'date_set'
  ];

  constructor(protected service: ConfigService) { }

  ngOnInit() {
    this.service.Get('products').subscribe(dp => {
      if (dp.response) {
        this.dataProducts = dp.result;

        // entry details
        this.service.Get('entries').subscribe(
          data => {
            if (data.response) {
              this.dataSource = data.result;
              // Object.defineProperty(Entriesmodel, prop, descriptor)
              for (let i = 0; i < this.dataSource.length; i++) {
                for (let ip = 0; ip < this.dataProducts.length; ip++) {
                  if (this.dataSource[i].idproducts === this.dataProducts[ip].idproducts) {
                    // console.dir(this.dataProducts[i].name);
                    this.dataSource[i].name = this.dataProducts[ip].name;
                  }
                }
              }
            }
          },
          error => {
            alert(error);
          });
      }
    }, e => {
      alert(e);
    });




  }

}
