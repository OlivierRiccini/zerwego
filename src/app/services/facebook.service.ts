import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ICredentials } from "../models/auth";

declare const FB: any;

@Injectable({
    providedIn: 'root'
})
export class FacebookService {

    constructor(private authService: AuthService) {
        FB.init({
            appId            : '2290018351254667',
            autoLogAppEvents : false,
            xfbml            : false,
            version          : 'v3.2'
        });

    };

    fbLogin(): Promise<void> {
        return new Promise((resolve, reject) => {
            FB.login(async response=>
                {
                    if (response.authResponse)
                    {    
                    const user = await this.getFacebookUser(response.authResponse.userID);
                    const credentials: ICredentials = {
                        type: 'facebook',
                        username: user.name,
                        email: user.email,
                        facebookId: user.id
                    }
                    this.authService.login(credentials).subscribe(
                        () => resolve()
                    );
                   } else {
                    reject('User login failed');
                 }
            }, { scope: 'public_profile, email'});
        })
    }

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

