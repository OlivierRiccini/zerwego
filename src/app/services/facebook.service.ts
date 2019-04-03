import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";

declare const FB: any;

@Injectable({
    providedIn: 'root'
})
export class FacebookService {

    constructor() {
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
        FB.login((response)=>
            {
                if (response.authResponse)
                {    
                console.log('submitLogin',response);
                this.getFacebookUser(response.authResponse.userID);
                //login success
                //login success code here
                //redirect to home page
               }
               else
               {
               console.log('User login failed');
             }
        }, { scope: 'public_profile, email'});
    }

    getFacebookUser(userId: string) {
        console.log(userId);
        FB.api(
            userId,
            {'fields': 'id, name, email, friends'},
            function (response) {
              if (response && !response.error) {
                  console.log(response);
                /* handle the result */
              }
            }
        );
    }
    
}

