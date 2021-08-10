import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IndicatorsComponent } from './indicators/indicators.component';
import { UsersComponent } from './users/users.component';
import { ServiceAdminComponent } from './containers/service-admin/service-admin.component';
import { PreciosComponent } from './precios/precios.component';

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

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';
import { DataTablesModule } from "angular-datatables";

const routes: Routes = [
  {
    path: 'indicators',
    component: IndicatorsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'services-admin',
    component: ServiceAdminComponent,
  },
  {
    path: 'app-precios',
    component: PreciosComponent,
  },
];

@NgModule({
  declarations: [IndicatorsComponent, UsersComponent, ServiceAdminComponent, PreciosComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    DataTablesModule,
  ],
})
export class AdministratorModule { }
