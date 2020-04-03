import { Component, OnInit } from '@angular/core';
import { Productsmodel } from 'src/app/models/productsmodel';
import { CSTATUS } from 'src/app/config/enums-global.enum';

@Component({
  selector: 'app-nvtraddset',
  templateUrl: './nvtraddset.component.html',
  styleUrls: ['./nvtraddset.component.css']
})
export class NvtraddsetComponent implements OnInit {
   model = new Productsmodel(0, '', '', 0, 0, 0, 0, 0, 0, '');
   selected = '1';
   liststatus = CSTATUS;
   imageSrc: any;
   
  constructor() { }

  ngOnInit() {
  }

}
