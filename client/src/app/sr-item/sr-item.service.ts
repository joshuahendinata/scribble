import { Injectable } from '@angular/core';
import { SrItem } from './sr-item.to';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SrItemService {
	constructor(private http:Http){
		console.log('SrItemService Init...');
    }
    
    getSrItems() {
		return this.http.get('/sr').map(res => res.json());
    }

    getSrItemById(id: number | string) {
        return this.http.get('/sr/' + id).map(res => res.json());
    }
}
