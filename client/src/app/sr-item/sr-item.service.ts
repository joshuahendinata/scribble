import { Injectable } from '@angular/core';
import { SrItem } from './sr-item.to';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SrItemService {
	constructor(private http:Http){
		console.log('SrItemService Init...');
    }
    
    getSrItems(queryParam) {
        
        var str = Object.keys(queryParam).map(function (key: any) {
            if (key === 'sort' || key === 'limit' || key === 'skip') {
                return key + '=' + encodeURIComponent(queryParam[key]);
            }

            // Transforming srItem to query with regex 
            if (key === 'queryObject' && queryParam[key] != null) {
                var queryObject = queryParam[key];
                var criteriaString = "";
                for (var k in queryObject) {
                    if (criteriaString != "") {
                        criteriaString += "&";
                    }

                    if (queryObject[k].trim() === "") {
                        continue;
                    }

                    criteriaString += (k + "__regex=/.*" + queryObject[k] + ".*/i");
                }
                console.log("criteriaStringkey");
                console.log(criteriaString);
                return criteriaString;
            }
            return '';
        }).join('&');

        // random string to tell browser not to cache
        return this.http.get('/SR?' + str + '&tsp=' + (new Date()).getTime()).map(res => {
            return res;
        }).catch((err: Response) => {
            return Observable.throw(err.statusText);
        });
    }

    getSrItemById(id: number | string) {
        return this.http.get('/SR/' + id).map(res => res.json());
    }

    deleteSrItem(srItem: SrItem) {
        if (srItem._id != null) {
            return this.http.delete('/sr/' + srItem._id).map(res => res.json());
        }
    }
}
