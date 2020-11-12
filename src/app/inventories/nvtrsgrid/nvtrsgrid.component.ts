import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/config-service.service';
import { Productsmodel } from 'src/app/models/productsmodel';

@Component({
  selector: 'app-nvtrsgrid',
  templateUrl: './nvtrsgrid.component.html',
  styleUrls: ['./nvtrsgrid.component.css']
})
export class NvtrsgridComponent implements OnInit {

  dataSource: Productsmodel[];
  displayedColumns: string[] = [
    'idproducts',
    'pathimg',
    'name',
    'barcode',
    'idcstatus',
    'unitary_price',
    'unitary_cost',
    'existence',
    'idproductentries',
    'quantity',
  ];

  constructor(protected service: ConfigService) {
    this.service.refresh.subscribe(res => {
      console.dir(res);
      if (res) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {


    this.service.Get('products').subscribe(
      d => {
        if (d.flag) {
          this.dataSource = d.data;
        }
      },
      error => {
        alert(error);
      });
  }

  onSelect(e, r) {
    this.service.changeProductsData(r);
  }
}
