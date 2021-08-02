export class Laboratory {
  serviceComponentId: string;
  personId: string;
  componentId: string;

  fechaEjecucion: string;
  procedenciaSolicitud: string;
  resultadoPrimeraPrueba: string;
  resultadoSegundaPrueba: string;
  clasificacionClinica: string;

  confirmeResultado: string;

  constructor(laboratory) {
    {
      this.serviceComponentId = laboratory.serviceComponentId;
      this.personId = laboratory.personId;
      this.componentId = laboratory.componentId;
      this.fechaEjecucion = laboratory.fechaEjecucion;
      this.procedenciaSolicitud = laboratory.procedenciaSolicitud;
      this.resultadoPrimeraPrueba = laboratory.resultadoPrimeraPrueba;
      this.resultadoSegundaPrueba = laboratory.resultadoSegundaPrueba;
      this.clasificacionClinica = laboratory.clasificacionClinica;
      this.confirmeResultado = laboratory.confirmeResultado;
    }
  }
}
