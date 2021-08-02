import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { KpisComponent } from './containers/kpis/kpis.component';

@NgModule({
  declarations: [KpisComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
