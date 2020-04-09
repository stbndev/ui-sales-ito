import { Component, OnInit, Input } from '@angular/core';
import { Productsmodel } from 'src/app/models/productsmodel';
import { ConfigService } from "./../../config/config-service.service";

@Component({
  selector: 'app-nvtrsrowitem',
  templateUrl: './nvtrsrowitem.component.html',
  styleUrls: ['./nvtrsrowitem.component.css']
})
export class NvtrsrowitemComponent implements OnInit {
  @Input() data: any;
  @Input() dataItem: any;

  // entryproduct: Productstestmodel;
  constructor(protected service: ConfigService) {

  }

  ngOnInit() {  }

  onSelect(e, d) {
    // this.ProductAdd();
    // let tmp = Object.assign(this.model, item);
    this.service.changeProductsData(d);
  }

}
