import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productsmodel } from "./../models/productsmodel";
import { CSTATUS } from "./../config/enums-global.enum";
import { ConfigService } from "./../config/config-service.service";
import { Tipos } from "./../config/enums-global.enum";
import { AddsetComponent } from "./addset/addset.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  selected = '1';
  productstmp: any = [];
  model: Productsmodel;
  liststatus = CSTATUS;


  constructor(protected service: ConfigService) { }

  ngOnInit() {
    this.getProducts();

    this.service.productsData.subscribe(
      res => {
        this.model = res;
      });

    this.service.listproductsData.subscribe(
      res => {
        this.products = res
      });
  }

  // Events
  ProductAddSet() {
    // alert('test');
    let tmpProduct : Productsmodel;
    this.service.changeProductsData(tmpProduct);

    var element = document.getElementById("divProductAddSet");

    if (element.className === 'hideComponent') {
      element.classList.remove("hideComponent");
      element.classList.add("showComponent");
    }
    // else {
    //   element.classList.remove("showComponent");
    //   element.classList.add("hideComponent");
    // }
  }
  onSelect(event, item) {
    this.ProductAddSet();
    let tmp = Object.assign(this.model, item);
    this.service.changeProductsData(tmp);
  }

  getProducts() {
    this.products = [];


    this.service.Get('products').subscribe((data) => {
      if (data.response) {
        this.service.changeListProductsData(data.result.slice());
      }
    }, (error) => {
      console.dir(error);
      alert(error);
    })
  }


}
