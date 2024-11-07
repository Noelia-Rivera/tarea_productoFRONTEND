import { Categoria } from "./categoria";

export class Producto {
    id: number;
    nombre: string;
    cantidad: number;
    id_categoria: Categoria;

    constructor(id: number, nombre: string, cantidad: number, id_categoria: Categoria) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.id_categoria = id_categoria;
    }
}
