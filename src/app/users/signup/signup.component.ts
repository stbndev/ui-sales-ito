import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/config-service.service';
import { eTipos, eCSTATUS } from './../../config/enums-global.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(protected service: ConfigService) { }

  ngOnInit() {

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
