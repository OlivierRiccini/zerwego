import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardLoad, AuthGuardActivate } from './services/auth-guard.service';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
// import { MySpaceComponent } from './my-space/my-space.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent, children: [
      { path: 'signup',  component: SignupComponent },
      { path: 'signin',  component: SigninComponent }
    ]
  },
  {
    path: 'myspace', canLoad: [AuthGuardLoad],
    canActivate: [AuthGuardActivate],
    runGuardsAndResolvers: 'always',
    loadChildren: './my-space/my-space.module#MySpaceModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
