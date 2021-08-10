export class Precio {
  id: number;
  organizationId: string;
  Empresa:string;
  locationId:string;
  sede:string;
  tipoPrueba:string;
  Prueba:string;
  lugarTomaID:number;
  lugarToma:string;
  precio:number;
  isDeleted:boolean;
  insertUser:number;
  insertDate:Date;
  updateUser:number;
  updateDate:Date;
  deleteUser:number;
  deleteDate:Date;

  static buildFromJson(json: any): Precio {
      const precio = new Precio();
      return Object.assign(precio, json);
  }
}
