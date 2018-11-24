import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DestinationService {
    constructor(private http: Http) {}

    searchDestination(input) {
        let query: string = encodeURIComponent(input.trim());
        return this.http.get(`https://api.teleport.org/api/cities/?search=${query}`);
    }    
}