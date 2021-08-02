import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ScheduledComponent } from './containers/scheduled/scheduled.component';
import { OtherClinicsComponent } from './containers/other-clinics/other-clinics.component';
import { FlagsComponent } from './containers/scheduled/flags/flags.component';
import { ScheduledListComponent } from './containers/scheduled/scheduled-list/scheduled-list.component';
import { PanelComponent } from '../components/panel/panel.component';
import { RegisterFormComponent } from '../medical/containers/scheduled/register-form/register-form.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MedicalService } from './services/medical.service';
import { RandomGuard } from './guards/random.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';
import { MedicalGuard } from './guards/medical.guard';
import { SurveyComponent } from './containers/register/survey/survey.component';
import { LaboratoryComponent } from './containers/register/laboratory/laboratory.component';
import { RegisterComponent } from './containers/register/register.component';
import { FilterComponent } from './containers/filter/filter.component';

const routes: Routes = [
  {
    path: 'scheduled',
    component: ScheduledComponent,
  },
  // {
  //   path: 'other-clinics',
  //   component: OtherClinicsComponent,
  // },
  {
    path: 'scheduled/register/:type',
    component: RegisterFormComponent,
  },
  {
    path: 'scheduled/register/exam/:id',
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [
    ScheduledComponent,
    OtherClinicsComponent,
    FlagsComponent,
    ScheduledListComponent,
    PanelComponent,
    RegisterFormComponent,
    SurveyComponent,
    LaboratoryComponent,
    RegisterComponent,
    FilterComponent,
  ],
  providers: [
    MedicalGuard,
    MedicalService,
    RandomGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    NgbModule,

    PerfectScrollbarModule,

    RouterModule.forChild(routes),
  ],
})
export class MedicalModule { }
