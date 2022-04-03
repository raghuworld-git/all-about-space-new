import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators";

import { environment } from '../../../../environments/environment';
// Reference site for  generic request service
//https://nichola.dev/generic-approach-to-consume-rest-api/

@Injectable({
    providedIn:'root'
})

export class HttpRequestService {        
    
    constructor(private http:HttpClient){}    

    private readonly APIUrl = environment.apiURL;       

    get<T>(action:string,params:{name:string,value:string}[]=[]):Observable<T>{
        let paramsString ="";
        params.forEach((item,index) =>{
            if(index===0){
                paramsString =`?${item.name}=${item.value}`;
            } else{
                paramsString+=`&${item.name}=${item.value}`
            }                       
        });
        return this.http.get<T>(`${this.APIUrl}/${action}/${paramsString}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {        
        return throwError(()=> console.log(error));
      }
}