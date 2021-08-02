import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ServiceForAdmin } from '../models/serviceForAdmin.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mapTo, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }

  getServicesForAdmin(
    fechaInicioServicio: string,
    fechaFinServicio: string,
    nameOrDocument: string,
  ): Observable<ServiceForAdmin[]> {

    const url = `${environment.ENDPOINTS.API_URL}/service/servicesForAdmin?fechaInicioServicio=${fechaInicioServicio}&fechaFinServicio=${fechaFinServicio}&nameOrDocument=${nameOrDocument}`;

    return this.http
      .get<any>(url)
      .pipe(map((services: any[]) => services.map((service) => ServiceForAdmin.buildFromJson(service))));
  }

  getServiceFile(serviceId: string): Observable<Blob> {
    const url = `${environment.ENDPOINTS.API_URL}/service/Pdf?serviceId=${serviceId}`;

    return this.http.get(url, { responseType: 'blob' });
  }


  public showPDF(serviceId: string): void {
    this.getServiceFile(serviceId).subscribe((x) => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([x], { type: 'application/pdf' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = serviceId + '.pdf';
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true, view: window }),
      );

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }
}
