import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  spliteRoleName:any;
  makeaRoleArray:any;
  constructor( private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const expectedRole = route.data.expectedRole;
      // const userDetails = this.sharedService.getDataFromStorage();
      // this.userType = userDetails.userDetails.userTypeId;
      // if (!this.authService.isLoggedIn() || this.userType !== expectedRole) {
      //   this.router.navigate(['/auth/login']);
      //   return false;
      // } else {
      //   return true;
      // }
     // return true;
     this.spliteRoleName=sessionStorage.getItem('role');
     this.makeaRoleArray= this.spliteRoleName?.split(',');
     for(let i=0;i<route.data['role'].length;i++)
     {
      for(let j=0;j<this.makeaRoleArray.length;j++)
     {
      if(route.data['role'][i]==this.makeaRoleArray[j])
      {
        return true;
      }
     }
     }
          this.router.navigate(['/CSM']);
          return false;
  }

}
