import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mapTo, catchError, tap } from 'rxjs/operators';
import { Precio } from '../models/precio.model';
import { LoadDataTables } from '../models/loaddatatables.model';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  constructor(private http: HttpClient) { }

  getPrecios(): Observable<LoadDataTables> {

    const url = `${environment.ENDPOINTS.API_URL}/precio/precios`;
    return this.http
      .get<any>(url)
      .pipe(map((loaddatatables: any) => LoadDataTables.buildFromJson(loaddatatables)));
  }
}
