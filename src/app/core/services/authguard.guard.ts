import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin) {
      if (this._AuthService.isLoggedIn()) {
      }
    }
    if (!this._AuthService.isLoggedIn()) {
      this._Router.navigate(["/login"], { queryParams: { return: state.url } });
      this._AuthService.redirectUrl = state.url;
      return false;
    }
    return true;
  }
}


