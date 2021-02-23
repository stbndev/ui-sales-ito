import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Sales2Model, SaleDetailsModel } from "../../models/models-sales";


@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  protected sales:Sales2Model;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    let queryparameters = this.router.snapshot.queryParamMap.get('data');
    let sales = JSON.parse(queryparameters);
    
    try {
      let tmp = Object.assign(new Sales2Model(), sales);
      
      this.sales = tmp;
    } catch (error) {

    }

  }

  mapObject(paramsX): any {
    let sales: Sales2Model = Object.assign(new Sales2Model(), paramsX);
    
  }
}
