import { AfterViewInit, ElementRef, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Productsmodel } from "./../../models/models-sales";
import { eTipos, CSTATUS_PRODUCTS } from "./../../config/enums-global.enum";
// import { CSTATUS } from "./../../config/enums-global.enum";
import { ConfigService } from "../../services/config-service.service";


@Component({
  selector: 'products-addset',
  templateUrl: './addset.component.html',
  styleUrls: ['./addset.component.css']
})
export class AddsetComponent implements OnInit {
  // setup initial
  //model: any ;   
  model = new Productsmodel(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '');
  selected = 5;
  liststatus = CSTATUS_PRODUCTS;
  imageSrc: any;


  constructor(private elementRef: ElementRef, protected service: ConfigService) { }

  onCancel() {
    // this.model = new Productsmodel(0, '', '', 0, 0, 0, 0, 0, 0, 'https://dl.dropboxusercontent.com/s/6x9dqmz6ewpdj1w/1581413154.jpeg');
    this.model = new Productsmodel(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '');
  }

  HideElement(iditem) {
    var element = document.getElementById(`${iditem}`);
    if (element.className === 'hideComponent') {
      element.classList.remove("hideComponent");
      element.classList.add("showComponent");
    }
    else {
      element.classList.remove("showComponent");
      element.classList.add("hideComponent");
    }
  }
  onDelete(): any {
    let tmpmethod: eTipos;
    let tmpendpoint: String = 'products';

    if (this.model.idproducts > 0) {
       let ELIMINADO = CSTATUS_PRODUCTS.find(x=> x.value == "ELIMINADO").id;
      this.model.idcstatus = ELIMINADO;
      tmpmethod = eTipos.DELETE
      tmpendpoint = `${tmpendpoint}/${this.model.idproducts}`
      this.service.Make(tmpendpoint, tmpmethod, this.model).subscribe((d) => {
        if (d.flag) {
          this.service.changeListProductsDataAdd(this.model);
          this.HideElement('divProductAddSet');
        }
      }, (error) => {
        return null;
      });
    } else {
      alert('Debe seleccionar un productos');
      return null;
    }
  }

  onEventSelection(event) {
    this.model.idcstatus = parseInt(event);
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
      formData.append('file', file, file.name);

      this.service.Upload('docfile', formData).subscribe(d => {
        if (d.flag) {
          this.model.pathimg = d.data;
        } else {
          alert(d);
        }
      }, (error) => {
        alert(error);
      });
    }
  }


  onSaveForm() {
    this.service.flagSpinner.next(true);
    let tmpmethod: eTipos;
    let tmpendpoint: String = 'products';
    this.model.maker = this.service.userData.id;
    
    if (this.model.idproducts > 0) {
      tmpmethod = eTipos.PUT
      tmpendpoint = `${tmpendpoint}/${this.model.idproducts}`
    } else {
      tmpmethod = eTipos.POST
    }
    //TODO
    // Validation sale when no there items for buy
    
    this.service.Make(tmpendpoint, tmpmethod, this.model).subscribe((d) => {
      if (d.flag) {
        this.service.changeListProductsDataAdd(d.data);
        this.HideElement('divProductAddSet');
      }
    }, (error) => {
      alert(error);
    }).add(() => {
      this.service.flagSpinner.next(false);
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
      this.selected = this.model.idcstatus > 0 ? this.model.idcstatus :1;
      this.model.idcstatus = (this.selected);
    });
  }



}
