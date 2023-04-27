import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageError404Component } from './page-error404.component';

const routes: Routes = [
  {
      path: "",
      component: PageError404Component,
  }
];

@NgModule({
  declarations: [
    PageError404Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PageError404Module { }
