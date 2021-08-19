import { Component, Inject, OnInit } from '@angular/core';
import { DropdowListString } from '../../../medical/containers/register/survey/survey.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalService } from '../../../medical/services/medical.service';
import { EmpresaPrincipal } from 'src/app/medical/models/EmpresaPrincipal.model';
import { Sede } from 'src/app/medical/models/sede.model';

export interface Organization {
  value: string;
  viewValue: string;
}

interface DropdowList {
  value: number;
  viewValue: string;
}



@Component({
  selector: 'app-precios-crud',
  templateUrl: './precios-crud.component.html',
  styleUrls: ['./precios-crud.component.scss']
})
export class PreciosCrudComponent implements OnInit{

  components: DropdowListString[] = [
    { value: 'N003-ME000000060', viewValue: 'PRUEBA RÁPIDA' },
    { value: 'N003-ME000000067', viewValue: 'ANTÍGENOS' },
    { value: 'N003-ME000000068', viewValue: 'MOLECULAR' },
  ];

  placeExam: DropdowList[] = [
    { value: 1, viewValue: 'SEDE' },
    { value: 2, viewValue: 'CLÍNICA' },
    { value: 3, viewValue: 'DOMICILIO - ANILLO 1' },
    { value: 4, viewValue: 'DOMICILIO - ANILLO 2' },
    { value: 5, viewValue: 'DOMICILIO - ANILLO 3' },
  ];

  organizations: EmpresaPrincipal[];

  sedes: Sede[];

  constructor(public dialogRef: MatDialogRef<PreciosCrudComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private medicalService: MedicalService) {
    console.log("Enviado desde tabla:",data);
    this.medicalService.getEmpresas()
      .subscribe((res) => this.organizations = res)
    this.cargarSedes(data.organizationId);
  }

  ngOnInit(){
    this.medicalService.getEmpresas()
      .subscribe((res) => this.organizations = res)
  }

  onCerrar(){
    this.dialogRef.close();
  }

  cargarSedes(event){
    this.sedes = [];
      this.medicalService
        .getSedes(event.value)
        .subscribe((res) => (this.sedes = res));
      console.log(event);
  }

}
