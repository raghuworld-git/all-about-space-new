import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpRequestService } from "../http/http-request.service";
import { IAstronautDetailModel } from "../../../shared/models/launch/astronautDetail.model";

@Injectable({
    providedIn:'root'
})
export class AstronautService {

        constructor(private requestService:HttpRequestService){}

        private action:string='astronaut';

        getAstronautDetailsById(id:string):Observable<IAstronautDetailModel>{
            return this.requestService.get<IAstronautDetailModel>(`${this.action}/${id}`);    
        }
}