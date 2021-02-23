import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../services/config-service.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private salesService: ConfigService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const user = this.salesService.userData;
        if (user) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } })
        }
        return next.handle(request);
    }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     throw new Error("Method not implemented.");
    // }
}