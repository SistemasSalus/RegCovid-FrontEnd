import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  resolveForwardRef,
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MedicalService } from '../../../services/medical.service';
import { Observable, Subscription } from 'rxjs';
import { Service } from '../../../models/medical.model';
import { ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SessionService } from 'src/app/auth/services/session.service';
import { DatePipe } from '@angular/common';
import { DropdowList, DropdowListString } from '../../register/survey/survey.interface';
import { ParametersMedical } from 'src/app/medical/models/Parameters';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scheduled-list',
  templateUrl: './scheduled-list.component.html',
  styleUrls: ['./scheduled-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class ScheduledListComponent implements OnInit, OnDestroy {
  loading: boolean;
  services: Service[];
  serviceSub: Subscription;
  filterSatus: number;
  filterFecha: string;
  filterMedicalCenter: number;
  filterComponent: string;
  dataSource: any;
  service: Service;
  externalsClinics: ParametersMedical[];

  displayedColumns = [
    'index',
    'TypeExam',
    'WorkerName',
    'MedicalCenter',
    'CurrentOccupation',
    'TelephoneNumber',
    'Encuesta',
    'Laboratorio',
    'buttons',
  ];

  options: DropdowList[] = [
    { value: 0, viewValue: 'TODOS' },
    { value: 1, viewValue: 'PENDIENTES' },
    { value: 2, viewValue: 'REALIZADOS' },
  ];

  employeTypes: DropdowList[] = [
    { value: 1, viewValue: 'BACKUS' },
    { value: 3, viewValue: 'REPARTO' },
    { value: 2, viewValue: 'TERCEROS' },
  ];

  components: DropdowListString[] = [
    { value: null, viewValue: 'TODOS' },
    { value: 'N003-ME000000060', viewValue: 'PRUEBA RÁPIDA' },
    { value: 'N003-ME000000067', viewValue: 'ANTÍGENOS' },
    { value: 'N003-00000000000', viewValue: 'MOLECULAR' },
  ];

  constructor(private medicalService: MedicalService, private sessionService: SessionService) {
    this.loading = true;
    this.medicalService.getParameters(280).subscribe((res) => {
      this.externalsClinics = res;
    });
  }

  ngOnInit(): void {
    this.filterSatus = 0;
    this.filterFecha = this.GetDateNow();
    this.filterMedicalCenter = 100;
    this.filterComponent = null;
    this.filter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  filter() {
    const nodeId = this.sessionService.getUser().nodeId;
    const organizationId = this.sessionService.getUser().organizationId;
    const username = this.sessionService.getUser().userName;
    this.serviceSub = this.medicalService
      .getServices(
        this.filterFecha,
        this.filterMedicalCenter,
        this.filterSatus,
        this.filterComponent,
        organizationId,
        `N${nodeId}`,
        username
      )
      .subscribe((services) => {
        this.loading = false;
        this.services = services;
        this.dataSource = new MatTableDataSource(this.services);
      });
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe;
  }

  GetDateNow(): string {
    let n = new Date();
    //Año
    let y = n.getFullYear();
    //Mes
    let m = n.getMonth() + 1;
    //Día
    let d = n.getDate();

    return y + '-' + m + '-' + d;
  }

  btnDeleteService(serviceId: string) {
    Swal.queue([
      {
        title: 'Confirmación',
        confirmButtonText: 'Sí, confirmar',
        text: '¿Está seguro de eliminar este registro?',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.deleteService(serviceId)
            .then((response) => {
              if (response) {
                this.filter();
              }
            })
            .catch(() => {
              Swal.insertQueueStep({
                icon: 'error',
                title: 'ERROR al eliminar',
              });
            });
        },
      },
    ]);
  }
  private deleteService(serviceId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.medicalService.deleteService(serviceId).subscribe((res) => {
        resolve(res);
      });
    });
  }

  downloadFile(serviceId: string) {
    this.medicalService.showPDF(serviceId);
  }
}
