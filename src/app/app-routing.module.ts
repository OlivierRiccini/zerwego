import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { AuthGuardLoad, AuthGuardActivate } from './services/auth-guard.service';
// import { SignupComponent } from './home/auth/signup/signup.component';
// import { SigninComponent } from './home/auth/signin/signin.component';
// import { ForgotPasswordComponent } from './home/auth/forgot-password/forgot-password.component';
// import { AuthComponent } from './home/auth/auth.component';
// import { MySpaceComponent } from './my-space/my-space.component';

const routes: Routes = [
  // { 
  //   path: '', component: HomeComponent, children: [
  //     { path: 'signup',  component: SignupComponent },
  //     { path: 'signin',  component: SigninComponent },
  //     { path: 'forgot',  component: ForgotPasswordComponent }
  //   ]
  // },
  // { path: '', component: HomeComponent, children: [
  //   { path: 'auth',  loadChildren: './auth/auth.module#AuthModule' }
  // ]},
  { path: '',  loadChildren: './home/home.module#HomeModule' },
  // { path: '', component: HomeComponent},
  // { path: 'auth',  loadChildren: './auth/auth.module#AuthModule' },
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
