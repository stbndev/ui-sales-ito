import { Component, OnInit } from '@angular/core';
import { Entriesmodel } from 'src/app/models/entriesmodel';
import { ConfigService } from 'src/app/config/config-service.service';

@Component({
  selector: 'app-nvtrsentries',
  templateUrl: './nvtrsentries.component.html',
  styleUrls: ['./nvtrsentries.component.css']
})
export class NvtrsentriesComponent implements OnInit {
  dataSource: Entriesmodel[];
  displayedColumns: string[] = [
    
    'identries',
    'idproducts',
    // 'total',
    // 'unitary_cost',
    // 'unitary_price',
    // 'quantity',
    // 'existence',
    // 'id',
    // 'idcstatus',
    // 'idcompany',
    // 'maker',
    // 'date_add',
    // 'date_set'
  ];

  constructor(protected service: ConfigService) { }

  ngOnInit() {
    this.service.Get('entries').subscribe(
      data => {
        if (data.response) {
          this.dataSource = data.result;
        }
      },
      error => {
        alert(error);
      });
  }

}
