import { Component, OnInit, Input } from '@angular/core';
import { CSTATUS_PRODUCTS } from 'src/app/config/enums-global.enum';
import { Productsmodel } from 'src/app/models/models-sales';
import { ConfigService } from "../../services/config-service.service";

@Component({
  selector: 'app-nvtrsrowitem',
  templateUrl: './nvtrsrowitem.component.html',
  styleUrls: ['./nvtrsrowitem.component.css']
})
export class NvtrsrowitemComponent implements OnInit {
  @Input() data: Productsmodel;
  @Input() dataItem: any;

  // entryproduct: Productstestmodel;
  constructor(protected service: ConfigService) { }

  ngOnInit() {  }

  onSelect(event, data) {
    
    this.service.changeProductsData(data);
  }
  getcstatusname() {
    let x = 'x';
    if (this.data.idcstatus > 0) {
            x = CSTATUS_PRODUCTS.find(x => x.id === this.data.idcstatus).value;
    }
    return x;
    // return x;
}

}
