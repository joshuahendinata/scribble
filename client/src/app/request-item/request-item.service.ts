import { Injectable } from '@angular/core';
import { RequestItem } from './request-item.to';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RequestItemService {
    constructor(private http: Http) {
        console.log('RequestItemService Init...');
    }

    getRequestItems(queryParam) {

        var str = Object.keys(queryParam).map(function (key: any) {
            if (key === 'sort' || key === 'limit' || key === 'skip') {
                return key + '=' + encodeURIComponent(queryParam[key]);
            }

            // Transforming requestItem to query with regex 
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
        return this.http.get('/request?' + str + '&tsp=' + (new Date()).getTime()).map(res => {
            return res;
        }).catch((err: Response) => {
            return Observable.throw(err.statusText);
        });
    }

    getRequestItemById(id: number | string) {
        return this.http.get('/request/' + id).map(res => res.json());
    }

    saveOrUpdateRequestItem(requestItem: RequestItem) {
        if (requestItem._id != null) {
            return this.http.put('/request/' + requestItem._id, requestItem).map(res => res.json());
        }

        // NO cache per request
        let headersAdditional: Headers;
        headersAdditional = new Headers({ 'Cache-control': 'no-cache' })
        headersAdditional.append('Cache-control', 'no-store');
        headersAdditional.append('Expires', '0');
        headersAdditional.append('Pragma', 'no-cache');

        return this.http.post('/request', requestItem, {
            headers: headersAdditional
        }).map(res => res.json());
    }

    deleteRequestItem(requestItem: RequestItem) {
        if (requestItem._id != null) {
            return this.http.delete('/request/' + requestItem._id).map(res => res.json());
        }
    }
}
