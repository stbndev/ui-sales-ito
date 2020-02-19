import { Component, OnInit } from '@angular/core';
import { Productsmodel } from "./../../models/productsmodel";
import { ConfigService } from "./../../config/config-service.service";
@Component({
  selector: 'app-griditems',
  templateUrl: './griditems.component.html',
  styleUrls: ['./griditems.component.css']
})
export class GriditemsComponent implements OnInit {
  dataSource: Productsmodel[];
  displayedColumns: string[] = ['pathimg', 'unitary_price', 'barcode',];

  constructor(protected service: ConfigService) { }

  ngOnInit() {
    this.service.Get('products').subscribe(
      data => {
        if (data.response) {
          this.dataSource = data.result;
        }
      },
      error => {
        console.dir(error);
        alert(error);
      });
  }

  add(data,e) {
    let inputTextId = 'canopee' + data.idproducts;
    let input = (<HTMLInputElement>document.getElementById(inputTextId));
    let inputValue = parseFloat(input.value) + 1;
    input.value = inputValue.toString();
  }
  substract(data, e) {
    let inputTextId = 'canopee' + data.idproducts;
    let input = (<HTMLInputElement>document.getElementById(inputTextId));
    let inputValue = parseFloat(input.value) - 1;
    input.value = inputValue.toString();
    
  }

}
