export class ParametersMedical {
  ParameterId: number;
  Value1: string;
  static buildFromJson(json: any): ParametersMedical {
    const parametersMedical = new ParametersMedical();
    return Object.assign(parametersMedical, json);
  }
}
