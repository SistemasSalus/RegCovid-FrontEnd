export class Results {
  fechaServicio: string;
  resultado: string;
  static buildFromJson(json: any): Results {
    const result = new Results();
    return Object.assign(result, json);
  }
}
