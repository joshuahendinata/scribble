import { Injectable } from '@angular/core';
import { RequestItem } from './request-item.to';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestItemService {
	constructor(private http:Http){
		console.log('RequestItemService Init...');
    }
    
    getRequestItems() {
		return this.http.get('/request').map(res => res.json());
    }

    getRequestItemById(id: number | string) {
        return this.http.get('/request/' + id).map(res => res.json());
    }
}
