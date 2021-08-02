import { Component, OnInit } from '@angular/core';
import { MedicalService } from '../../../services/medical.service';
import { Subscription } from 'rxjs';
import { Indicadores } from '../../../models/indicadores';
import { SessionService } from '../../../../auth/services/session.service';

@Component({
  selector: 'scheduled-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent implements OnInit {
  indicadoresSub: Subscription;
  indicadores: Indicadores[];
  loading: boolean;

  novalidos: string = '0';
  negativos: string = '0';
  igmPositivo: string = '0';
  iggPositivo: string = '0';
  igmiggPositivo: string = '0';
  total: string = '0';

  constructor(private medicalService: MedicalService, private sessionService: SessionService) {
    this.loading = true;
  }

  ngOnInit(): void {
    // const nodeId = this.sessionService.getUser().nodeId;
    // this.indicadoresSub = this.medicalService
    //   .getIndicadores(`N${nodeId}`)
    //   .subscribe((indicadores: Indicadores[]) => {
    //     if (indicadores.length > 0) {
    //       this.indicadores = indicadores;
    //       this.novalidos =
    //         indicadores.find((p) => p.Resultado === '1') == null
    //           ? '0'
    //           : indicadores.find((p) => p.Resultado === '1').Contador;
    //       this.negativos =
    //         indicadores.find((p) => p.Resultado === '0') == null
    //           ? '0'
    //           : indicadores.find((p) => p.Resultado === '0').Contador;
    //       this.igmPositivo =
    //         indicadores.find((p) => p.Resultado === '2') == null
    //           ? '0'
    //           : indicadores.find((p) => p.Resultado === '2').Contador;
    //       this.iggPositivo =
    //         indicadores.find((p) => p.Resultado === '3') == null
    //           ? '0'
    //           : indicadores.find((p) => p.Resultado === '3').Contador;
    //       this.igmiggPositivo =
    //         indicadores.find((p) => p.Resultado === '4') == null
    //           ? '0'
    //           : indicadores.find((p) => p.Resultado === '4').Contador;
    //       this.total = indicadores[0].Total;
    //     }
    //     this.loading = false;
    //   });
  }
}
