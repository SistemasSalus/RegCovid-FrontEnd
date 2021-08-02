export class ValoresComponente {
  ComponentFieldId: string;
  ServiceComponentFieldsId: string;
  Value1: string;
  static buildFromJson(json: any): ValoresComponente {
    const service = new ValoresComponente();
    return Object.assign(service, json);
  }
}
