import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DashboardService {

    baseUrl = '/api/';
    // baseUrl = 'http://localhost:9911/api/';
    constructor(protected http: HttpClient) {}

    getDashboardView(plcViewId : any): Observable<any> {
        let url  = this.baseUrl + 'plc-view/' + plcViewId;
        return this.http.get<any>(url);
    }
}