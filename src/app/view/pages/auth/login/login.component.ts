import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NgxHttpLoaderService } from 'ngx-http-loader';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { Login1Service } from 'src/app/core1/service/login1.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!:FormGroup;
  loginForm: FormGroup;
  logining: boolean = false;
  
  showCustomerForm:boolean = true;
  showAgentForm:boolean = false;
  lastClickedCustomer:boolean = true;
  

  private unsubscribe: Subject<any>;
  role: any;
  id: any;
  rolename: any=[]
  otpValue: any;
  hide = true;

  firstLoginForm!:FormGroup;
  secondLoginForm!:FormGroup
  isLinear = true;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient,
    private cdr: ChangeDetectorRef, private toastr: ToastrService,
    private fb: FormBuilder, private ngxhttploader: NgxHttpLoaderService, private service: Login1Service) {
    this.unsubscribe = new Subject();
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const authData = {
      userName: controls['username'].value,
      password: controls['password'].value
    }
    this.logining = true;
    this.ngxhttploader.show();
    // this.authService.loginUser(authData).pipe(
    //   tap(user => {
    //     if (user) {
    //       console.log("user",user);
    //       let accessToken = 'Basic ' + btoa(authData.username + ':' + authData.password);
    //       sessionStorage.setItem('UserDetails', JSON.stringify(accessToken));
    //       location.href = "/";
    //     } else {
    //     }
    //     const msg = 'Successfully Logged In';
    //     this.toastr.success(msg,'', { timeOut: 2000 });
    //   }),
    //   takeUntil(this.unsubscribe),
    //   finalize(() => {
    //     this.logining = false;
    //     this.cdr.markForCheck();
    //   }),
    // 	catchError(err => {
    // 		let showError = JSON.stringify(err.error.message);
    //     this.toastr.error(showError,'', { timeOut: 2000 });
    // 		throw err;
    // 	})
    // )
    // .subscribe();

    //pending *************************



    this.authService.loginUser(authData).pipe(
      tap(user => {
         if (user) {
      // let accessToken = 'Basic ' + btoa(authData.userName + ':' + authData.password);
      // let roleArray=user.data.role;
      // for(let i=0;i<roleArray.length;i++)
      // {
      //   roleArray.push()
      // }

      // sessionStorage.setItem('UserDetails', user);
      // sessionStorage.setItem('role',user.data.role[0]['roleCode']);
      // sessionStorage.setItem('id',user.data.id);
      // sessionStorage.setItem('token',JSON.stringify(accessToken));
      // sessionStorage.setItem('isUserLoggedIn', user ? "true" : "false");

      let roleArray = user.data.role;
      for (let i = 0; i < roleArray.length; i++) {
        this.rolename.push(roleArray[i].roleName)
      }
      let accessToken = 'Basic ' + btoa(authData.userName + ':' + authData.password);
      sessionStorage.setItem('UserDetails', btoa(JSON.stringify(user.data)));
      sessionStorage.setItem('role', this.rolename);
      // sessionStorage.setItem('id', user.data.id);
      sessionStorage.setItem('token', JSON.stringify(accessToken));
      sessionStorage.setItem('isUserLoggedIn', user ? "true" : "false");


          const msg = 'Successfully Logged In';
          this.toastr.success(msg,'', { timeOut: 1000 });
          // console.log(msg);
          location.href = "/CSM";
          // this.router.navigateByUrl('/');
          // this.router.navigate(['/CSM/']);
         }
      //else {
      //   const msg = 'Incorrect Username & Password';
      //   this.toastr.error(msg,'', { timeOut: 2000 });
      // }
        this.ngxhttploader.hide();
      }),
      takeUntil(this.unsubscribe),
            finalize(() => {
        this.ngxhttploader.hide();
        this.cdr.markForCheck();
      }),
    	catchError(err => {
    		// let showError = JSON.stringify(err.error.message);
        let showError = err.error.message;
        this.toastr.error(showError,'', { timeOut: 2000 });
    		throw err;
  })).subscribe();



    //productive task code


    // this.http.get<any>('http://localhost:3000/posts').subscribe(
    //   (user) => {
    //     console.log(user);
    //     // const user = res.find((a:any)=>{
    //     //   if(a.username=== authData.userName && a.password===authData.password)
    //     //   {
    //     //     console.log(this.id=a.id);
    //     //     console.log(this.role=a.role);
    //     //   }
    //     //   return a.username=== authData.userName && a.password===authData.password
    //     // });

    //     if(user)
    //     {
    //     let roleArray = user.data.role;

    //     for (let i = 0; i < roleArray.length; i++) {
    //       this.rolename.push(roleArray[i].roleName)
    //     }
    //     console.log(roleArray, this.rolename);

    //     let accessToken = 'Basic ' + btoa(authData.userName + ':' + authData.password);

    //     sessionStorage.setItem('UserDetails', btoa(JSON.stringify(user.data)));
    //     sessionStorage.setItem('role', this.rolename);
    //     // sessionStorage.setItem('id', user.data.id);
    //     sessionStorage.setItem('token', JSON.stringify(accessToken));
    //     sessionStorage.setItem('isUserLoggedIn', user ? "true" : "false");


    //       const msg = 'Successfully Logged In';
    //       this.toastr.success(msg,'', { timeOut: 2000 });
    //       location.href = "/";
    //     }
    //     else{
    //       const msg = 'Incorrect Username & Password';
    //       this.toastr.error(msg,'', { timeOut: 2000 });
    //     }
    //     this.ngxhttploader.hide();
    //   },
    //   (err) => {
    //     console.log(err);
    //   },);

  }

  createForm(){
    this.firstLoginForm = this.fb.group({
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[0-9]{10}$')])],
    });
    this.secondLoginForm = this.fb.group({
      otp: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{6}$')])],
      pancard: ['', Validators.compose([Validators.required,Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')])],
    });
  }

  addMobile(stepper?:MatStepper) {
    let _successMessage = 'OTP Send Successfully';
    let _errorMessage = 'User Not Exist';
    this.service.addMobileNo(this.firstLoginForm.get('mobile')?.value).pipe(map(res => {
      this.otpValue = res.data
        if(res.msgKey == 'Success') {
          this.toastr.success(_successMessage)
          // this.isLinear = false;
          stepper?.next();
          localStorage.setItem('mobile',this.firstLoginForm.get('mobile')?.value)
        }else if (res.msgKey == 'Failure') {
          this.toastr.error(_errorMessage)         
          stepper?.previous();
        }
    })).subscribe();
       
  }



  addOtpPan() {
    let _successMessage = 'Customer Login Successfully';
    let _errorMessage = 'Something Went Wrong';
   this.service.addOtpPan(this.firstLoginForm.get('mobile')?.value,this.otpValue,this.secondLoginForm.get('pancard')?.value).subscribe(
    (res)=>{
      if(res.msgKey != 'Failure'){
        let accessToken = 'Basic ' + btoa(this.firstLoginForm.get('mobile')?.value + ':' + this.secondLoginForm.get('pancard')?.value);

        // sessionStorage.setItem('id', user.data.id);
        sessionStorage.setItem('token', JSON.stringify(accessToken));
  
        this.router.navigateByUrl('loandetails');
        this.toastr.success(_successMessage)
      }
    }
   );
 

  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string, validationType: string): boolean {
    const control = this.secondLoginForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrorr(controlName: string, validationType: string): boolean {
    const control = this.firstLoginForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
    
  }

  ngOnDestroy(): void {
    // this.authNoticeService.setNotice(null);
    // this.unsubscribe.next();
    this.unsubscribe.complete();
    this.logining = false;
    this.loginForm.reset();
  }

  }
   
  





// Login Work

// this.http.get<any>('http://localhost:3000/posts').subscribe(
//   (res) => {
//     console.log(res);
//     const user = res.find((a:any)=>{
//       if(a.username=== authData.username && a.password===authData.password)
//       {
//         console.log(this.id=a.id);
//         console.log(this.role=a.role);
//       }
//       return a.username=== authData.username && a.password===authData.password
//     });
//     if(user)
//     {

//       let accessToken = 'Basic ' + btoa(authData.username + ':' + authData.password);
//       sessionStorage.setItem('UserDetails', JSON.stringify(accessToken));
//       sessionStorage.setItem('token','abcdefghijklmnopqrstuvwxyz');
//       sessionStorage.setItem('role',this.role);
//       sessionStorage.setItem('id',this.id);
//       sessionStorage.setItem('isUserLoggedIn', user ? "true" : "false");

//       const msg = 'Successfully Logged In';
//       this.toastr.success(msg,'', { timeOut: 2000 });
//       location.href = "/";
//     }
//     else{
//       const msg = 'Incorrect Username & Password';
//       this.toastr.error(msg,'', { timeOut: 2000 });
//     }
//     this.ngxhttploader.hide();
//   },
//   (err) => {
//     console.log(err);
//  },);


  

  


 



  

 
