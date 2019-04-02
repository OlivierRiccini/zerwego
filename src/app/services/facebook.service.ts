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
        FB.login(result => {
            console.log(result);
        }, {scope: 'public_profile,email'});
    }
    
}

