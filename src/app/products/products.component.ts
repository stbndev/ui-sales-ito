import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productsmodel } from "./../models/models-sales";
import { IProducts } from "./../models/interfaces-sales";

import { CSTATUS_PRODUCTS } from "./../config/enums-global.enum";
import { ConfigService } from "../services/config-service.service";
import { eTipos } from "./../config/enums-global.enum";
import { AddsetComponent } from "./addset/addset.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products = [] as IProducts[];
  selected = 1;
  productstmp: any = [];
  model: Productsmodel;
  liststatus =CSTATUS_PRODUCTS;
   @ViewChild(AddsetComponent, { static: false }) hijito: AddsetComponent;

  constructor(protected service: ConfigService) { }

  ngOnInit() {
    
    this.service.flagSpinner.next(true);
    this.getProducts();
    this.service.productsData.subscribe(
      res => {
        this.model = res;
      }).add(() => {
        // this.service.flagSpinner.next(false);
      });

    this.service.listproductsData.subscribe(
      res => {
        this.products = res
      });
  }

  // Events
  ProductDelete() {
    let product = this.hijito.onDelete();
    // this.service.changeListProductsDataAdd(product);
  }
  ProductSet() {
    this.hijito.onSaveForm();
  }


  ProductAdd() {
    // alert('test');
    let tmpProduct = new Productsmodel(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '');

    this.service.changeProductsData(tmpProduct);

    this.hijito.HideElement('divProductAddSet');


  }
  onSelect(event, item) {
    this.ProductAdd();
    let tmp = Object.assign(this.model, item);
    this.service.changeProductsData(tmp);
  }

  getProducts() {
    this.products= [];
    this.service.Get('products').subscribe((d) => {
      if (d.flag) {
        this.service.changeListProductsData(d.data.slice());
      }
    }, (error) => {
      alert(error);
    }).add(() => {
      this.service.flagSpinner.next(false);
    });
  }


}
