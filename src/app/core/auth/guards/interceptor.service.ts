// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
// import { AuthService } from '../../../../core/auth/_services/auth.service';
// import { SharedService } from '../../../../core/shared/services/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
// import { CookieService } from 'ngx-cookie-service';
 import { ToastrService } from 'ngx-toastr';
/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(
		private authService: AuthService,
		// private sharedSerivce: SharedService,
		private router: Router,
		// private cookieService: CookieService,
        private toastr: ToastrService,
	) {
	}
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = this.authService.getToken();
		if (this.authService.isLoggedIn()) {
			request = request.clone({
				setHeaders: {
					// Authorization: `Bearer ${token}`,
					// 'Cache-Control': 'no-cache',
					// Pragma: 'no-cache',

          // 'Access-Control-Allow-Origin': 'http://localhost:4200/',
          // 'Access-Control-Allow-Credentials': 'true',
          // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          // 'key': 'x-api-key',
          // 'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
          // 'Content-Type': 'application/json ; charset=utf-8',
          // 'X-Requested-With': 'XMLHttpRequest',
          // mode: "no-cors",
          // Accept: 'application/json',
          // 'x-karza-key':'Caji3tT5JsbndrT5'
				}
			});
		}
		return next.handle(request).pipe(
			tap(
				event => {

					if (event instanceof HttpResponse) {
						if (event.body?.count != undefined) {
							this.authService.totalCount.next(event.body?.count)
						} else {
							this.authService.totalCount.next(null)
						}

					}
				},
			),
			catchError(
				err => {
          console.log(err);

          if (err.status == 400) {
            this.toastr.error(err.error.message,'', { timeOut: 2000 });
					}

					if (err.status == 401) {
						localStorage.clear();
						sessionStorage.clear();
						// this.cookieService.deleteAll();
						this.router.navigate(['/auth/login']);
					}

					if (err.error instanceof ArrayBuffer) {
						let clonedError = { ...err };
						// const decodedString = String.fromCharCode.apply(null, new Uint8Array(err.error));
						// clonedError.error = JSON.parse(decodedString);
						const newError = new HttpErrorResponse(clonedError);
						 this.toastr.error(newError.error.message,'', { timeOut: 2000 });
					}

					throw err
				}
			),
			finalize(() => {
			})
		);
	}
}
