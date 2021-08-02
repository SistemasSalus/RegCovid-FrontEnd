import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DropdowList } from '../register/survey/survey.interface';
import { MedicalService } from '../../services/medical.service';
import { ParametersMedical } from '../../models/Parameters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  url: string;
  empresa: string;
  externalsClinics: ParametersMedical[];

  options: DropdowList[] = [
    { value: 0, viewValue: 'TODOS' },
    { value: 1, viewValue: 'PENDIENTES' },
    { value: 2, viewValue: 'REALIZADOS' },
  ];

  employeTypes: DropdowList[] = [
    { value: 1, viewValue: 'BACKUS' },
    { value: 3, viewValue: 'REPARTO' },
    { value: 2, viewValue: 'TERCEROS' },
    { value: 4, viewValue: 'FAMILIAR' },
  ];
  constructor(private medicalService: MedicalService, private router: Router) {
    this.url = this.router.url;
    this.empresa = 'CENTRO MÉDICO';
    this.medicalService.getParameters(280).subscribe((res) => {
      this.externalsClinics = res;
    });
  }

  ngOnInit(): void { }

  btnSearch() {
    // this.medicalService.getServices()
  }
}
