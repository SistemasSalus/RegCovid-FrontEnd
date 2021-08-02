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

  getServicesForAdmin(
    fechaInicioServicio: string,
    fechaFinServicio: string,
    nameOrDocument: string,
  ): Observable<Precio[]> {

    const url = `${environment.ENDPOINTS.API_URL}/service/servicesForAdmin?fechaInicioServicio=${fechaInicioServicio}&fechaFinServicio=${fechaFinServicio}&nameOrDocument=${nameOrDocument}`;

    return this.http
      .get<any>(url)
      .pipe(map((precios: any[]) => precios.map((precio) => Precio.buildFromJson(precio))));
  }
}
