import { Component, OnInit } from '@angular/core';
import { IEntries } from 'src/app/models/interfaces-sales';
import { ConfigService } from 'src/app/services/config-service.service';
import { Productsmodel } from 'src/app/models/models-sales';

@Component({
  selector: 'app-nvtrsentries',
  templateUrl: './nvtrsentries.component.html',
  styleUrls: ['./nvtrsentries.component.css']
})

export class NvtrsentriesComponent implements OnInit {
  // dataSource: Entriesmodel[];
  dataSource = [] as IEntries[];
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
    this.service.Get('products').subscribe(d => {
      if (d.flag > 1) {
        this.dataProducts = d.data;

        // entry details
        this.service.Get('entries').subscribe(
          d => {
            if (d.flag) {
              this.dataSource = d.data;
              // Object.defineProperty(Entriesmodel, prop, descriptor)
              for (let i = 0; i < this.dataSource.length; i++) {
                for (let ip = 0; ip < this.dataProducts.length; ip++) {
                  if (this.dataSource[i].idproducts === this.dataProducts[ip].idproducts) {
                    
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
