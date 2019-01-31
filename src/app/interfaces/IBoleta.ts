interface IBoleta {
    cliente: ICliente;
    total: number;
    fecha: string;
    ordenes: IOrden[];
}