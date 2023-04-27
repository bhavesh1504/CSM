import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Login1Service {

  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  addMobileNo(mobile:any): Observable<any> {

    const params =  {
    
        "mobileNumber":mobile
    
    }
    
    return this.http.post<any>(environment.baseUrl+'api/v1/csm/sendOtpToMobile',params)
  }

  addOtpPan(mobile:any,otpPan:any,pannumber:any): Observable<any> {

    const data = {
      "mobileNumber":mobile,
      "otp":otpPan,
      "panNumber":pannumber

    }

    return this.http.post<any>(environment.baseUrl+'api/v1/csm/verifyOtpToMobile',data)

  }

  logout() {
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('token');
  

  return sessionStorage.removeItem('token');

}

isLoggedIn() {
    return !!sessionStorage.getItem('token');
}

getToken() {
  let token = sessionStorage.getItem('token');
  return token
}
}
