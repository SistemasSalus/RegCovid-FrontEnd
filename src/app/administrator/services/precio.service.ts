import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mapTo, catchError, tap } from 'rxjs/operators';
import { Precio } from '../models/precio.model';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  constructor(private http: HttpClient) { }

  getPrecios(): Observable<Precio[]> {

    const url = `${environment.ENDPOINTS.API_URL}/precio/precios`;
    return this.http
      .get<any>(url)
      .pipe(map((precios: any[]) => precios.map((precio) => Precio.buildFromJson(precio))));
  }

  createPrecios(data:any) {

    const url = `${environment.ENDPOINTS.API_URL}/precio/create`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<any>(url,data,httpOptions)
      .pipe(map((precios: any) => console.log(precios)));
  }

  updatePrecios(data:any) {

    const url = `${environment.ENDPOINTS.API_URL}/precio/update`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .put<any>(url,data,httpOptions)
      .pipe(map((precios: any) => console.log(precios)));
  }

  deletePrecios(data:any) {
    const url = `${environment.ENDPOINTS.API_URL}/precio/delete?id=${data.id}`;
    return this.http.get<any>(url);
  }
}
