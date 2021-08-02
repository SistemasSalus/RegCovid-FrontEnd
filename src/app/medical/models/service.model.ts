export class ScheduleWorker {
  nodeId: number;
  organizationId: string;
  sedeId: string;
  protocoloId: string;
  componentId: string;
  firstName: string;
  firstLastName: string;
  secondLastName: string;
  docTypeId: number;
  docNumber: string;
  sexTypeId: number;
  // birthdate: string;
  day: number;
  month: number;
  year: number;
  mail: string;
  telephoneNumber: string;
  currentOccupation: string;
  adressLocation: string;
  nombreSede: string;
  tipoEmpresaCovidId: number;
  userId: number;
  tecnico: string;
  empresaPrincipalId: string;
  empresaEmpleadora: string;
  clinicaExternad: number;
  fechaExamen: string;
  reasonExamId: number;
  placeExamId: number;

  constructor(scheduleWorker) {
    {
      this.nodeId = scheduleWorker.nodeId;
      this.organizationId = scheduleWorker.organizationId;
      this.sedeId = scheduleWorker.sedeId;
      this.protocoloId = scheduleWorker.protocoloId;
      this.componentId = scheduleWorker.componentId;
      this.firstName = scheduleWorker.firstName;
      this.firstLastName = scheduleWorker.firstLastName;
      this.secondLastName = scheduleWorker.secondLastName;
      this.docTypeId = scheduleWorker.docTypeId;
      this.docNumber = scheduleWorker.docNumber;
      this.sexTypeId = scheduleWorker.sexTypeId;
      // this.birthdate = scheduleWorker.birthdate;

      this.day = scheduleWorker.day;
      this.month = scheduleWorker.month;
      this.year = scheduleWorker.year;

      this.mail = scheduleWorker.mail;
      this.telephoneNumber = scheduleWorker.telephoneNumber;
      this.currentOccupation = scheduleWorker.currentOccupation;
      this.adressLocation = scheduleWorker.adressLocation;
      this.tipoEmpresaCovidId = scheduleWorker.tipoEmpresaCovidId;
      this.userId = scheduleWorker.userId;
      this.tecnico = scheduleWorker.tecnico;
      this.empresaPrincipalId = scheduleWorker.empresaPrincipalId;
      this.empresaEmpleadora = scheduleWorker.empresaEmpleadora;
      this.clinicaExternad = scheduleWorker.clinicaExternad;
      this.fechaExamen = scheduleWorker.fechaExamen;
    }
  }
}
