import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  model: any;
  flag: boolean = false;

  ngOnInit() {
    debugger;
    this.service.userInfo.subscribe(
      x => {
        
        this.model = x;
        this.adjustName(this.model.pagetitle);
        //  this.user = this.model.name;
      }
    ).add(() => {
      console.dir(this.model);
    });
  }

  adjustName(pagetitle: string) {
    switch (pagetitle) {
      case 'products':
        this.model.pagetitle = 'Productos';
        break;
      case 'sales':
        this.model.pagetitle = 'Ventas';
        break;
      case 'entries':
        this.model.pagetitle = 'Inventarios';
        break;
      case 'shrinkages':
        this.model.pagetitle = 'Perdidas';
        break;

      default:
        console.dir(pagetitle);
        this.model.pagetitle = '';
        break;
    }
  }

  redirect(uri) {    
    this.adjustName(uri);
    this.router.navigateByUrl(`/${uri}`);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private cookies: CookieService, protected service: ConfigService, private breakpointObserver: BreakpointObserver, protected router: Router) { }


}
