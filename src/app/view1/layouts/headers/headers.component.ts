import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanDetailService } from 'src/app/core1/loan-details/service/loan-detail.service';
import { Login1Service } from 'src/app/core1/service/login1.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  queryList:any=[];
  customerName:any;

  constructor(private router: Router, private service:Login1Service, private loanservice:LoanDetailService) { }

  ngOnInit(): void {
    this.loanservice.getLoanDetails().subscribe((res =>{
      this.customerName = res.data[0].customerName;
      console.log(this.customerName);
    }))

  }

  

  logout()
  {
    this.service.logout();
    this.router.navigate(['/auth/login']);
  }

}
