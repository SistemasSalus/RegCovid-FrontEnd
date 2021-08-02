export class Indicadores {
  Resultado: string;
  Contador: string;
  Total: string;
  static buildFromJson(json: any): Indicadores {
    const service = new Indicadores();
    return Object.assign(service, json);
  }
}
