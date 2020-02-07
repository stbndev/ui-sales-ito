import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productsmodel } from "./../models/productsmodel";
// import { ConfigService } from "./../config/config.service";
// import { Tipos } from "./../config/tipos.enum";
import { ConfigService } from "./../config/config-service.service";
import { Tipos } from "./../config/enums-global.enum";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  model: Productsmodel;

  constructor(protected service: ConfigService) { }

  ngOnInit() {
  this.getProducts();
 
  this.service.productsData.subscribe(
    res=> {
    	this.model = res;
    });

  this.service.listproductsData.subscribe(
  	res=>{
  		this.products = res
  	});
  }

  onSelect(event, item){
  	let tmp = Object.assign(this.model,item);
  	this.service.changeProductsData(tmp);
  }

  getProducts() {
  	this.products = [];
  	this.service.Get('products').subscribe((data)=>{
  		if (data.response) {
  			this.service.changeListProductsData(data.result.slice());
  		}
  	}, (error) =>{
  		console.dir(error);
  		alert(error);
  	})
  }


}
