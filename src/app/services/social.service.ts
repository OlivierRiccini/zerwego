import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ICredentials } from "../models/auth";
import { AuthService as SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
 

declare const FB: any;

@Injectable({
    providedIn: 'root'
})
export class SocialService {

    constructor(private authService: AuthService, private socialAuthService: SocialAuthService) {
        // FB.init({
        //     appId            : '2290018351254667',
        //     autoLogAppEvents : false,
        //     xfbml            : false,
        //     version          : 'v3.2'
        // });

    };

    async fbLogin(): Promise<void> {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
            user => {
                const credentials: ICredentials = {
                    type: 'facebook',
                    username: user.name,
                    email: user.email,
                    facebookId: user.id
                }
                this.authService.login(credentials).subscribe(
                    () => Promise.resolve()
                );
            }
        );
    }

    // fbLogin(): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         FB.getLoginStatus(async (response)=>  {
    //             if (response.status === 'connected') {
    //                 //display user data
    //                 const user = await this.getFacebookUser(response.authResponse.userID);
    //                 const credentials: ICredentials = {
    //                     type: 'facebook',
    //                     username: user.name,
    //                     email: user.email,
    //                     facebookId: user.id
    //                 }
    //                 this.authService.login(credentials).subscribe(
    //                     () =>  resolve()
    //                 );
    //                 return;
    //             }
    //             FB.login(async response => {
    //                     if (response.authResponse) {    
    //                     const user = await this.getFacebookUser(response.authResponse.userID);
    //                     const credentials: ICredentials = {
    //                         type: 'facebook',
    //                         username: user.name,
    //                         email: user.email,
    //                         facebookId: user.id
    //                     }
    //                     this.authService.login(credentials).subscribe(
    //                         () => resolve()
    //                     );
    //                    } else {
    //                     reject('User login failed');
    //                  }
    //             }, { scope: 'public_profile, email'});
    //         });
    //     })
    // }

    async getFacebookUser(userId: string): Promise<any> {
        return new Promise((resolve, reject) => { 
            FB.api(
                userId,
                {'fields': 'id, name, email'},
                function (response) {
                  if (response && !response.error) {
                      resolve(response);
                    /* handle the result */
                  } else {
                      reject('Error facebook login');
                  }
                }
            );
        });
    }
    
}

