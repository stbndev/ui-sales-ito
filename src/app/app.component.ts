import { Component } from '@angular/core';
import { ThemePalette, ProgressSpinnerMode } from '@angular/material';
import { Router } from '@angular/router';
import { IUser } from './models/interfaces-sales';
import { ConfigService } from './services/config-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  // value = 50;
  title = 'La casera';
  user:IUser;
  constructor(public services:ConfigService, private router:Router){
    this.services.user.subscribe(rspns => {
      this.user = rspns;
      console.dir( `object change ${rspns}`);
    });
  }
}
