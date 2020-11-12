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
      d => {
        if (d.data) {
          // let itemsbestseller = [];
          // itemsbestseller = d.flag;
          // itemsbestseller.filter(function (value,index,array) {
          //   if(value.bestseller === 1){
          //     return value;
          //   }
          // });
          // debugger;
          this.dataSource = d.data;
        }
      },
      error => {
        alert(error);
      });
  }
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
  }

  add(data, e) {
    this.makeOperation(data, +1);
  }
  
  substract(data, e) {
    this.makeOperation(data, -1);
  }

  makeOperation(data, value) {
    debugger;
    let inputTextId = 'canopee' + data.idproducts;
    let input = (<HTMLInputElement>document.getElementById(inputTextId));

    let inputValue = value >= 1 ? parseFloat(input.value) + 1 : parseFloat(input.value) - 1;
    input.value = inputValue.toString();
    //TODO: Add listener ans subscribe to list products
    data.quantity = inputValue;
    this.service.changeListProductsDataAdd(data);
  }

}
