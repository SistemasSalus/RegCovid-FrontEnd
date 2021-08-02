import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Laboratory } from '../../../models/laboratory.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdowList } from '../survey/survey.interface';
import { MedicalService } from '../../../services/medical.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss'],
})
export class LaboratoryComponent implements OnInit, OnChanges {
  @Input() serviceId: string;
  @Input() componentId: string;
  laboratory: Laboratory;
  laboratoryForm: FormGroup;
  disabledSegundaPrueba: string;
  resultadoFinal: number;

  PR_ID = 'N003-ME000000060';
  PR_FECHA_EJECUCION_ID = 'N006-MF000000069';
  PR_PROCEDENCIA_SOLICITUD_ID = 'N006-MF000000070';
  PR_RES_1_PRUEBA_ID = 'N006-MF000000071';
  PR_RES_2_PRUEBA_ID = 'N006-MF000000072';
  PR_CLASIFICACION_CLINICA_ID = 'N006-MF000000068';

  ANTIGENO_ID = 'N003-ME000000067';
  ANTIGENO_FECHA_EJECUCION_ID = 'N006-MF000000249';
  ANTIGENO_PROCEDENCIA_SOLICITUD_ID = 'N006-MF000000250';
  ANTIGENO_RES_1_PRUEBA_ID = 'N006-MF000000251';
  ANTIGENO_RES_2_PRUEBA_ID = 'N006-MF000000252';
  ANTIGENO_CLASIFICACION_CLINICA_ID = 'N006-MF000000248';

  listaProcedenciaSolicitud: DropdowList[] = [
    { value: 0, viewValue: 'LLAMADA AL 113' },
    { value: 1, viewValue: 'PERSONAL DE SALUD' },
    { value: 2, viewValue: 'PRUEBA EN ESTABLECIMIENTO DE SALUD' },
    { value: 3, viewValue: 'CONTACTO EN CASO CONFIRMADO' },
    { value: 4, viewValue: 'CONTACTO EN CASO SOSPECHOSO' },
    { value: 5, viewValue: 'PROVENIENTE DEL EXTRANJERO' },
    { value: 6, viewValue: 'OTRO PRIORIZADO' },
  ];

  listaResultados: DropdowList[] = [
    { value: -1, viewValue: '' },
    { value: 0, viewValue: 'NEGATIVO' },
    { value: 6, viewValue: 'POSITIVO' },
    { value: 1, viewValue: 'NO VÁLIDO' },
    { value: 2, viewValue: 'IgM POSITIVO' },
    { value: 3, viewValue: 'IgG POSITIVO' },
    { value: 4, viewValue: 'IgM e IgG POSITIVO' },
    { value: 5, viewValue: 'NO SE REALIZÓ' },
  ];

  listaCalificacionClinica: DropdowList[] = [
    { value: 1, viewValue: 'LEVE' },
    { value: 2, viewValue: 'MODERADO' },
    { value: 3, viewValue: 'SEVERO' },
  ];

  constructor(private _formBuilder: FormBuilder, private medicalService: MedicalService) {
    this.laboratory = new Laboratory({});
    this.laboratoryForm = this.createLaboratoryForm();
    this.laboratoryForm.valueChanges.subscribe((val) => {
      this.medicalService.valueLaboratory(val);
      this.medicalService.valueLaboratoryValid(this.laboratoryForm.valid);
      this.medicalService.valueLaboratoryForm(this.laboratoryForm);
    });
  }
  ngOnChanges(): void {
    this.laboratoryForm.get('resultadoPrimeraPrueba').valueChanges.subscribe((resultado) => {
      if (resultado === '1') {
        this.disabledSegundaPrueba = null;
        this.resultadoFinal = resultado;
      } else {
        this.laboratoryForm.get('resultadoSegundaPrueba').reset();
        this.disabledSegundaPrueba = 'disabled';
        this.resultadoFinal = resultado;
      }
      this.laboratoryForm.patchValue({
        confirmeResultado: resultado,
      });
    });

    this.laboratoryForm.get('resultadoSegundaPrueba').valueChanges.subscribe((resultado) => {
      this.resultadoFinal = resultado;

      this.laboratoryForm.patchValue({
        confirmeResultado: resultado,
      });
    });
  }

  ngOnInit(): void {
    if (this.componentId === this.ANTIGENO_ID) {
      this.medicalService
        .getValoresComponente(this.serviceId, this.componentId)
        .subscribe((res) => {
          this.laboratoryForm.patchValue({
            fechaEjecucion:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_FECHA_EJECUCION_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_FECHA_EJECUCION_ID).Value1,

            procedenciaSolicitud:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_PROCEDENCIA_SOLICITUD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_PROCEDENCIA_SOLICITUD_ID)
                    .Value1,

            resultadoPrimeraPrueba:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_RES_1_PRUEBA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_RES_1_PRUEBA_ID).Value1,

            resultadoSegundaPrueba:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_RES_2_PRUEBA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_RES_2_PRUEBA_ID).Value1,

            clasificacionClinica:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_CLASIFICACION_CLINICA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_CLASIFICACION_CLINICA_ID)
                    .Value1,
          });
        });
    } else if (this.componentId === this.PR_ID) {
      this.medicalService
        .getValoresComponente(this.serviceId, this.componentId)
        .subscribe((res) => {
          this.laboratoryForm.patchValue({
            fechaEjecucion:
              res.find((p) => p.ComponentFieldId === this.PR_FECHA_EJECUCION_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_FECHA_EJECUCION_ID).Value1,

            procedenciaSolicitud:
              res.find((p) => p.ComponentFieldId === this.PR_PROCEDENCIA_SOLICITUD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_PROCEDENCIA_SOLICITUD_ID).Value1,

            resultadoPrimeraPrueba:
              res.find((p) => p.ComponentFieldId === this.PR_RES_1_PRUEBA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_RES_1_PRUEBA_ID).Value1,

            resultadoSegundaPrueba:
              res.find((p) => p.ComponentFieldId === this.PR_RES_2_PRUEBA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_RES_2_PRUEBA_ID).Value1,

            clasificacionClinica:
              res.find((p) => p.ComponentFieldId === this.PR_CLASIFICACION_CLINICA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_CLASIFICACION_CLINICA_ID).Value1,
          });
        });
    }
  }
  createLaboratoryForm(): FormGroup {
    return this._formBuilder.group({
      fechaEjecucion: [this.laboratory.fechaEjecucion, [Validators.required]],
      procedenciaSolicitud: [this.laboratory.procedenciaSolicitud, [Validators.required]],
      resultadoPrimeraPrueba: [this.laboratory.resultadoPrimeraPrueba, [Validators.required]],
      resultadoSegundaPrueba: [this.laboratory.resultadoSegundaPrueba],
      clasificacionClinica: [this.laboratory.clasificacionClinica, [Validators.required]],
      confirmeResultado: [this.laboratory.confirmeResultado],
    });
  }
}
