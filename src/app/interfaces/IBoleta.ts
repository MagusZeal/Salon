interface IBoleta {
    cliente: ICliente;
    total: number;
    fecha: Date;
    ordenes: IOrden;
}