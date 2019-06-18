import { Injectable } from '@angular/core';
import { ICountryCode } from '../models/auth';

import * as countryData from 'country-data';
import * as _ from 'lodash';
import ws from 'which-country';
var wc = require('which-country');

@Injectable({
  providedIn: 'root'
})
export class DataService {
    private _countryCodes: ICountryCode[];

    constructor() {
        this.setCountryCodes();
    }

    public get countryCodes(): ICountryCode[] {
        return this._countryCodes;
    }

    // public async getUserContry(): Promise<string> {
    //     return await this.geocalizeUserCountry();
    // }
    
    private setCountryCodes(): void {
        const countryCodes: ICountryCode[] = [];
        const countries: any[] = countryData.countries.all;
        countries.forEach(country => {
            if (country.countryCallingCodes && country.countryCallingCodes.length > 0) {
                country.countryCallingCodes.forEach((code: string) => {
                    countryCodes.push(
                        { 
                            emoji: country.emoji || 'NA',
                            ioc:  country.ioc || 'NA',
                            countryCallingCode: code 
                        }
                    );
                });
            }
        });
        this._countryCodes = countryCodes;
    }

    // private getCoordinates(): Promise<{ longitude: number,  latitude: number }> {
    //     return new Promise((resolve, reject) => {
    //       navigator.geolocation.getCurrentPosition((position: any) => {
    //         resolve({ longitude: position.coords.longitude, latitude: position.coords.latitude })
    //       });
    //     })
    //   }
    
    //   private async geocalizeUserCountry(): Promise<string> {
    //     const coords: { longitude: number,  latitude: number} = await this.getCoordinates();
    //     const lng: number = coords.longitude;
    //     const lgt: number = coords.latitude;
    //     const country: string = wc([lng, lgt]);
    //     return country;
    //   }

}

