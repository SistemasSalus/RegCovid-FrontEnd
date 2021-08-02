import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { Survey } from '../../models/survey.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SurveyComponent } from './survey/survey.component';
import { Laboratory } from '../../models/laboratory.model';
import { DropdowList } from './survey/survey.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  url: string;
  survey: Survey;
  laboratory: Laboratory;
  serviceId: string;
  personId: string;
  serviceComponentId: string;
  componentId: string;
  surveyFormValid: boolean;
  laboratoryFormValid: boolean;
  urlBack: string;
  // laboratoryFormconfirmation: boolean;
  laboratoryForm: FormGroup;
  previousResults: any[];

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

  constructor(
    private medicalService: MedicalService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.url = this.router.url;
    if (this.url.includes('N151-')) {
      this.urlBack = '/medical/other-clinics';
    } else {
      this.urlBack = '/medical/scheduled';
    }
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.personId = params.get('personId');
      this.componentId = params.get('componentId');
      this.serviceComponentId = params.get('serviceComponentId');
      this.serviceId = params.get('serviceId');
    });
    this.medicalService.survey$.subscribe((data) => {
      this.survey = data;
    });
    this.medicalService.surveyValid$.subscribe((res) => {
      this.surveyFormValid = res;
    });

    this.medicalService.laboratory$.subscribe((data) => {
      this.laboratory = data;
    });
    this.medicalService.laboratoryValid$.subscribe((res) => {
      this.laboratoryFormValid = res;
    });

    this.medicalService.laboratoryForm$.subscribe((res) => {
      this.laboratoryForm = res;
    });

    this.medicalService.getPreviousResults(this.personId).subscribe((res) => {
      this.previousResults = res;
    });

    // this.medicalService.laboratoryConfirmation$.subscribe((res) => {
    //   this.laboratoryFormconfirmation = res;
    // });
  }

  ngOnInit(): void {}

  saveEncuesta() {
    Swal.queue([
      {
        title: 'Confirmación',
        confirmButtonText: 'Sí, confirmar',
        text: '¿Está seguro de registrar encuesta?',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.processSaveSurvey()
            .then((response) => this.router.navigate([this.urlBack]))
            .catch(() => {
              Swal.insertQueueStep({
                icon: 'error',
                title: 'Error en la operación',
              });
            });
        },
      },
    ]);
  }

  async saveLaboratorio() {
    Swal.fire({
      title: '¡IMPORTANTE!',
      input: 'select',
      inputOptions: {
        0: 'NEGATIVO',
        6: 'POSITIVO',
        2: 'IgM POSITIVO',
        3: 'IgG POSITIVO',
        4: 'IgM e IgG POSITIVO',
        5: 'NO SE REALIZÓ',
      },
      inputPlaceholder: 'Confirme resultado',
      showCancelButton: true,
      backdrop: 'rgba(255,0,0,1)',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== '') {
            if (value === this.laboratory.confirmeResultado) {
              this.confirmacion().then(() => {
                resolve();
              });
            } else {
              this.laboratoryForm.reset();
              resolve();
            }
          } else {
            resolve('NECESITAS CONFIRMAR UN RESULTADO');
          }
        });
      },
    });
  }

  private processSaveSurvey(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.survey.personId = this.personId;
      this.survey.componentId = this.componentId;
      this.survey.serviceComponentId = this.serviceComponentId;
      this.survey.inicioSintomas = `${this.survey.day}-${this.survey.month}-${this.survey.year}`;
      this.medicalService.saveSurvey(this.survey).subscribe((res) => {
        resolve(res);
      });
    });
  }

  private confirmacion() {
    return new Promise((resolve) => {
      Swal.queue([
        {
          title: '¡CONFIRMACIÓN CORRECTA!',
          confirmButtonText: 'Sí, GRABAR',
          text: '¿Está seguro de registrar laboratorio?',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.processSaveLaboratory()
              .then((response) => {
                this.router.navigate([this.urlBack]);
                resolve();
              })
              .catch(() => {
                Swal.insertQueueStep({
                  icon: 'error',
                  title: 'Error en la operación',
                });
              });
          },
        },
      ]);
    });
  }

  private processSaveLaboratory(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.laboratory.personId = this.personId;
      this.laboratory.componentId = this.componentId;
      this.laboratory.serviceComponentId = this.serviceComponentId;
      this.medicalService.saveLaboratory(this.laboratory).subscribe((res) => {
        resolve(res);
      });
    });
  }
}
