export class Precio {
    PrecioId: number;
    Precio: string;
    static buildFromJson(json: any): Precio {
        const precio = new Precio();
        return Object.assign(precio, json);
    }
}