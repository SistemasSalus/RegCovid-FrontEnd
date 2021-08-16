import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Precio } from '../models/precio.model';
import { PrecioService } from '../services/precio.service';
import { PreciosCrudComponent } from './precios-crud/precios-crud.component';
import Swal from 'sweetalert2';

const DATA_DEFAULT = {
  organizationId: "",
  locationId: "",
  lugarTomaID:"",
  tipoPrueba: "",
  precio:0,
 }

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})

export class PreciosComponent implements AfterViewInit  {
  // precios: Precio[] = [];
  displayedColumns: string[] = ['Empresa', 'sede', 'Prueba', 'lugarToma','precio','acciones'];
  dataSource: MatTableDataSource<Precio> = new MatTableDataSource([]);

  constructor(private precioService: PrecioService, private router: Router, public dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.filter();
  }

  filter() {
    this.precioService
      .getPrecios()
      .subscribe((res) => this.dataSource.data = res);
  }

  newRegister(): void {
    // this.router.navigate(['administrator/app-precios/appinsert']);
    const dialogRef = this.dialog.open(PreciosCrudComponent,{width:'400px',data: DATA_DEFAULT});
    dialogRef.afterClosed()
      .subscribe(result=> {
        if (result) {
          console.log("Nuevo Registro:",result)
          this.precioService
            .createPrecios(result)
            .subscribe(
              () => {window.location.href = "/administrator/app-precios"}
            );
        }
    });
  }

  editRegister(item:any){
    const dialogRef = this.dialog.open(PreciosCrudComponent,{width:'600px',data:item});
    dialogRef.afterClosed()
      .subscribe(result=> {
        if (result) {
          console.log("Editar Registro:",result)
          this.precioService
            .updatePrecios(result)
            .subscribe(
              () => {window.location.href = "/administrator/app-precios"}
            );
        }
      });
  }

  deleteRegister(item:any){
    // const dialogRef = this.dialog.open(PreciosCrudComponent,{width:'600px',data:item});
    // dialogRef.afterClosed()
    //   .subscribe(result=> {
    //     if (result) {
    //       console.log("Editar Registro:",result)
    //       this.precioService
    //         .updatePrecios(result)
    //         .subscribe(
    //           () => {window.location.href = "/administrator/app-precios"}
    //         );
    //     }
    //   });

      Swal.fire({
        title: 'Eliminar Parametro',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          this.precioService.deletePrecios(item).subscribe(
            () => {window.location.href = "/administrator/app-precios"}
          );
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Parametro Borrado");

        }
      })
  }
}
