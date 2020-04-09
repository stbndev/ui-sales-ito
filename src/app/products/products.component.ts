import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productsmodel } from "./../models/productsmodel";
import { CSTATUS } from "./../config/enums-global.enum";
import { ConfigService } from "./../config/config-service.service";
import { eTipos } from "./../config/enums-global.enum";
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
  @ViewChild(AddsetComponent, { static: false }) hijito: AddsetComponent;

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
  ProductDelete() {
    let product = this.hijito.onDelete();
    // this.service.changeListProductsDataAdd(product);
  }
  ProductSet() {
    this.hijito.onSaveForm();
  }

  
  ProductAdd() {
    // alert('test');
    let tmpProduct = new Productsmodel(0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '');
    
    this.service.changeProductsData(tmpProduct);

    this.hijito.HideElement('divProductAddSet');

    
  }
  onSelect(event, item) {
    this.ProductAdd();
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
      alert(error);
    })
  }


}
