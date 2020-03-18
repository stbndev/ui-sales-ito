import { Component, OnInit } from '@angular/core';
import { Productsmodel } from "./../../models/productsmodel";
import { eTipos, eCSTATUS } from './../../config/enums-global.enum';
import { Salesmodel, SaleDetails } from "./../../models/salesmodel";
import { ConfigService } from 'src/app/config/config-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TmpsaveorderComponent } from "./../tmpsaveorder/tmpsaveorder.component";
  
@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})

export class PlaceorderComponent implements OnInit {
  products: any = [];
  totalOrder: number = 0;
  totalItemsOrder: number = 0;
  durationInSeconds = 50;

  constructor(protected service: ConfigService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.listproductsData.subscribe(
      res => {
        this.products = res;
        let tmpquantity = 0;
        let tmptotal = [];
        let tmptotal2 = 0;

        this.products.forEach(element => {
          tmpquantity += element.quantity;
          let tmp = element.quantity * element.unitary_price;
          tmptotal2 += element.quantity * element.unitary_price; 
          tmptotal.push(tmp);
        });
        this.totalItemsOrder = tmpquantity;
       this.totalOrder = tmptotal2;
      },
      error => {
        console.dir(error);
        alert(error);
      }
    );
  }

  openSnackBar() {
    this._snackBar.openFromComponent(  TmpsaveorderComponent, {
      duration: this.durationInSeconds * 1000,
    });
    
  }

  onPlaceOrder(e) {
    //TODO:
    // VALIDATE IN CORE WHEN I DONT HAVE PRODUCT EXISTS
    // VALIDATE IN FRONTEND WHEN I DONT HAVE PRODUCTS\
    // RESET PLACE ORDER AND CREATE PRINT PAPER 

    let data = this.buildData();
    this.service.Make('sales', eTipos.POST, data).subscribe(
      data => {
        console.dir(data);
        alert('Orden pedida No.' + data.result.idsales);
      }, error => {
        console.dir(error);
        alert('placeorder.onPlaceOrder');
      }
    )
  }
  
  onSaveOrder(e) {
    console.dir(this.buildData());

  }

  private buildData() {
    // SaleDetails 
    let array = [];

    this.products.forEach(element => {
      let sd = new SaleDetails(0, element.unitary_cost, element.unitary_price, element.quantity, element.idproducts);
      array.push(sd);
    });
    let sm = new Salesmodel(this.totalOrder, eCSTATUS.ACTIVO, 'devendra', 0, array);
    return sm;
  }

}
