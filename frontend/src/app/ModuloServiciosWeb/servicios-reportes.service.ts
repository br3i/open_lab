import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlServicios } from './urlServiciosWeb.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiciosReportes {
    constructor(private http: HttpClient, private urlServicios: UrlServicios) { }

    getDashboard(): Observable<any> {
        const url = `${this.urlServicios.urlServicio}/rutareportes/dashboard`;
        return this.http.get<any>(url);
    }
}
