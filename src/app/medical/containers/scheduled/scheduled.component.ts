import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MedicalService } from '../../services/medical.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.scss'],
})
export class ScheduledComponent implements OnInit {
  dialogRef: any;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  newRegister(): void {
    this.router.navigate(['medical/scheduled/register/internal']);
  }
}
