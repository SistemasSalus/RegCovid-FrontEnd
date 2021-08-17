import { Component, OnInit, Input } from '@angular/core';
import { DropdowList } from './survey.interface';
import { Survey } from '../../../models/survey.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicalService } from '../../../services/medical.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  @Input() serviceId: string;
  @Input() componentId: string;

  PR_ID = 'N003-ME000000060';
  PR_DOMICILIO_ID = 'N006-MF000000045';
  PR_GEOLOCALIZACION_ID = 'N006-MF000000046';
  PR_PROFESION_ID = 'N006-MF000000047';
  PR_ES_PERSONAL_SALUD_ID = 'N006-MF000000048';
  PR_TIENE_SINTOMAS_ID = 'N006-MF000000049';
  PR_INICIO_SINTOMAS_ID = 'N006-MF000000050';
  PR_CEFALEA_ID = 'N006-MF000000051';
  PR_CONGESTION_NASAL_ID = 'N006-MF000000052';
  PR_DIARREA_ID = 'N006-MF000000053';
  PR_DIFIC_RESPIRA_ID = 'N006-MF000000054';
  PR_DOLOR_ID = 'N006-MF000000055';
  PR_DOLOR_GARGANTA_ID = 'N006-MF000000056';
  PR_FIEBRE_ESCALOFRIO_ID = 'N006-MF000000057';
  PR_IRRITABILIDAD_ID = 'N006-MF000000058';
  PR_MALESTAR_GENERAL_ID = 'N006-MF000000059';
  PR_NAUSEAS_ID = 'N006-MF000000060';
  PR_OTROS_ID = 'N006-MF000000061';
  PR_TOS_ID = 'N006-MF000000062';
  PR_ABDOMINAL_ID = 'N006-MF000000063';
  PR_ARTICULACIONES_ID = 'N006-MF000000064';
  PR_MUSCULAR_ID = 'N006-MF000000065';
  PR_PECHO_ID = 'N006-MF000000066';
  PR_OTROS_SINTOMAS_ID = 'N006-MF000000067';
  PR_CLASIFICACION_CLINICA_ID = 'N006-MF000000068';
  PR_FECHA_EJECUCION_ID = 'N006-MF000000069';
  PR_PROCEDENCIA_SOLICITUD_ID = 'N006-MF000000070';
  PR_RES_1_PRUEBA_ID = 'N006-MF000000071';
  PR_RES_2_PRUEBA_ID = 'N006-MF000000072';
  PR_ASMA_ID = 'N006-MF000000073';
  PR_CANCER_ID = 'N006-MF000000074';
  PR_DIABETES_ID = 'N006-MF000000075';
  PR_EMBARAZO_ID = 'N006-MF000000076';
  PR_ENF_CARDIO_ID = 'N006-MF000000077';
  PR_INMUNOSUPRESOR_ID = 'N006-MF000000078';
  PR_ENF_PULMONAR_ID = 'N006-MF000000079';
  PR_HIPERTENCION_ARTERIAL_ID = 'N006-MF000000080';
  PR_INSUFICIENCIA_RENAL_ID = 'N006-MF000000081';
  PR_MAYOR_60_ID = 'N006-MF000000082';
  PR_OBESIDAD_ID = 'N006-MF000000083';
  PR_PERSONAL_SALUD_ID = 'N006-MF000000084';
  PR_CONTINUIDAD_DE_LA_ATENCION_ID = 'N006-MF000000085';
  PR_PROCEDIMIENTO_A_SEGUIR_ID = 'N006-MF000000086';
  PR_OBSERVACION_ID = 'N006-MF000000087';

  ANTIGENO_ID = 'N003-ME000000067';
  ANTIGENO_DOMICILIO_ID = 'N006-MF000000225';
  ANTIGENO_GEOLOCALIZACION_ID = 'N006-MF000000226';
  ANTIGENO_PROFESION_ID = 'N006-MF000000227';
  ANTIGENO_ES_PERSONAL_SALUD_ID = 'N006-MF000000228';
  ANTIGENO_TIENE_SINTOMAS_ID = 'N006-MF000000229';
  ANTIGENO_INICIO_SINTOMAS_ID = 'N006-MF000000230';
  ANTIGENO_CEFALEA_ID = 'N006-MF000000231';
  ANTIGENO_CONGESTION_NASAL_ID = 'N006-MF000000232';
  ANTIGENO_DIARREA_ID = 'N006-MF000000233';
  ANTIGENO_DIFIC_RESPIRA_ID = 'N006-MF0000000234';
  ANTIGENO_DOLOR_ID = 'N006-MF000000235';
  ANTIGENO_DOLOR_GARGANTA_ID = 'N006-MF000000236';
  ANTIGENO_FIEBRE_ESCALOFRIO_ID = 'N006-MF000000238';
  ANTIGENO_IRRITABILIDAD_ID = 'N006-MF000000239';
  ANTIGENO_MALESTAR_GENERAL_ID = 'N006-MF000000240';
  ANTIGENO_NAUSEAS_ID = 'N006-MF000000241';
  ANTIGENO_TOS_ID = 'N006-MF000000242';
  ANTIGENO_ABDOMINAL_ID = 'N006-MF000000243';
  ANTIGENO_ARTICULACIONES_ID = 'N006-MF000000244';
  ANTIGENO_MUSCULAR_ID = 'N006-MF000000245';
  ANTIGENO_PECHO_ID = 'N006-MF000000246';
  ANTIGENO_OTROS_SINTOMAS_ID = 'N006-MF000000247';
  ANTIGENO_CLASIFICACION_CLINICA_ID = 'N006-MF000000248';
  ANTIGENO_FECHA_EJECUCION_ID = 'N006-MF000000249';
  ANTIGENO_PROCEDENCIA_SOLICITUD_ID = 'N006-MF000000250';
  ANTIGENO_RES_1_PRUEBA_ID = 'N006-MF000000251';
  ANTIGENO_RES_2_PRUEBA_ID = 'N006-MF000000252';
  ANTIGENO_ASMA_ID = 'N006-MF000000253';
  ANTIGENO_CANCER_ID = 'N006-MF000000254';
  ANTIGENO_DIABETES_ID = 'N006-MF000000255';
  ANTIGENO_EMBARAZO_ID = 'N006-MF000000256';
  ANTIGENO_ENF_CARDIO_ID = 'N006-MF000000257';
  ANTIGENO_INMUNOSUPRESOR_ID = 'N006-MF000000258';
  ANTIGENO_ENF_PULMONAR_ID = 'N006-MF000000259';
  ANTIGENO_HIPERTENCION_ARTERIAL_ID = 'N006-MF000000260';
  ANTIGENO_INSUFICIENCIA_RENAL_ID = 'N006-MF000000261';
  ANTIGENO_MAYOR_60_ID = 'N006-MF000000262';
  ANTIGENO_OBESIDAD_ID = 'N006-MF000000263';
  ANTIGENO_PERSONAL_SALUD_ID = 'N006-MF000000264';
  ANTIGENO_CONTINUIDAD_DE_LA_ATENCION_ID = 'N006-MF000000265';
  ANTIGENO_PROCEDIMIENTO_A_SEGUIR_ID = 'N006-MF000000266';
  ANTIGENO_OBSERVACION_ID = 'N006-MF000000267';

  MOLECULAR_ID = 'N003-ME000000068';
  MOLECULAR_DOMICILIO_ID = 'N003-MF000000270';
  MOLECULAR_GEOLOCALIZACION_ID = 'N003-MF000000271';
  MOLECULAR_PROFESION_ID = 'N003-MF000000272';
  MOLECULAR_ES_PERSONAL_SALUD_ID = 'N003-MF000000273';
  MOLECULAR_TIENE_SINTOMAS_ID = 'N003-MF000000274';
  MOLECULAR_INICIO_SINTOMAS_ID = 'N003-MF000000275';
  MOLECULAR_CEFALEA_ID = 'N003-MF000000276';
  MOLECULAR_CONGESTION_NASAL_ID = 'N003-MF000000277';
  MOLECULAR_DIARREA_ID = 'N003-MF000000278';
  MOLECULAR_DIFIC_RESPIRA_ID = 'N003-MF000000279';
  MOLECULAR_DOLOR_ID = 'N003-MF000000280';
  MOLECULAR_DOLOR_GARGANTA_ID = 'N003-MF000000281';
  MOLECULAR_FIEBRE_ESCALOFRIO_ID = 'N003-MF000000283';
  MOLECULAR_IRRITABILIDAD_ID = 'N003-MF000000284';
  MOLECULAR_MALESTAR_GENERAL_ID = 'N003-MF000000285';
  MOLECULAR_NAUSEAS_ID = 'N003-MF000000286';
  MOLECULAR_TOS_ID = 'N003-MF000000287';
  MOLECULAR_ABDOMINAL_ID = 'N003-MF000000288';
  MOLECULAR_ARTICULACIONES_ID = 'N003-MF000000289';
  MOLECULAR_MUSCULAR_ID = 'N003-MF000000290';
  MOLECULAR_PECHO_ID = 'N003-MF000000291';
  MOLECULAR_OTROS_SINTOMAS_ID = 'N003-MF000000292';
  MOLECULAR_CLASIFICACION_CLINICA_ID = 'N003-MF000000293';
  MOLECULAR_FECHA_EJECUCION_ID = 'N003-MF000000294';
  MOLECULAR_PROCEDENCIA_SOLICITUD_ID = 'N003-MF000000295';
  MOLECULAR_RES_1_PRUEBA_ID = 'N003-MF000000296';
  MOLECULAR_RES_2_PRUEBA_ID = 'N003-MF000000297';
  MOLECULAR_ASMA_ID = 'N003-MF000000298';
  MOLECULAR_CANCER_ID = 'N003-MF000000299';
  MOLECULAR_DIABETES_ID = 'N003-MF000000300';
  MOLECULAR_EMBARAZO_ID = 'N003-MF000000301';
  MOLECULAR_ENF_CARDIO_ID = 'N003-MF000000302';
  MOLECULAR_INMUNOSUPRESOR_ID = 'N003-MF000000303';
  MOLECULAR_ENF_PULMONAR_ID = 'N003-MF000000304';
  MOLECULAR_HIPERTENCION_ARTERIAL_ID = 'N003-MF000000305';
  MOLECULAR_INSUFICIENCIA_RENAL_ID = 'N003-MF000000306';
  MOLECULAR_MAYOR_60_ID = 'N003-MF000000307';
  MOLECULAR_OBESIDAD_ID = 'N003-MF000000308';
  MOLECULAR_PERSONAL_SALUD_ID = 'N003-MF000000309';
  MOLECULAR_CONTINUIDAD_DE_LA_ATENCION_ID = 'N003-MF000000310';
  MOLECULAR_PROCEDIMIENTO_A_SEGUIR_ID = 'N003-MF000000311';
  MOLECULAR_OBSERVACION_ID = 'N003-MF000000312';


  typeHome: DropdowList[] = [
    { value: 1, viewValue: 'DOMICILIO' },
    { value: 2, viewValue: 'RESIDENCIA' },
  ];

  yesNo: DropdowList[] = [
    { value: -1, viewValue: '' },
    { value: 1, viewValue: 'SÍ' },
    { value: 0, viewValue: 'NO' },
  ];

  profession: DropdowList[] = [
    { value: 0, viewValue: 'MÉDICO' },
    { value: 1, viewValue: 'ENFERMERO' },
    { value: 2, viewValue: 'OBSTETRA' },
    { value: 3, viewValue: 'BIÓLOGO' },
    { value: 4, viewValue: 'TECNÓLOGO MÉDICO' },
    { value: 5, viewValue: 'TÉCNICO DE ENFERMERÍA' },
    { value: 6, viewValue: 'OTROS' },
  ];

  survey: Survey;
  surveyForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private medicalService: MedicalService) {
    this.survey = new Survey({});
    this.surveyForm = this.createSurveyForm();
    this.surveyForm.valueChanges.subscribe((val) => {
      this.medicalService.valueSurvey(val);
      this.medicalService.valueSurveyValid(this.surveyForm.valid);
    });
  }

  ngOnInit(): void {
    if (this.componentId === this.ANTIGENO_ID) {
      this.medicalService
        .getValoresComponente(this.serviceId, this.componentId)
        .subscribe((res) => {
          console.log("RES-TEST", res);
          this.surveyForm.patchValue({
            tipoDomicilio:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_DOMICILIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_DOMICILIO_ID).Value1,

            geolocalizacion:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_GEOLOCALIZACION_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_GEOLOCALIZACION_ID).Value1,

            esPersonalSaludCbo:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_ES_PERSONAL_SALUD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_ES_PERSONAL_SALUD_ID).Value1,

            profesion:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_PROFESION_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_PROFESION_ID).Value1,

            tieneSintomas:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_TIENE_SINTOMAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_TIENE_SINTOMAS_ID).Value1,

            day:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.ANTIGENO_INICIO_SINTOMAS_ID)
                  .Value1.substr(0, 2),

            month:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.ANTIGENO_INICIO_SINTOMAS_ID)
                  .Value1.substr(3, 2),

            year:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.ANTIGENO_INICIO_SINTOMAS_ID)
                  .Value1.substr(6, 4),

            tos:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_TOS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_TOS_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_TOS_ID).Value1 === null
                  ? false
                  : true,

            dolorGarganta:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_DOLOR_GARGANTA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_DOLOR_GARGANTA_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_DOLOR_GARGANTA_ID).Value1 ===
                  null
                  ? false
                  : true,

            congestionNasal:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_CONGESTION_NASAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_CONGESTION_NASAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_CONGESTION_NASAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            dificultadRespiratoria:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIFIC_RESPIRA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIFIC_RESPIRA_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIFIC_RESPIRA_ID).Value1 ===
                  null
                  ? false
                  : true,

            fiebreEscalofrio:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_FIEBRE_ESCALOFRIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_FIEBRE_ESCALOFRIO_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_FIEBRE_ESCALOFRIO_ID)
                    .Value1 === null
                  ? false
                  : true,

            malestarGeneral:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_MALESTAR_GENERAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_MALESTAR_GENERAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_MALESTAR_GENERAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            diarrea:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIARREA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIARREA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIARREA_ID).Value1 === null
                  ? false
                  : true,

            nauseasVomitos:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_NAUSEAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_NAUSEAS_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_NAUSEAS_ID).Value1 === null
                  ? false
                  : true,

            cefalea:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_CEFALEA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_CEFALEA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_CEFALEA_ID).Value1 === null
                  ? false
                  : true,

            irritabilidadConfusion:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_IRRITABILIDAD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_IRRITABILIDAD_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_IRRITABILIDAD_ID).Value1 ===
                  null
                  ? false
                  : true,

            dolor:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_DOLOR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_DOLOR_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_DOLOR_ID).Value1 === null
                  ? false
                  : true,

            // expectoracion:
            //   res.find((p) => p.ComponentFieldId === this.ANTIGENO_OTROS_ID) == null
            //     ? null
            //     : res.find((p) => p.ComponentFieldId === this.ANTIGENO_OTROS_ID).Value1 === '0' ||
            //       res.find((p) => p.ComponentFieldId === this.ANTIGENO_OTROS_ID).Value1 === null
            //     ? false
            //     : true,

            dolorMuscular:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_MUSCULAR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_MUSCULAR_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_MUSCULAR_ID).Value1 === null
                  ? false
                  : true,

            dolorAbdominal:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_ABDOMINAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_ABDOMINAL_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_ABDOMINAL_ID).Value1 === null
                  ? false
                  : true,

            dolorPecho:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_PECHO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_PECHO_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_PECHO_ID).Value1 === null
                  ? false
                  : true,

            dolorArticulaciones:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_ARTICULACIONES_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_ARTICULACIONES_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_ARTICULACIONES_ID).Value1 ===
                  null
                  ? false
                  : true,

            otrosSintomas:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_OTROS_SINTOMAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_OTROS_SINTOMAS_ID).Value1,

            diabetes:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIABETES_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIABETES_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_DIABETES_ID).Value1 === null
                  ? false
                  : true,

            enfPulmonarCronica:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_ENF_PULMONAR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_ENF_PULMONAR_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_ENF_PULMONAR_ID).Value1 ===
                  null
                  ? false
                  : true,

            cancer:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_CANCER_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_CANCER_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_CANCER_ID).Value1 === null
                  ? false
                  : true,

            hipertensionArterial:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_HIPERTENCION_ARTERIAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_HIPERTENCION_ARTERIAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_HIPERTENCION_ARTERIAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            obesidad:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_OBESIDAD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_OBESIDAD_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_OBESIDAD_ID).Value1 === null
                  ? false
                  : true,

            mayor65:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_MAYOR_60_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_MAYOR_60_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_MAYOR_60_ID).Value1 === null
                  ? false
                  : true,

            insuficienciaCronica:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_INSUFICIENCIA_RENAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_INSUFICIENCIA_RENAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_INSUFICIENCIA_RENAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            embarazo:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_EMBARAZO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_EMBARAZO_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_EMBARAZO_ID).Value1 === null
                  ? false
                  : true,

            enfCardiovascular:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_ENF_CARDIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_ENF_CARDIO_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_ENF_CARDIO_ID).Value1 ===
                  null
                  ? false
                  : true,
            asma:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_ASMA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_ASMA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_ASMA_ID).Value1 === null
                  ? false
                  : true,
            enfInmunosupresor:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_INMUNOSUPRESOR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_INMUNOSUPRESOR_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_INMUNOSUPRESOR_ID).Value1 ===
                  null
                  ? false
                  : true,

            personalSalud:
              res.find((p) => p.ComponentFieldId === this.ANTIGENO_PERSONAL_SALUD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.ANTIGENO_PERSONAL_SALUD_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.ANTIGENO_PERSONAL_SALUD_ID).Value1 ===
                  null
                  ? false
                  : true,
          });
        });
    } else if (this.componentId === this.PR_ID) {
      this.medicalService
        .getValoresComponente(this.serviceId, this.componentId)
        .subscribe((res) => {
          this.surveyForm.patchValue({
            tipoDomicilio:
              res.find((p) => p.ComponentFieldId === this.PR_DOMICILIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_DOMICILIO_ID).Value1,

            geolocalizacion:
              res.find((p) => p.ComponentFieldId === this.PR_GEOLOCALIZACION_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_GEOLOCALIZACION_ID).Value1,

            esPersonalSaludCbo:
              res.find((p) => p.ComponentFieldId === this.PR_ES_PERSONAL_SALUD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_ES_PERSONAL_SALUD_ID).Value1,

            profesion:
              res.find((p) => p.ComponentFieldId === this.PR_PROFESION_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_PROFESION_ID).Value1,

            tieneSintomas:
              res.find((p) => p.ComponentFieldId === this.PR_TIENE_SINTOMAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_TIENE_SINTOMAS_ID).Value1,

            // inicioSintomas:
            //   res.find((p) => p.ComponentFieldId === this.PR_INICIO_SINTOMAS_ID) == null
            //     ? null
            //     : res.find((p) => p.ComponentFieldId === this.PR_INICIO_SINTOMAS_ID).Value1,

            day:
              res.find((p) => p.ComponentFieldId === this.PR_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.PR_INICIO_SINTOMAS_ID)
                  .Value1.substr(0, 2),

            month:
              res.find((p) => p.ComponentFieldId === this.PR_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.PR_INICIO_SINTOMAS_ID)
                  .Value1.substr(3, 2),

            year:
              res.find((p) => p.ComponentFieldId === this.PR_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.PR_INICIO_SINTOMAS_ID)
                  .Value1.substr(6, 4),

            tos:
              res.find((p) => p.ComponentFieldId === this.PR_TOS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_TOS_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_TOS_ID).Value1 === null
                  ? false
                  : true,

            dolorGarganta:
              res.find((p) => p.ComponentFieldId === this.PR_DOLOR_GARGANTA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_DOLOR_GARGANTA_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_DOLOR_GARGANTA_ID).Value1 === null
                  ? false
                  : true,

            congestionNasal:
              res.find((p) => p.ComponentFieldId === this.PR_CONGESTION_NASAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_CONGESTION_NASAL_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_CONGESTION_NASAL_ID).Value1 ===
                  null
                  ? false
                  : true,

            dificultadRespiratoria:
              res.find((p) => p.ComponentFieldId === this.PR_DIFIC_RESPIRA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_DIFIC_RESPIRA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_DIFIC_RESPIRA_ID).Value1 === null
                  ? false
                  : true,

            fiebreEscalofrio:
              res.find((p) => p.ComponentFieldId === this.PR_FIEBRE_ESCALOFRIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_FIEBRE_ESCALOFRIO_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_FIEBRE_ESCALOFRIO_ID).Value1 ===
                  null
                  ? false
                  : true,

            malestarGeneral:
              res.find((p) => p.ComponentFieldId === this.PR_MALESTAR_GENERAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_MALESTAR_GENERAL_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_MALESTAR_GENERAL_ID).Value1 ===
                  null
                  ? false
                  : true,

            diarrea:
              res.find((p) => p.ComponentFieldId === this.PR_DIARREA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_DIARREA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_DIARREA_ID).Value1 === null
                  ? false
                  : true,

            nauseasVomitos:
              res.find((p) => p.ComponentFieldId === this.PR_NAUSEAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_NAUSEAS_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_NAUSEAS_ID).Value1 === null
                  ? false
                  : true,

            cefalea:
              res.find((p) => p.ComponentFieldId === this.PR_CEFALEA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_CEFALEA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_CEFALEA_ID).Value1 === null
                  ? false
                  : true,

            irritabilidadConfusion:
              res.find((p) => p.ComponentFieldId === this.PR_IRRITABILIDAD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_IRRITABILIDAD_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_IRRITABILIDAD_ID).Value1 === null
                  ? false
                  : true,

            dolor:
              res.find((p) => p.ComponentFieldId === this.PR_DOLOR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_DOLOR_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_DOLOR_ID).Value1 === null
                  ? false
                  : true,

            expectoracion:
              res.find((p) => p.ComponentFieldId === this.PR_OTROS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_OTROS_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_OTROS_ID).Value1 === null
                  ? false
                  : true,

            dolorMuscular:
              res.find((p) => p.ComponentFieldId === this.PR_MUSCULAR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_MUSCULAR_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_MUSCULAR_ID).Value1 === null
                  ? false
                  : true,

            dolorAbdominal:
              res.find((p) => p.ComponentFieldId === this.PR_ABDOMINAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_ABDOMINAL_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_ABDOMINAL_ID).Value1 === null
                  ? false
                  : true,

            dolorPecho:
              res.find((p) => p.ComponentFieldId === this.PR_PECHO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_PECHO_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_PECHO_ID).Value1 === null
                  ? false
                  : true,

            dolorArticulaciones:
              res.find((p) => p.ComponentFieldId === this.PR_ARTICULACIONES_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_ARTICULACIONES_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_ARTICULACIONES_ID).Value1 === null
                  ? false
                  : true,

            otrosSintomas:
              res.find((p) => p.ComponentFieldId === this.PR_OTROS_SINTOMAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_OTROS_SINTOMAS_ID).Value1,

            diabetes:
              res.find((p) => p.ComponentFieldId === this.PR_DIABETES_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_DIABETES_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_DIABETES_ID).Value1 === null
                  ? false
                  : true,

            enfPulmonarCronica:
              res.find((p) => p.ComponentFieldId === this.PR_ENF_PULMONAR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_ENF_PULMONAR_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_ENF_PULMONAR_ID).Value1 === null
                  ? false
                  : true,

            cancer:
              res.find((p) => p.ComponentFieldId === this.PR_CANCER_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_CANCER_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_CANCER_ID).Value1 === null
                  ? false
                  : true,

            hipertensionArterial:
              res.find((p) => p.ComponentFieldId === this.PR_HIPERTENCION_ARTERIAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_HIPERTENCION_ARTERIAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_HIPERTENCION_ARTERIAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            obesidad:
              res.find((p) => p.ComponentFieldId === this.PR_OBESIDAD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_OBESIDAD_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_OBESIDAD_ID).Value1 === null
                  ? false
                  : true,

            mayor65:
              res.find((p) => p.ComponentFieldId === this.PR_MAYOR_60_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_MAYOR_60_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_MAYOR_60_ID).Value1 === null
                  ? false
                  : true,

            insuficienciaCronica:
              res.find((p) => p.ComponentFieldId === this.PR_INSUFICIENCIA_RENAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_INSUFICIENCIA_RENAL_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_INSUFICIENCIA_RENAL_ID).Value1 ===
                  null
                  ? false
                  : true,

            embarazo:
              res.find((p) => p.ComponentFieldId === this.PR_EMBARAZO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_EMBARAZO_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_EMBARAZO_ID).Value1 === null
                  ? false
                  : true,

            enfCardiovascular:
              res.find((p) => p.ComponentFieldId === this.PR_ENF_CARDIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_ENF_CARDIO_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_ENF_CARDIO_ID).Value1 === null
                  ? false
                  : true,
            asma:
              res.find((p) => p.ComponentFieldId === this.PR_ASMA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_ASMA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_ASMA_ID).Value1 === null
                  ? false
                  : true,
            enfInmunosupresor:
              res.find((p) => p.ComponentFieldId === this.PR_INMUNOSUPRESOR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_INMUNOSUPRESOR_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_INMUNOSUPRESOR_ID).Value1 === null
                  ? false
                  : true,

            personalSalud:
              res.find((p) => p.ComponentFieldId === this.PR_PERSONAL_SALUD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.PR_PERSONAL_SALUD_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.PR_PERSONAL_SALUD_ID).Value1 === null
                  ? false
                  : true,
          });
        });
    }else if (this.componentId === this.MOLECULAR_ID) {
      this.medicalService
        .getValoresComponente(this.serviceId, this.componentId)
        .subscribe((res) => {
          console.log("RES-MOLECULAR_ID", res);
          this.surveyForm.patchValue({
            tipoDomicilio:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_DOMICILIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_DOMICILIO_ID).Value1,

            geolocalizacion:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_GEOLOCALIZACION_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_GEOLOCALIZACION_ID).Value1,

            esPersonalSaludCbo:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_ES_PERSONAL_SALUD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_ES_PERSONAL_SALUD_ID).Value1,

            profesion:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_PROFESION_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_PROFESION_ID).Value1,

            tieneSintomas:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_TIENE_SINTOMAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_TIENE_SINTOMAS_ID).Value1,

            day:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.MOLECULAR_INICIO_SINTOMAS_ID)
                  .Value1.substr(0, 2),

            month:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.MOLECULAR_INICIO_SINTOMAS_ID)
                  .Value1.substr(3, 2),

            year:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_INICIO_SINTOMAS_ID) == null
                ? null
                : res
                  .find((p) => p.ComponentFieldId === this.MOLECULAR_INICIO_SINTOMAS_ID)
                  .Value1.substr(6, 4),

            tos:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_TOS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_TOS_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_TOS_ID).Value1 === null
                  ? false
                  : true,

            dolorGarganta:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_DOLOR_GARGANTA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_DOLOR_GARGANTA_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_DOLOR_GARGANTA_ID).Value1 ===
                  null
                  ? false
                  : true,

            congestionNasal:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_CONGESTION_NASAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_CONGESTION_NASAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_CONGESTION_NASAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            dificultadRespiratoria:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIFIC_RESPIRA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIFIC_RESPIRA_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIFIC_RESPIRA_ID).Value1 ===
                  null
                  ? false
                  : true,

            fiebreEscalofrio:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_FIEBRE_ESCALOFRIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_FIEBRE_ESCALOFRIO_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_FIEBRE_ESCALOFRIO_ID)
                    .Value1 === null
                  ? false
                  : true,

            malestarGeneral:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_MALESTAR_GENERAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_MALESTAR_GENERAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_MALESTAR_GENERAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            diarrea:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIARREA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIARREA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIARREA_ID).Value1 === null
                  ? false
                  : true,

            nauseasVomitos:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_NAUSEAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_NAUSEAS_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_NAUSEAS_ID).Value1 === null
                  ? false
                  : true,

            cefalea:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_CEFALEA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_CEFALEA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_CEFALEA_ID).Value1 === null
                  ? false
                  : true,

            irritabilidadConfusion:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_IRRITABILIDAD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_IRRITABILIDAD_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_IRRITABILIDAD_ID).Value1 ===
                  null
                  ? false
                  : true,

            dolor:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_DOLOR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_DOLOR_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_DOLOR_ID).Value1 === null
                  ? false
                  : true,

            // expectoracion:
            //   res.find((p) => p.ComponentFieldId === this.ANTIGENO_OTROS_ID) == null
            //     ? null
            //     : res.find((p) => p.ComponentFieldId === this.ANTIGENO_OTROS_ID).Value1 === '0' ||
            //       res.find((p) => p.ComponentFieldId === this.ANTIGENO_OTROS_ID).Value1 === null
            //     ? false
            //     : true,

            dolorMuscular:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_MUSCULAR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_MUSCULAR_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_MUSCULAR_ID).Value1 === null
                  ? false
                  : true,

            dolorAbdominal:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_ABDOMINAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_ABDOMINAL_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_ABDOMINAL_ID).Value1 === null
                  ? false
                  : true,

            dolorPecho:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_PECHO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_PECHO_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_PECHO_ID).Value1 === null
                  ? false
                  : true,

            dolorArticulaciones:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_ARTICULACIONES_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_ARTICULACIONES_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_ARTICULACIONES_ID).Value1 ===
                  null
                  ? false
                  : true,

            otrosSintomas:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_OTROS_SINTOMAS_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_OTROS_SINTOMAS_ID).Value1,

            diabetes:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIABETES_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIABETES_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_DIABETES_ID).Value1 === null
                  ? false
                  : true,

            enfPulmonarCronica:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_ENF_PULMONAR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_ENF_PULMONAR_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_ENF_PULMONAR_ID).Value1 ===
                  null
                  ? false
                  : true,

            cancer:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_CANCER_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_CANCER_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_CANCER_ID).Value1 === null
                  ? false
                  : true,

            hipertensionArterial:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_HIPERTENCION_ARTERIAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_HIPERTENCION_ARTERIAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_HIPERTENCION_ARTERIAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            obesidad:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_OBESIDAD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_OBESIDAD_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_OBESIDAD_ID).Value1 === null
                  ? false
                  : true,

            mayor65:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_MAYOR_60_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_MAYOR_60_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_MAYOR_60_ID).Value1 === null
                  ? false
                  : true,

            insuficienciaCronica:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_INSUFICIENCIA_RENAL_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_INSUFICIENCIA_RENAL_ID)
                  .Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_INSUFICIENCIA_RENAL_ID)
                    .Value1 === null
                  ? false
                  : true,

            embarazo:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_EMBARAZO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_EMBARAZO_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_EMBARAZO_ID).Value1 === null
                  ? false
                  : true,

            enfCardiovascular:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_ENF_CARDIO_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_ENF_CARDIO_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_ENF_CARDIO_ID).Value1 ===
                  null
                  ? false
                  : true,
            asma:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_ASMA_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_ASMA_ID).Value1 === '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_ASMA_ID).Value1 === null
                  ? false
                  : true,
            enfInmunosupresor:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_INMUNOSUPRESOR_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_INMUNOSUPRESOR_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_INMUNOSUPRESOR_ID).Value1 ===
                  null
                  ? false
                  : true,

            personalSalud:
              res.find((p) => p.ComponentFieldId === this.MOLECULAR_PERSONAL_SALUD_ID) == null
                ? null
                : res.find((p) => p.ComponentFieldId === this.MOLECULAR_PERSONAL_SALUD_ID).Value1 ===
                  '0' ||
                  res.find((p) => p.ComponentFieldId === this.MOLECULAR_PERSONAL_SALUD_ID).Value1 ===
                  null
                  ? false
                  : true,
          });
        });
    }
  }

  createSurveyForm(): FormGroup {
    return this._formBuilder.group({
      tipoDomicilio: [this.survey.tipoDomicilio],
      geolocalizacion: [this.survey.geolocalizacion],
      esPersonalSaludCbo: [this.survey.esPersonalSaludCbo],
      profesion: [this.survey.profesion],
      tieneSintomas: [this.survey.tieneSintomas],

      day: [this.survey.day, [Validators.min(1), Validators.max(31), Validators.maxLength(2)]],
      month: [this.survey.month, [Validators.min(1), Validators.max(12), Validators.maxLength(2)]],
      year: [
        this.survey.year,
        [Validators.min(2019), Validators.max(2025), Validators.maxLength(4)],
      ],
      inicioSintomas: [`${this.survey.day}-${this.survey.month}-${this.survey.year}`],
      tos: [this.survey.tos],
      dolorGarganta: [this.survey.dolorGarganta],
      congestionNasal: [this.survey.congestionNasal],
      dificultadRespiratoria: [this.survey.dificultadRespiratoria],
      fiebreEscalofrio: [this.survey.fiebreEscalofrio],
      malestarGeneral: [this.survey.malestarGeneral],
      diarrea: [this.survey.diarrea],
      nauseasVomitos: [this.survey.nauseasVomitos],
      cefalea: [this.survey.cefalea],
      irritabilidadConfusion: [this.survey.irritabilidadConfusion],
      dolor: [this.survey.dolor],
      expectoracion: [this.survey.expectoracion],
      dolorMuscular: [this.survey.dolorMuscular],
      dolorAbdominal: [this.survey.dolorAbdominal],
      dolorPecho: [this.survey.dolorPecho],
      dolorArticulaciones: [this.survey.dolorArticulaciones],
      otrosSintomas: [this.survey.otrosSintomas],
      diabetes: [this.survey.diabetes],
      enfPulmonarCronica: [this.survey.enfPulmonarCronica],
      cancer: [this.survey.cancer],
      hipertensionArterial: [this.survey.hipertensionArterial],
      obesidad: [this.survey.obesidad],
      mayor65: [this.survey.mayor65],
      insuficienciaCronica: [this.survey.insuficienciaCronica],
      embarazo: [this.survey.embarazo],
      enfCardiovascular: [this.survey.enfCardiovascular],
      asma: [this.survey.asma],
      enfInmunosupresor: [this.survey.enfInmunosupresor],
      personalSalud: [this.survey.personalSalud],
    });
  }
}
