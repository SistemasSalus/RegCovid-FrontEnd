import { Component, ViewEncapsulation, OnInit, Injectable, resolveForwardRef } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeadCount } from '../../../models/headcount.model';
import { DatePipe } from '@angular/common';
import { MedicalService } from '../../../services/medical.service';
import { ScheduleWorker } from '../../../models/service.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Sede } from '../../../models/sede.model';
import { RegisterService } from '../../../models/register-service.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/auth/services/session.service';
import { ParametersMedical } from '../../../models/Parameters';
import { DropdowListString } from '../../register/survey/survey.interface';
import { Empleadora } from 'src/app/medical/models/Empleadora.model';
import { EmpresaPrincipal } from 'src/app/medical/models/EmpresaPrincipal.model';
import { DefaultLocaleConfig } from 'ngx-daterangepicker-material';


@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct {
    return date && date.getFullYear
      ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
      : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}

interface DropdowList {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterFormComponent implements OnInit {
  model2: Date;
  type: string;
  empresa: string;
  pathBack: string;
  sedeString: number;

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

  sedes: Sede[];

  empresasprincipales: EmpresaPrincipal[];
  empresaEmpleadoraString: String;

  scheduleWorker: ScheduleWorker;
  scheduleWorkerForm: FormGroup;
  myControl = new FormControl();
  headcount: HeadCount[];
  externalsClinics: ParametersMedical[];
  empleadoras: string[] = [];
  filteredOptions: Observable<string[]>;
  myControlFilter = new FormControl();
  empleadoraSelected: string;
  controlCurrentOcupDisabled: boolean = false;
  controlCurrentSedeDisabled: boolean = false;
  controlCurrentEmpreDisabled: boolean = false;
  controlCurrentPrincDisabled: boolean = false;
  controlCurrentEmpleadoraDisabled: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private medicalService: MedicalService,
    private _datePipe: DatePipe,
    private router: Router,
    private sessionService: SessionService,
  ) {
    this.medicalService.getParameters(280).subscribe((res) => {
      this.externalsClinics = res;
    });
    this.scheduleWorker = new ScheduleWorker({});
    this.scheduleWorkerForm = this.createUserForm();
    this.headcount = [];
    // this.medicalService
    //   .getSedes(this.sessionService.getUser().organizationId)
    //   .subscribe((res) => (this.sedes = res));
    this.medicalService
      .getEmpresaPrincipal(this.sessionService.getUser().userId)
      .subscribe((res) => (this.empresasprincipales = res));
  }
  ngOnInit(): void {
    this.medicalService.getEmpleadoras("null").subscribe((res) => {

      res.map((res) => {
        return this.empleadoras.push(res.Nombre);
      })

      this.filteredOptions = this.myControlFilter.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    })
  }

  cargarSedes() {
    // console.log('form : ',this.scheduleWorkerForm.get("empresaPrincipalId").value);
    console.log("Tipo Empresa", this.scheduleWorkerForm.get("tipoEmpresaCovidId").value);
    var te = this.scheduleWorkerForm.get("tipoEmpresaCovidId").value;
    var i = this.scheduleWorkerForm.get("empresaPrincipalId").value;
    // console.log('i:',i);
    if (te === '4' || te === '5') {
      console.log("No se hara nada");
    } else {
      this.sedes = [];
      this.medicalService
        .getSedes(i)
        .subscribe((res) => (this.sedes = res));
      console.log("diferente");
    }



    // this.verSede();
    // var f;
    // f = this.sedes[0];
    // console.log(this.sedes[0]);
    // console.log(f);

    // [(ngModel)]="f"

  }

  verSede() {
    console.log('form : ', this.scheduleWorkerForm.get("sedeId").value);

    this.sedeString = this.scheduleWorkerForm.get("sedeId").value;
    // console.log('form : ', this.sedes);
    // console.log('form : ', this.sedes[0]);
  }

  createUserForm(): FormGroup {
    return this._formBuilder.group({
      nodeId: [this.scheduleWorker.nodeId],
      organizationId: [this.scheduleWorker.organizationId],
      sedeId: [this.scheduleWorker.sedeId],
      // sedeId: [{ value: '', disabled: true }, Validators.required],
      componentId: [this.scheduleWorker.componentId],
      firstName: [this.scheduleWorker.firstName, Validators.maxLength(50)],
      firstLastName: [this.scheduleWorker.firstLastName, Validators.maxLength(50)],
      secondLastName: [this.scheduleWorker.secondLastName, Validators.maxLength(50)],
      docTypeId: [this.scheduleWorker.docTypeId],
      docNumber: [this.scheduleWorker.docNumber, Validators.maxLength(20)],
      sexTypeId: [this.scheduleWorker.sexTypeId],
      day: [
        this.scheduleWorker.day,
        [Validators.min(1), Validators.max(31), Validators.maxLength(2)],
      ],
      month: [
        this.scheduleWorker.month,
        [Validators.min(1), Validators.max(12), Validators.maxLength(2)],
      ],
      year: [
        this.scheduleWorker.year,
        [Validators.min(1920), Validators.max(2030), Validators.maxLength(4)],
      ],
      mail: [this.scheduleWorker.mail, Validators.email],
      telephoneNumber: [this.scheduleWorker.telephoneNumber, Validators.maxLength(20)],
      currentOccupation: [this.scheduleWorker.currentOccupation, Validators.maxLength(50)],
      adressLocation: [this.scheduleWorker.adressLocation, Validators.maxLength(150)],
      tipoEmpresaCovidId: [this.scheduleWorker.tipoEmpresaCovidId],
      userId: [this.scheduleWorker.userId],
      tecnico: [this.scheduleWorker.tecnico],
      empresaPrincipalId: [this.scheduleWorker.empresaPrincipalId],
      empresaEmpleadora: [this.scheduleWorker.empresaEmpleadora, Validators.maxLength(50)],
      clinicaExternad: [this.scheduleWorker.clinicaExternad],
      fechaExamen: [this.scheduleWorker.fechaExamen],
      reasonExamId: [this.scheduleWorker.reasonExamId],
      placeExamId: [this.scheduleWorker.placeExamId],
    });
  }

  getPosts(value) {
    const fechaNacimiento = this._datePipe.transform(value.FechaNacimiento, 'dd-MM-yyyy');
    this.scheduleWorkerForm.patchValue({
      firstName: value.Nombres,
      firstLastName: value.ApellidoPaterno,
      secondLastName: value.ApellidoMaterno,
      docNumber: value.Dni,
      sexTypeId: value.SexoId,
      tipoEmpresaCovidId: value.HcId,
      empresaPrincipalId: value.OrganizationId,
      sedeId: value.SedeId,
      day: fechaNacimiento != null ? fechaNacimiento.substr(0, 2) : '',
      month: fechaNacimiento != null ? fechaNacimiento.substr(3, 2) : '',
      year: fechaNacimiento != null ? fechaNacimiento.substr(6, 4) : '',
      currentOccupation: value.Puesto,
      empresaEmpleadora: value.EmpresaEmpleadora,
      telephoneNumber: value.Telefono,
      mail: value.Email,
      adressLocation: value.Direccion,
    });
    this.myControl = new FormControl();
  }

  registerService(event) {
    Swal.queue([
      {
        title: 'Confirmación',
        confirmButtonText: 'Sí, confirmar',
        text: '¿Está seguro de registrar nuevo servicio?',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.saveService(event)
            .then((response) => {
              this.router.navigate(['/medical/scheduled']);
            })
            .catch(() => {
              Swal.insertQueueStep({
                icon: 'error',
                title: 'ERROR EN LA TRANSACCIÓN',
              });
            });
        },
      },
    ]);
  }

  displayFn(filter: HeadCount): string {
    return filter && filter.Filtro ? filter.Filtro : '';
  }

  buscarTrabajador(buscador) {
    this.medicalService.getHeadcount(buscador).subscribe((res) => {
      console.log("RES", res);
      this.headcount = res;
      if (res.length !== 0) {
        if (res[0].Sede == null) this.controlCurrentSedeDisabled = false;
        else this.controlCurrentSedeDisabled = true;

        if (res[0].Puesto == '') this.controlCurrentOcupDisabled = false;
        else this.controlCurrentOcupDisabled = true;

        if (res[0].HC == null) this.controlCurrentEmpreDisabled = false;
        else this.controlCurrentEmpreDisabled = true;

        if (res[0].OrganizationId == null) {
          console.log("Es null");
          console.log("res[0].Organization", res[0].OrganizationId);
          console.log("controlCurrentPrincDisabled antes", this.controlCurrentPrincDisabled);
          this.controlCurrentPrincDisabled = false;
          console.log("controlCurrentPrincDisabled ahora", this.controlCurrentPrincDisabled);
        }
        else {
          console.log("No es null");
          console.log("res[0].Organization", res[0].OrganizationId);
          console.log("controlCurrentPrincDisabled antes", this.controlCurrentPrincDisabled);
          this.controlCurrentPrincDisabled = true;
          console.log("controlCurrentPrincDisabled ahora", this.controlCurrentPrincDisabled);
        }


        console.log("Buscar trabajador", res[0]);
        this.getPosts(res[0]);
        this.cargarSedes();

      } else {
        Swal.fire('No se encontró coincidencia');
        this.controlCurrentSedeDisabled = false;
        this.controlCurrentOcupDisabled = false;
        this.controlCurrentEmpreDisabled = false;
        this.controlCurrentPrincDisabled = false;
      }
    });
  }

  private saveService(event): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const value = event.getRawValue();
      const oRegister: RegisterService = {
        NodeId: this.sessionService.getUser().nodeId,
        OrganizationId: value.empresaPrincipalId,
        UserId: this.sessionService.getUser().userId,
        Tecnico: this.sessionService.getUser().userName,
        ComponentId: value.componentId,
        SedeId: value.sedeId,
        FirstName: value.firstName,
        FirstLastName: value.firstLastName,
        SecondLastName: value.secondLastName,
        DocTypeId: value.docTypeId,
        DocNumber: value.docNumber,
        SexTypeId: value.sexTypeId,
        Birthdate: `${value.year}-${value.month}-${value.day}`,
        Mail: value.mail,
        TelephoneNumber: value.telephoneNumber,
        CurrentOccupation: value.currentOccupation,
        AdressLocation: value.adressLocation,
        NombreSede: value.sedeId,
        TipoEmpresaCovidId: value.tipoEmpresaCovidId,
        ClinicaExternad: value.clinicaExternad,
        FechaExamen: value.fechaExamen,
        EmpresaEmpleadora: value.empresaEmpleadora,
        ReasonExamId: value.reasonExamId,
        PlaceExamId: value.placeExamId,
      };
      this.medicalService.registerService(oRegister).subscribe((res) => {
        resolve(true);
      });
    });
  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();
    return this.empleadoras.filter(option => option.toLowerCase().indexOf(filterValue) === 0);

  }


  setearFamiliar(tipoempleado: string) {
    console.log('tipoempleado :', tipoempleado);
    if (tipoempleado === '4' || tipoempleado === '5') {
      //this.scheduleWorkerForm.controls.sedeId.disabled
      this.controlCurrentSedeDisabled = true;
      this.controlCurrentEmpleadoraDisabled = true;
      // this.sedes = [];
      this.sedes = this.Sedesvacias;
      this.scheduleWorkerForm.controls.sedeId.setValue(1);

      this.scheduleWorkerForm.controls.empresaEmpleadora.setValue('No Aplica');

    }
    else {
      this.controlCurrentSedeDisabled = false;
      this.controlCurrentEmpleadoraDisabled = false;

      if (this.sedeString == null) {
        console.log("SedeString es null");
        this.sedes = [];
        this.cargarSedes();
        this.scheduleWorkerForm.controls.sedeId.setValue(null);
      } else {
        this.cargarSedes();
        this.scheduleWorkerForm.controls.sedeId.setValue(this.sedeString);
      }

      // this.scheduleWorkerForm.controls.myControlFilter.valid;
      this.scheduleWorkerForm.controls.empresaEmpleadora.setValue(this.empresaEmpleadoraString);
      // this.scheduleWorkerForm.controls.myControlFilter.setValue('');

    }
  }

  getPostEmpleadora(value) {
    this.scheduleWorkerForm.patchValue({
      empresaEmpleadora: value
    });
    this.empresaEmpleadoraString = this.scheduleWorkerForm.get("empresaEmpleadora").value;
    console.log(this.empresaEmpleadoraString);
    this.myControl = new FormControl();
  }

  AddEmpresaEmpleadora() {
    Swal.fire({
      title: 'Crear Empresa Empleadora',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      preConfirm: (nombreEmpleadora) => {
        var oEmpEmpleadora: Empleadora = new Empleadora();
        oEmpEmpleadora.Nombre = nombreEmpleadora;
        this.medicalService.saveEmpleadora(oEmpEmpleadora).subscribe((res) => {
          this.getPostEmpleadora(nombreEmpleadora);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Empresa Empleadora Creada");
      }
    })
  }
}
