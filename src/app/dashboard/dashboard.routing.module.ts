import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KpisComponent } from './containers/kpis/kpis.component';

const routes: Routes = [
  {
    path: '',
    component: KpisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class DashboardRoutingModule {}
