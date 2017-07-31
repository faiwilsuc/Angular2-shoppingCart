import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/RX'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard{
    constructor(private authService: AuthService){}
    CanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
        return this.authService.isAuthenticated();
    }
}