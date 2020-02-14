import { AfterViewInit, ElementRef, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Productsmodel } from "./../../models/productsmodel";
import { Tipos } from "./../../config/enums-global.enum";
import { CSTATUS } from "./../../config/enums-global.enum";
import { ConfigService } from "./../../config/config-service.service";


@Component({
  selector: 'products-addset',
  templateUrl: './addset.component.html',
  styleUrls: ['./addset.component.css']
})
export class AddsetComponent implements OnInit {
  // setup initial
  //model: any ;   
  model = new Productsmodel(0, '', '', 0, 0, 0, 0, 0, 0, '');
  selected = '1';
  liststatus = CSTATUS;
  imageSrc: any;
  //@Output() open: EventEmitter<any> = new EventEmitter();


  constructor(private elementRef: ElementRef, protected service: ConfigService) { }


  onDelete() {
    let tmpmethod: Tipos;
    let tmpendpoint: String = 'products';

    if (this.model.idproducts > 0) {
      tmpmethod = Tipos.DELETE
      tmpendpoint = `${tmpendpoint}/${this.model.idproducts}`

      this.service.Make(tmpendpoint, tmpmethod, this.model).subscribe((data) => {
        if (data.response) {
          console.dir(data);
          this.service.changeListProductsDataAdd(data.result);
        }
      }, (error) => {
        console.dir(error);
      });
    } else {
      alert('Debe seleccionar un productos')
    }
  }

  onToggleAction() {
    console.dir('elevate');
    return 'display: none;';
  }

  onEventSelection(event) {
    this.model.idcstatus = event;
  }
  onErrorDefaultPic() {
    // this.imageSrc = './../../assets/imgs/defaultimg.jpeg';
    this.imageSrc = 'https://dl.dropbox.com/s/6x9dqmz6ewpdj1w/1581413154.jpeg'
  }

  onChangeFileUpload(fileInput: any) {
    // alert('img change sucess');
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((e) => {
        this.imageSrc = e.target['result'];
      });
      reader.readAsDataURL(fileInput.target.files[0]);

      let files = this.elementRef.nativeElement.querySelector('#ProfilePhoto').files;
      let formData: FormData = new FormData();

      let file = files[0];
      formData.append('ProfilePhoto', file, file.name);

      this.service.Upload('DocFile', formData).subscribe(data => {
        if (data) {
          //console.dir(data);
          // this.service.changeListProductsDataAdd(data.result);
          this.model.pathimg = data;
        }
      }, (error) => {
        console.dir(error);
      });
    }
  }


  onSaveForm() {
    let tmpmethod: Tipos;
    let tmpendpoint: String = 'products';
    if (this.model.idproducts > 0) {
      tmpmethod = Tipos.PUT
      tmpendpoint = `${tmpendpoint}/${this.model.idproducts}`
    } else {
      tmpmethod = Tipos.POST
    }

    this.service.Make(tmpendpoint, tmpmethod, this.model).subscribe((data) => {
      if (data.response) {
        console.dir(data);
        this.service.changeListProductsDataAdd(data.result);
      }
    }, (error) => {
      console.dir(error);
    });
  }

  ngAfterViewInit() {
    // <input type='text' id='loginInput' #abc/>
    // this.abc.nativeElement.value
    // this.elementRef.nativeElement.('fileProductImg').addEventListener('change', this.handleFileSelect.bind(this), false);
  }
  ngOnInit() {

    this.service.productsData.subscribe(res => {
      this.model = res;
      this.selected = this.model.idcstatus > 0 ? this.model.idcstatus.toString() : '1';
    });

  }



}
