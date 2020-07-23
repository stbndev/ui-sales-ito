import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemePalette, ProgressSpinnerMode } from '@angular/material';
import { ConfigService } from "./../config/config-service.service";

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  // user: string;
  model: any;

  ngOnInit() {
    // this.user = 'Esteban Blanquel';
    this.service.userInfo.subscribe(
      x => {
        // debugger;
        this.model = x;
       //  this.user = this.model.name;
      }
    ).add(()=>{
      console.dir(this.model);
    });
  }
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(protected service: ConfigService, private breakpointObserver: BreakpointObserver) {}


}
