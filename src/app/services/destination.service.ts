import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class DestinationService {
    constructor(private http: Http) {}

    searchDestination(input: string): Observable<any> {
        let query: string = typeof input === "string" ? encodeURIComponent(input.trim()) : '';
        return this.http.get(`https://api.teleport.org/api/cities/?search=${query}`);
    }
    
    getUrbanAreasLink(cityLink: string): Observable<any> {
        return this.http.get(cityLink);
    }

    getCityImageLink(urban_link: string): Observable<any> {
        return this.http.get(urban_link);   
    }

    getDestinationImage(imageLink: string): Observable<any> {
        return this.http.get(imageLink);   
    }

    getCountryFlag(countryName: string): Observable<any> {
        return this.http.get(`https://restcountries.eu/rest/v2/name/${countryName}`);
    }
}