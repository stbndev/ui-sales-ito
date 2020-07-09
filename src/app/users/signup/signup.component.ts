import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/config-service.service';
import { eTipos, eCSTATUS } from './../../config/enums-global.enum';
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any = {};
  loading = false;
  durationInSeconds = 5;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor( protected service: ConfigService, protected router: Router) { }

  ngOnInit() { }
  
  onGetUserWithTokenBearer() {
    this.service.Get('users').subscribe(
      data => {
        console.dir(data);
      },
      error => {
        console.dir(error);
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
    // console.log('decodedToken');
    // console.dir(decodedToken);
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

  getErrorMessage() {
    if (this.email.hasError('required')) {
      // return 'You must enter a value';
      return 'Ingresa un valor valido';
    }

    //return this.email.hasError('email') ? 'Not a valid email' : '';
    return this.email.hasError('email') ? 'Email incorrecto' : '';
  }

  onShowAccountDiv() {
    // alert('show AccountDiv in building');
    this.ShowElement('divsignup');
  }

  onShowSigninDiv() {
    // alert('show SigninDiv in building');
    // email
    if (this.email.hasError('email')) {
      alert('Verificar email');
      return false;
    } else {
      this.ShowElement('divsignin');
      this.HideElement('divsignchoose');
    }
  }

  onForwardPassword() {
    alert('reenvio de contraseña pendiente');
  }

  onSignin() {
    let data = {
      'email': this.model.email,
      'password': this.model.password,
    }

    this.service.Make('auth/login', eTipos.POST, data).subscribe(
      data => {
        if (data.response) {
          this.service.setToken(data.message);
          this.router.navigateByUrl('/products');
          // this.onDummyMethod(data.message);
        } else {
          alert('Verificar usuario/contraseña');
        }
      }, error => {
        this.loading = false;
        alert(error);
      }
    ).add(() => {
      this.loading = false;
    });
  }

  onSaveForm() {
    let data = this.model;
    this.service.Make('users', eTipos.POST, data).subscribe(
      data => {
        this.loading = false;
        alert('Usuario creado.' + data.result.idsales);
      }, error => {
        this.loading = false;
        alert(error);
      }
    );
  }

  onCancel() {
    this.model = {};
  }

  register() {
    this.loading = true;
    // this.userService.create(this.model)
    //   .subscribe(
    //     data => {
    //       this.alertService.success('Registration successful', true);
    //       this.router.navigate(['/login']);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });

    let data = this.model;
    this.service.Make('users', eTipos.POST, data).subscribe(
      data => {
        this.loading = false;
        alert('Usuario creado.' + data.result.idsales);
      }, error => {
        this.loading = false;
        alert(error);
      }
    );

  }

}
