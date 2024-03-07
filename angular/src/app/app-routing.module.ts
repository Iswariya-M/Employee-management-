import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { NextPageComponent } from './next-page/next-page.component';

const routes: Routes = [
  // {
  //   path:'',
  //   component:EmployeeFormComponent
  // },
  // {
  //   path:'next-page',
  //   component:NextPageComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
