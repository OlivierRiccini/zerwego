import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ICredentials } from "../models/auth.model";

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

    fbLogin(): void {
        console.log("submit login to facebook");
        // FB.login();
        FB.login(async response=>
            {
                if (response.authResponse)
                {    
                console.log('submitLogin',response);
                const user = await this.getFacebookUser(response.authResponse.userID);
                const credentials: ICredentials = {
                    type: 'facebook',
                    name: user.name,
                    email: user.email,
                    facebookId: response.authResponse.userID
                }
                this.authService.login(credentials);
               }
               else
               {
               console.log('User login failed');
             }
        }, { scope: 'public_profile, email'});
    }

    async getFacebookUser(userId: string): Promise<{name: string, email: string, id: string}> {
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

