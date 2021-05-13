import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { ThemePalette, ProgressSpinnerMode } from "@angular/material";
import { ConfigService } from "../services/config-service.service";
import { IPage, IUser } from "../models/interfaces-sales";

@Component({
  selector: "main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"],
})
export class MainNavComponent {
  model = {} as IPage;
  //model = {} ;
  user: IUser;
  private flagSpinner: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private service: ConfigService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.service.flagSpinner.subscribe((res) => {
      this.flagSpinner = res;
    });
    this.service.userSubject.subscribe(
      (rspns) => {
        if (rspns) {
          this.user = rspns;
          this.model.username = rspns.name;
        }
      },
      (error) => {
        console.dir(error);
      }
    );
  }

  logout() {
    this.service.Logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {}

  redirect(title: string) {
    this.model.name = title;
    this.model.pagetitle = title.toUpperCase();
    this.router.navigateByUrl(`/${this.model.name}`);
  }
}
