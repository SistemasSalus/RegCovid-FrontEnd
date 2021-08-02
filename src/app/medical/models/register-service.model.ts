export class RegisterService {
  NodeId: number;
  OrganizationId: string;
  SedeId: number;
  FirstName: string;
  FirstLastName: string;
  SecondLastName: string;
  DocTypeId: number;
  DocNumber: string;
  SexTypeId: number;
  Birthdate: string;
  Mail: string;
  TelephoneNumber: string;
  CurrentOccupation: string;
  AdressLocation: string;
  NombreSede: string;
  TipoEmpresaCovidId: number;
  UserId: number;
  Tecnico: string;
  ClinicaExternad: number;
  FechaExamen: string;
  ComponentId: string;
  EmpresaEmpleadora: string;
  ReasonExamId: number;
  PlaceExamId: number;
  static buildFromJson(json: any): RegisterService {
    const service = new RegisterService();
    return Object.assign(service, json);
  }
}
