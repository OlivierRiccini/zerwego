import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home.component";
import { AuthComponent } from "./auth/auth.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
// import { AuthGuard } from "../services/auth-guard.service";

const homeRoutes: Routes = [
    { path: '', component: HomeComponent, children: [
        { path: 'auth', component: AuthComponent, children: [
            { path: 'signup',  component: SignupComponent },
            { path: 'signin',  component: SigninComponent },
            { path: 'forgot-password',  component: ForgotPasswordComponent }
        ]}
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [RouterModule] 
})
export class AuthRoutingModule { }