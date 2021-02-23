import { Component, OnInit } from '@angular/core';
import { Productsmodel } from 'src/app/models/models-sales';
import { ConfigService } from 'src/app/services/config-service.service';

@Component({
  selector: 'app-nvtrsrkg-grid',
  templateUrl: './nvtrsrkg-grid.component.html',
  styleUrls: ['./nvtrsrkg-grid.component.css']
})
export class NvtrsrkgGridComponent implements OnInit {
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
  
  constructor(protected service: ConfigService) { }

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
