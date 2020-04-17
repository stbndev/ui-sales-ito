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
    'identries',
    'idproducts',
    'name',
    'total',
    'unitary_cost',
    'unitary_price',
    'quantity',
    'existence',
    'idcstatus',
    'idcompany',
    'maker',
    'date_add',
    'date_set'
  ];

  constructor(protected service: ConfigService) { }

  ngOnInit() {
    this.service.Get('products').subscribe(dp => {
      if (dp.response) {
        this.dataProducts = dp.result;
        // console.dir(this.dataProducts);
      }
    }, e => {
      alert(e);
    });

    this.service.Get('entries').subscribe(
      data => {
        if (data.response) {
          this.dataSource = data.result;

          // this.dataSource[2] =
           let tmpname = this.dataProducts.filter(function (pn) {
            if(this.dataSource[1] == this.dataProducts[4]){
              return pn.name;  
            }
          });
          console.dir(this.dataSource)
        }
      },
      error => {
        alert(error);
      });
  }

}
