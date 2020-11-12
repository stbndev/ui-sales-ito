import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ConfigService } from 'src/app/config/config-service.service';
import { eTipos, eCSTATUS } from './../../config/enums-global.enum';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ResponseNocheServices } from "./../../models/response-ws";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  loading = false;
  durationInSeconds = 5;
  email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);

  @ViewChild('dialogRef', { static: true }) dialogRef: TemplateRef<any>;

  constructor(public dialog: MatDialog,
    protected service: ConfigService,
    protected router: Router) { }

  ngOnInit() {
    this.openDialog();
  }

  closeDialog() {
    alert('close dialog in pipeline');
    this.dialog.closeAll();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(this.dialogRef, dialogConfig);
  }

  onGetUserWithTokenBearer() {
    this.service.Get('users').subscribe(
      d => {
        // console.dir(data);
      },
      error => {
        // console.dir(error);
      }
    ).add(() => {
      console.log('e n d');
    });
    console.log('result breakpoint')

  }

  onDummyMethod(myRawToken: string) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(myRawToken);

    // Other functions
    const expirationDate = helper.getTokenExpirationDate(myRawToken);
    const isExpired = helper.isTokenExpired(myRawToken);

    this.onGetUserWithTokenBearer();

  }

  HideElement(iditem) {
    var element = document.getElementById(`${iditem}`);
    element.classList.remove("showComponent");
    element.classList.add("hideComponent");
  }

  ShowElement(iditem) {
    var element = document.getElementById(`${iditem}`);
    element.classList.remove("hideComponent");
    element.classList.add("showComponent");
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     // return 'You must enter a value';
  //     return 'Ingresa un valor valido';
  //   }

  //   //return this.email.hasError('email') ? 'Not a valid email' : '';
  //   return this.email.hasError('email') ? 'Email incorrecto' : '';
  // }

  onShowAccountDiv() {
    // alert('show AccountDiv in building');
    this.ShowElement('divsignup');
  }

  onShowSigninDiv() {
    // var tmp = ValidateEmail(this.email.value);
    // if (this.email.valid) {
    //   // this.ShowElement('divsignin');
    //   this.HideElement('divsignchoose');
    // } else {
    //   alert('* Verificar email por favor');
    //   return false;
    // }
    // alert('show SigninDiv in building');
    // email
    // if (this.email.hasError('email')  || !this.email.valid ) {
    //   alert('* Verificar email por favor');
    //   return false;
    // } else {
    //   this.ShowElement('divsignin');
    //   this.HideElement('divsignchoose');
    // }
  }

  onForwardPassword() {
    alert('reenvio de contraseña pendiente');
  }

  onSignin() {
    if (this.email.hasError('pattern') || this.email.hasError('required')) {
      alert('Verificar email');
      return false;
    }

    let data = {
      'email': this.model.email,
      'password': this.model.password,
    }

    this.service.Make('auth/login', eTipos.POST, data).subscribe(
      res  => {
        if (res.flag > 1) {
          const pagetitle = 'products'
          this.service.buildingToken(data, pagetitle);
          this.dialog.closeAll();
          this.router.navigateByUrl('/' + pagetitle);
        } else {
          alert('Verificar usuario/contraseña');
        }
      }, error => {
        this.loading = false;
        const e = `Incidencia  ${error.statusText} ${error.name} ${error.message}`;
        alert(e);
      }
    ).add(() => {
      this.loading = false;
    });
  }

  // onSaveForm() {
  //   debugger;
  //   let data = this.model;
  //   this.service.Make('users', eTipos.POST, data).subscribe(
  //     d => {
  //       this.loading = false;
  //       alert('Usuario creado.' + d.data.idsales);
  //     }, error => {
  //       this.loading = false;
  //       alert(error);
  //     }
  //   );
  // }

  // onCancel() {
  //   this.model = {};
  // }

  register() {
    this.loading = true;
    // this.userService.create(this.model)
    //   .subscribe(
    //     d => {
    //       this.alertService.success('Registration successful', true);
    //       this.router.navigate(['/login']);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });

    let data = this.model;
    this.service.Make('users', eTipos.POST, data).subscribe(
      d => {
        this.loading = false;
        alert('Usuario creado.' + data.idsales);
      }, error => {
        this.loading = false;
        alert(error);
      }
    );

  }

}
