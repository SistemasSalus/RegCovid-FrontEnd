export class Sede {
  SedeId: number;
  Sede: string;
  static buildFromJson(json: any): Sede {
    const service = new Sede();
    return Object.assign(service, json);
  }
}
