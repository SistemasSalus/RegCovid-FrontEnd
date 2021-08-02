export class EmpresaPrincipal {
    Id: string;
    Nombre: string;
    NombreAbrev: string;
    static buildFromJson(json: any): EmpresaPrincipal {
        const service = new EmpresaPrincipal();
        return Object.assign(service, json);
    }
}