import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  addMobileNo(mobile:any): Observable<any> {

    const params =  {
    
        "mobileNumber":mobile
    
    }
    
    return this.http.post<any>(environment.baseUrl+'api/v1/sendOtpToMobile',params)
  }

  addOtpPan(mobile:any,otpPan:any,pannumber:any): Observable<any> {

    const data = {
      "mobileNumber":mobile,
      "otp":otpPan,
      "panNumber":pannumber

    }

    return this.http.post<any>(environment.baseUrl+'api/v1/verifyOtpToMobile',data)

  }

  logout() { //: Observable<any>
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('token');
  

  return sessionStorage.removeItem('UserDetails');

}

isLoggedIn() {
    return !!sessionStorage.getItem('UserDetails');
}

getToken() {
  let token = sessionStorage.getItem('token');
  return token
}

}
