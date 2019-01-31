interface IJornada {
    fecha: string;
    formaDePagoPrincipal: string,
    montoPrincipal: number,
    montoDescuento: number,
    montoEfectivo: number,
    montoGiftCard: number,
    montoCobrado: number,
    montoVuelto: number,
    cliente: ICliente,
    ordenes: IOrden[];
}