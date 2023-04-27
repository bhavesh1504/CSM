import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './view/pages/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './view/layouts/sidebar/sidebar.component';
import { FooterComponent } from './view/layouts/footer/footer.component';
import { HeaderComponent } from './view/layouts/header/header.component';
import { InterceptService } from './core/auth/guards/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { ReverseAuthGuard } from './core/auth/guards/reverse-auth.guard';
import { NgxHttpLoaderModule } from 'ngx-http-loader';
import { RoleGuardGuard } from './core/auth/guards/role-guard.guard';
//import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxHttpLoaderModule.forRoot(),
    // NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true,
    },
    AuthGuard,
    ReverseAuthGuard,
    RoleGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
