import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../auth/services/session.service';

@Component({
  selector: 'app-other-clinics',
  templateUrl: './other-clinics.component.html',
  styleUrls: ['./other-clinics.component.scss'],
})
export class OtherClinicsComponent implements OnInit {
  constructor(private router: Router, private sessionService: SessionService) {
    if (this.sessionService.getUser().nodeId.toString() === '151') {
      this.access = true;
    } else {
      this.access = false;
    }
  }
  optionValue: string;
  fechaValue: string;
  clinicValue: string;
  access: boolean;
  ngOnInit(): void {}

  newRegister(): void {
    this.router.navigate(['medical/scheduled/register/external']);
  }

  changeOption(value) {
    this.optionValue = value;
  }

  changeFecha(value) {
    this.fechaValue = value;
  }

  changeClinic(value) {
    this.clinicValue = value;
  }
}
