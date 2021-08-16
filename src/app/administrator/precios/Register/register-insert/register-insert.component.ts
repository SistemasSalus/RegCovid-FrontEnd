import { Component, OnInit } from '@angular/core';
import { DropdowListString } from '../../../../medical/containers/register/survey/survey.interface';
import { Sede } from '../../../../medical/models/sede.model';

interface DropdowList {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-register-insert',
  templateUrl: './register-insert.component.html',
  styleUrls: ['./register-insert.component.scss']
})
export class RegisterInsertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  components: DropdowListString[] = [
    { value: 'N003-ME000000060', viewValue: 'PRUEBA RÁPIDA' },
    { value: 'N003-ME000000067', viewValue: 'ANTÍGENOS' },
    { value: 'N003-ME000000000', viewValue: 'MOLECULAR' },
  ];

  documentTypes: DropdowList[] = [
    { value: 1, viewValue: 'DNI' },
    { value: 2, viewValue: 'PASSAPORTE' },
  ];

  genereTypes: DropdowList[] = [
    { value: 1, viewValue: 'MASCULINO' },
    { value: 2, viewValue: 'FEMENINO' },
  ];

  employeTypes: DropdowList[] = [
    { value: 1, viewValue: 'PROPIO' },
    { value: 3, viewValue: 'REPARTO' },
    { value: 2, viewValue: 'TERCEROS' },
    { value: 4, viewValue: 'FAMILIAR UNICO' },
    { value: 5, viewValue: 'FAMILIAR ADICIONAL' },
  ];

  Sedesvacias: Sede[] = [
    { SedeId: 1, Sede: 'No Aplica' },
  ];

  reasonExam: DropdowList[] = [
    { value: 1, viewValue: 'TAMIZAJE' },
    { value: 2, viewValue: 'SOSPECHOSO' },
    { value: 3, viewValue: 'CONTACTO DIRECTO' },
    { value: 4, viewValue: 'REINCORPORACIÓN' },
    { value: 5, viewValue: 'OTROS' },
  ];

  placeExam: DropdowList[] = [
    { value: 1, viewValue: 'SEDE' },
    { value: 2, viewValue: 'CLÍNICA' },
    { value: 3, viewValue: 'DOMICILIO' },
  ];

  // scheduleWorker: ScheduleWorker;
  // scheduleWorkerForm: FormGroup;

}
