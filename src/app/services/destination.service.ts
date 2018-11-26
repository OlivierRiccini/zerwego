import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DestinationService {
    constructor(private http: Http) {}

    searchDestination(input) {
        let query: string = typeof input === "string" ? encodeURIComponent(input.trim()) : '';
        return this.http.get(`https://api.teleport.org/api/cities/?search=${query}`);
    }
    
    getUrbanAreasLink(cityLink) {
        return this.http.get(cityLink);
    }

    getCityImageLink(urban_link) {
        return this.http.get(urban_link);   
    }

    getDestinationImage(imageLink) {
        return this.http.get(imageLink);   
    }
}