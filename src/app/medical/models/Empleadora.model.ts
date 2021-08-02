export class Empleadora {
    EmpresaEmpleadoraId: number;
    Nombre: string;
    static buildFromJson(json: any): Empleadora {
        const empleadora = new Empleadora();
        return Object.assign(empleadora, json);
    }
}
