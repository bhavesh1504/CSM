import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { authlement } from '../models/auth.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  // private baseUrl = 'http://192.168.1.80:9332/api/v1/login';
  totalCount = new BehaviorSubject(null);
  totalCount$ = this.totalCount.asObservable();

  constructor(private httpClient: HttpClient) {}

  loginUser(auth: authlement)  {//: Observable<object>
   return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/login`, auth);


  //  this.isUserLoggedIn = auth.username == 'admin' && auth.password == 'admin';
  //   sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

  //   return of(this.isUserLoggedIn).pipe(
  //     delay(1000),
  //     tap(val => {
  //         console.log("Is User Authentication is successful: " + val);
  //     })
  //   );
  }

  demoRole(){
    return this.httpClient.get<any>('http://localhost:3000/posts')
  }
  logout() { //: Observable<any>
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('isUserLoggedIn');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    // sessionStorage.removeItem('id');

  return sessionStorage.removeItem('UserDetails');
    // return this.httpClient.post<any>(`/api/auth/logout`, {})

}
// checking authentication state
isLoggedIn() {
  //return localStorage.getItem('isUserLoggedIn');

    return !!sessionStorage.getItem('UserDetails');
}

// getUserDetailsFromStorage(): Observable<any> {
//   const details = JSON.parse(sessionStorage.getItem('UserDetails'));
//   if (details) {
//     return of(details);
//   }
// }

getToken() {
    // let token = JSON.parse(sessionStorage.getItem('UserDetails'));
    let token = sessionStorage.getItem('token');
    // if (token)
    //     return token
    return token

}

// getUserByToken(): Observable<User> {
//     const userToken = localStorage.getItem(environment.authTokenKey);
//     const httpHeaders = new HttpHeaders();
//     httpHeaders.set('Authorization', 'Bearer ' + userToken);
//     return this.httpClient.get<User>(API_USERS_URL, { headers: httpHeaders });
// }

// changePassword(params): Observable<any> {
//     return this.httpClient.post('api/user/change-password', params).pipe(
//         map(res => res)
//     )
// }



//already exit


  // this.authService.loginUser(authData).pipe(
    //   tap(user => {
    //     console.log("user",user);
    //     if (user) {
    //       let accessToken = 'Basic ' + btoa(authData.username + ':' + authData.password);
    //       sessionStorage.setItem('UserDetails', JSON.stringify(accessToken));
    //       const msg = 'Successfully Logged In';
    //       this.toastr.success(msg,'', { timeOut: 2000 });
    //       location.href = "/";
    //     } else {
    //     const msg = 'Incorrect Username & Password';
    //     this.toastr.error(msg,'', { timeOut: 2000 });
    //   }
    //     this.ngxhttploader.hide();
    //   }),
    //   takeUntil(this.unsubscribe)
    // )
    // .subscribe();
}
