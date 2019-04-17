interface IBoleta {
    cliente: ICliente;
    total: number;
    fecha: string;
    horaReservada:boolean;
    ordenes: IOrden[];
    idUsuario:string;
   
}