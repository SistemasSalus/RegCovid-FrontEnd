export class Service {
  MedicalCenter: string;
  FechaServicio: string;
  WorkerName: string;
  ProtocolName: string;
  OrganizationName: string;
  CurrentOccupation: string;
  ServiceId: string;
  PersonId: string;
  ComponentId: string;
  ServiceComponentId: string;
  IIndex: number;
  OrganizationId: string;
  TelephoneNumber: string;
  EncuestaCulminada: number;
  LaboratorioCulminada: number;
  ClinicaExternad: number;
  TypeExam: string;
  static buildFromJson(json: any): Service {
    const service = new Service();
    return Object.assign(service, json);
  }
}
