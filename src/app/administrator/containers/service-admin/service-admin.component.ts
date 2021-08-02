import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subscription } from 'rxjs/internal/Subscription';
import { ServiceForAdmin } from '../../models/serviceForAdmin.model';
import { AdministratorService } from '../../services/administrator.service';
@Component({
  selector: 'app-service-admin',
  templateUrl: './service-admin.component.html',
  styleUrls: ['./service-admin.component.scss']
})
export class ServiceAdminComponent implements OnInit {

  displayedColumns = [
    'index',
    'TypeExam',
    'WorkerName',
    'MedicalCenter',
    'CurrentOccupation',
    'TelephoneNumber',
    'FechaServicio',
    'buttons',
  ];
  serviceSub: Subscription;
  filterFechaInicio: string;
  filterFechaFin: string;
  nameOrDocument: string;
  loading: boolean;
  services: ServiceForAdmin[];
  dataSource: any;

  constructor(private serviceAdmin: AdministratorService) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  filter() {
    this.loading = true;
    if (this.filterFechaInicio == undefined || this.filterFechaFin == undefined) {
      this.obtenerfechas()
    }

    if (this.nameOrDocument == undefined) {
      this.nameOrDocument = '';
    }

    this.serviceSub = this.serviceAdmin
      .getServicesForAdmin(
        this.filterFechaInicio,
        this.filterFechaFin,
        this.nameOrDocument
      )
      .subscribe((services) => {
        this.loading = false;
        this.services = services;
        this.dataSource = new MatTableDataSource(this.services);
        console.log(this.dataSource);
      });
  }

  private obtenerfechas() {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.filterFechaInicio = moment(primerDia).format("DD/MM/yyyy");
    this.filterFechaFin = moment(ultimoDia).format("DD/MM/yyyy");
    console.log(this.filterFechaInicio, this.filterFechaFin);
  }

  downloadFile(serviceId: string) {
    this.serviceAdmin.showPDF(serviceId);
  }
}
