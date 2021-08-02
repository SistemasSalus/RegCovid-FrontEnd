import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsComponent } from './indicators/indicators.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: IndicatorsComponent,
  },
];

@NgModule({
  declarations: [IndicatorsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CustomerModule {}
