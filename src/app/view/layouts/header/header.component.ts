import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];
  constructor(@Inject(DOCUMENT) private document: Document,private authService:AuthService,private router: Router) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.userDetails=sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));
      for(let i=0;i<this.userDetailAtoBValue.role.length;i++)
      {
        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }

    }
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logout()
  {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
