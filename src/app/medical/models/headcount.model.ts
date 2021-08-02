export class HeadCount {
  Filtro: string;
  OrganizationId: string;
  HC: string;
  HCId: number;
  EmpresaEmpleadora: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Nombres: string;
  Dni: string;
  Sexo: string;
  SexoId: number;
  Sede: string;
  Puesto: string;
  FechaNacimiento: string;
  Telefono: string;
  Email: string;
  Direccion: string;
  static buildFromJson(json: any): HeadCount {
    const headCount = new HeadCount();
    return Object.assign(headCount, json);
  }
}
