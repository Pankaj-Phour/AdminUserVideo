import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { UserDataComponent } from './user-data/user-data.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path:'',
   component:IntroComponent
  },

  {
    path:'dashboard', 
  component:UserDataComponent,
  canActivate : [AuthGuard]
}
];

@NgModule({
  // Added hashRouting for smooth navigation on various pages 
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
