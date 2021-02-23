import { Component, OnInit } from '@angular/core';
import { Productsmodel } from "./../../models/models-sales";
import { eTipos, CSTATUS_PRODUCTS } from './../../config/enums-global.enum';
import { Salesmodel, SaleDetails } from "../../models/models-sales";
import { ConfigService } from 'src/app/services/config-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TmpsaveorderComponent } from "./../tmpsaveorder/tmpsaveorder.component";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})

export class PlaceorderComponent implements OnInit {
  products: Productsmodel[] = [];
  totalOrder: number = 0;
  totalOrderItems: number = 0;
  durationInSeconds = 50;
  mySubscription: any;

  constructor(private router: Router, protected service: ConfigService, private _snackBar: MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.service.listProductsInCart.subscribe(
      res => {
        // start clear stage 
        this.products = [];
        this.totalOrder = 0;
        this.totalOrderItems = 0;
        // end clear stage
        this.products = res;
        // this.products.forEach( (item,index,self) => {
        //   this.totalOrderItems += self[index].quantity;
        //   this.totalOrder += (self[index].quantity * self[index].unitary_price);
        // });

        this.products.forEach(element => {
          this.totalOrderItems += element.quantity;
          this.totalOrder += (element.quantity * element.unitary_price);
        });
      },
      error => {
        alert(error);
      }
    );
  }

  removeProduct(p) {
    this.service.ProductsInCart(p, true, false);
    let inputTextId = 'canopee' + p.idproducts;
    let input = (<HTMLInputElement>document.getElementById(inputTextId));
    let inputValue = 0;
    input.value = inputValue.toString();
    //TODO: Add listener ans subscribe to list products
    

  }
  remove() {
    // A.splice(0,A.length)
    // this.products = this.products.splice(0, this.products.length);
    this.products = [];
    this.service.ProductsInCart(null, true);
    // this.products =[];
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  openSnackBar() {   
    this._snackBar.openFromComponent(TmpsaveorderComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onPlaceOrder(e) {

    let data = this.buildData();
    this.service.Make('sales', eTipos.POST, data).subscribe(
      d => {
        alert('Orden pedida No.' + d.data.idsales);
        let purchase = JSON.stringify(data);
        window.open(`/orderdetails?data=${purchase}`, '_blank');
        window.location.reload();
      }, error => {
        alert('placeorder.onPlaceOrder');
      }
    ).add(() => {
      
    });
  }

  onSaveOrder(e) {


  }

  private buildData() {
    // SaleDetails 
    let array = [];

    this.products.forEach(element => {
      let sd = new SaleDetails(element.unitary_cost, element.unitary_price, element.quantity, element.idproducts);
      array.push(sd);
    });
    let ACTIVO = CSTATUS_PRODUCTS.find(x=> x.value == "ACTIVO" ).id;
    let sm = new Salesmodel(this.totalOrder, 0,ACTIVO, 0, 'angularwebapp', 0, 0, array);
    
    return sm;
  }

}
