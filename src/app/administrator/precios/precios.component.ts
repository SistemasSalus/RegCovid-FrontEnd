import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Precio } from '../models/precio.model';
import { PrecioService } from '../services/precio.service';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})

export class PreciosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  precios: Precio[] = [];

  constructor(private http: HttpClient,private precioService: PrecioService) { }

  ngOnInit(): void {

    const that = this;

    var a = this.precioService.getPrecios();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        // that.http
        //   .get<DataTablesResponse>(
        //     url,
        //     {}
        //   ).subscribe(resp => {
        //     console.log(resp.recordsFiltered);

        //     that.precios = resp.data;

        //     callback({
        //       recordsTotal: resp.recordsTotal,
        //       recordsFiltered: resp.recordsFiltered,
        //       data: []
        //     });
        //   });

        that.precioService
          .getPrecios()
          .subscribe(resp => {
            that.precios = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          })
      },
      columns: [{ data: 'id' }, { data: 'Empresa' }, { data: 'sede' }, { data: 'precio' }]
    };

  }
}
