import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Login1Service } from 'src/app/core1/service/login1.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService, private service: Login1Service) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    if(this.service.isLoggedIn()) {
      this.router.navigate(['/loandetails']);
      return false;
    }
     else {
      return true;
    };
  }

}
