import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ConfigService } from "src/app/services/config-service.service";
import { IUser } from "src/app/models/interfaces-sales";
import { eTipos, eCSTATUS } from "./../../config/enums-global.enum";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  // model: any = {};
  // loading = false;
  durationInSeconds = 5;

  public loginForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  @ViewChild("dialogRef", { static: true }) dialogRef: TemplateRef<any>;

  constructor(
    private service: ConfigService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // if (this.service.userData) {
    //   this.router.navigateByUrl('/products');
    // }
  }

  ngOnInit() {}

  onSignin() {
    let flag: boolean = false;

    this.service
      .Login("auth/login", this.loginForm.value)
      .subscribe(
        (rsps) => {
          if (rsps.flag == eCSTATUS.OK) {
            flag = true;
            // this.router.navigateByUrl("/products");
            this.router.navigateByUrl("/products");
            window.location.reload();
          } else {
            alert("Verificar usuario/contraseña");
          }
        },
        (error) => {
          const e = `Incidencia  ${error.statusText} ${error.name} ${error.message}`;
          alert(e);
        }
      )
      .add(() => {
        if (flag) {
          console.log("success");
        }
      });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl("/", { skipLocationChange: false }).then(() => {
      this.router.navigate([uri]);
    });
  }

  closeDialog() {
    // this.dialog.closeAll();
  }

  // openDialog() {
  // const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus = true;
  // this.dialog.open(this.dialogRef, dialogConfig);
  // }

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
    this.ShowElement("divsignup");
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
    alert("reenvio de contraseña pendiente");
  }

  // onSaveForm() {
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
    // this.loading = true;
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

    //  let data = this.model;
    this.service.Make("users", eTipos.POST, {}).subscribe(
      () => {
        // this.loading = false;
        // alert('Usuario creado.' + data.idsales);
      },
      (error) => {
        // this.loading = false;
        alert(error);
      }
    );
  }
  onGetUserWithTokenBearer() {
    this.service
      .Get("users")
      .subscribe(
        () => {},
        () => {}
      )
      .add(() => {});
  }

  onDummyMethod(myRawToken: string) {
    const helper = new JwtHelperService();
    // Other functions
    this.onGetUserWithTokenBearer();
  }
}
