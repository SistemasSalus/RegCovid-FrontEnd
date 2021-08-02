import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../models/medical.model';
import { Observable, of, Subject } from 'rxjs';
import { HeadCount } from '../models/headcount.model';
import { Empleadora } from '../models/Empleadora.model';
import { map, mapTo, catchError, tap } from 'rxjs/operators';
import { Sede } from '../models/sede.model';
import { EmpresaPrincipal } from '../models/EmpresaPrincipal.model';
import { RegisterService } from '../models/register-service.model';
import { Survey } from '../models/survey.model';
import { ValoresComponente } from '../models/valores-componente.models';
import { Laboratory } from '../models/laboratory.model';
import { Indicadores } from '../models/indicadores';
import { FormGroup } from '@angular/forms';
import { ParametersMedical } from '../models/Parameters';
import { Results } from '../models/Results';

@Injectable({
  providedIn: 'root',
})
export class MedicalService {
  survey$: Observable<Survey>;
  private surveySubject = new Subject<Survey>();

  laboratory$: Observable<Laboratory>;
  private laboratorySubject = new Subject<Laboratory>();

  surveyValid$: Observable<boolean>;
  private surveyValidSubject = new Subject<boolean>();

  laboratoryValid$: Observable<boolean>;
  private laboratoryValidSubject = new Subject<boolean>();

  laboratoryForm$: Observable<FormGroup>;
  private laboratoryFormSubject = new Subject<FormGroup>();

  services: Service[];
  headcount: HeadCount[];

  constructor(private http: HttpClient) {
    this.survey$ = this.surveySubject.asObservable();
    this.surveyValid$ = this.surveyValidSubject.asObservable();
    this.laboratory$ = this.laboratorySubject.asObservable();
    this.laboratoryValid$ = this.laboratoryValidSubject.asObservable();
    this.laboratoryForm$ = this.laboratoryFormSubject.asObservable();
  }

  getIndicadores(nodeId: string, dateService: string): Observable<Indicadores[]> {
    const url = `${environment.ENDPOINTS.API_URL}/service/indicators?node=${nodeId}?date=${dateService}`;
    return this.http
      .get<any>(url)
      .pipe(
        map((indicadores: any[]) =>
          indicadores.map((indicador) => Indicadores.buildFromJson(indicador)),
        ),
      );
  }

  getServices(
    fechaServicio: string,
    medicalCenter: number,
    status: number,
    componentId: string,
    organizationId: string,
    nodeId: string,
    username: string,
  ): Observable<Service[]> {
    const url = `${environment.ENDPOINTS.API_URL}/service/services?fechaServicio=${fechaServicio}&medicalCenter=${medicalCenter}&status=${status}&componentId=${componentId}&organizationId=${organizationId}&nodeId=${nodeId}&userName=${username}`;

    return this.http
      .get<any>(url)
      .pipe(map((services: any[]) => services.map((service) => Service.buildFromJson(service))));
  }

  getServicesOtherClinics(
    organizationId: string,
    nodeId: string,
    fecha: string,
  ): Observable<Service[]> {
    const url = `${environment.ENDPOINTS.API_URL}/service/servicesClinics/${environment.company}?organizationId=${organizationId}&nodeId=${nodeId}&fecha=${fecha}`;
    return this.http
      .get<any>(url)
      .pipe(map((services: any[]) => services.map((service) => Service.buildFromJson(service))));
  }

  getValoresComponente(serviceId: string, componentId: string): Observable<ValoresComponente[]> {
    const url = `${environment.ENDPOINTS.API_URL}/Exam/getValues?serviceId=${serviceId}&componentId=${componentId}`;
    return this.http
      .get<any>(url)
      .pipe(
        map((valores: any[]) => valores.map((valor) => ValoresComponente.buildFromJson(valor))),
      );
  }

  getHeadcount(filter): Observable<HeadCount[]> {
    const url = `${environment.ENDPOINTS.API_URL}/Workes/${filter}`;
    return this.http
      .get<any>(url)
      .pipe(map((headCount: any[]) => headCount.map((row) => HeadCount.buildFromJson(row))));
  }

  getSedes(organizationId: string): Observable<Sede[]> {
    const url = `${environment.ENDPOINTS.API_URL}/Locations/${organizationId}`;
    return this.http
      .get<any>(url)
      .pipe(map((headCount: any[]) => headCount.map((row) => Sede.buildFromJson(row))));
  }

  getEmpresaPrincipal(userId: number): Observable<EmpresaPrincipal[]> {
    const url = `${environment.ENDPOINTS.API_URL}/EmpresaPrincipal/${userId}`;
    console.log(url);
    return this.http
      .get<any>(url)
      .pipe(map((headCount: any[]) => headCount.map((row) => EmpresaPrincipal.buildFromJson(row))));
  }

  getEmpleadoras(filtroNombre: string): Observable<Empleadora[]> {
    const url = `${environment.ENDPOINTS.API_URL}/EmpresaEmpleadora/${filtroNombre}`;
    return this.http
      .get<any>(url)
      .pipe(map((empleadora: any[]) => empleadora.map((row) => Empleadora.buildFromJson(row))));
  }

  saveEmpleadora(empleadora: Empleadora): Observable<any> {

    const url = `${environment.ENDPOINTS.API_URL}/EmpresaEmpleadora`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(url, empleadora, httpOptions).pipe(
      mapTo(true),
      catchError((error) => {
        alert(JSON.stringify(error.error));
        return of(false);
      }),
    );
  }

  getParameters(groupId: number): Observable<ParametersMedical[]> {
    const url = `${environment.ENDPOINTS.API_URL}/SystemParameter/${groupId}`;
    return this.http
      .get<any>(url)
      .pipe(
        map((parameter: any[]) => parameter.map((row) => ParametersMedical.buildFromJson(row))),
      );
  }

  registerService(registerService: RegisterService): Observable<any> {
    const url = `${environment.ENDPOINTS.API_URL}/ScheduleWorkerRegcovid/schedule`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(url, registerService, httpOptions).pipe(
      mapTo(true),
      catchError((error) => {
        return of(false);
      }),
    );
  }

  saveSurvey(survey: Survey): Observable<any> {
    const url = `${environment.ENDPOINTS.API_URL}/Exam/saveSurvey`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(url, survey, httpOptions).pipe(
      mapTo(true),
      catchError((error) => {
        alert(JSON.stringify(error.error));
        return of(false);
      }),
    );
  }

  saveLaboratory(laboratory: Laboratory): Observable<any> {
    const url = `${environment.ENDPOINTS.API_URL}/Exam/savelaboratory`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(url, laboratory, httpOptions).pipe(
      mapTo(true),
      catchError((error) => {
        alert(JSON.stringify(error.error));
        return of(false);
      }),
    );
  }

  getPreviousResults(personId: string): Observable<any[]> {
    const url = `https://resultados.saluslaboris.app/results/${personId}`;
    return this.http
      .get<any>(url)
      .pipe(map((headCount: any[]) => headCount.map((row) => Results.buildFromJson(row))));
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

  // public getPDF(): Observable<Blob> {
  //   //const options = { responseType: 'blob' }; there is no use of this
  //   let uri = '/my/uri';
  //   // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
  //   return this.http.get(uri, { responseType: 'blob' });
  // }

  valueSurvey(data) {
    this.surveySubject.next(data);
  }

  valueLaboratory(data) {
    this.laboratorySubject.next(data);
  }

  valueSurveyValid(data) {
    this.surveyValidSubject.next(data);
  }

  valueLaboratoryValid(data) {
    this.laboratoryValidSubject.next(data);
  }

  valueLaboratoryForm(data) {
    this.laboratoryFormSubject.next(data);
  }

  deleteService(serviceId: string): Observable<boolean> {
    const url = `${environment.ENDPOINTS.API_URL}/service/DeleteService?serviceId=${serviceId}`;
    return this.http.get<any>(url);
  }
}
