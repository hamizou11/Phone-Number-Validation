import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VerifyComponent } from './verify/verify.component';



const routes: Routes = [{ path: 'verify', component: VerifyComponent }];
//const route: Routes = [{ path: 'phone', component: PhoneComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
