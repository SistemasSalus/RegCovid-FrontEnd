import { Precio } from '../models/precio.model';

export class LoadDataTables{
  data:Precio[];
  recordsTotal:number;
  recordsFiltered:number;

  static buildFromJson(json: any): LoadDataTables {
    const load = new LoadDataTables();
    return Object.assign(load, json);
  }
}
