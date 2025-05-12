import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
Observable
HttpClient

export interface IProducto {
nombre_producto: string;
}

export interface IDetalle {
  cantidad_productos: number;
  precio_producto: number;
  subtotal: number;
  nombre_producto: string;
  producto: IProducto;
}

export interface IPedido {
  fecha_pedido: string;
  direccion_entrega: string;
  estado: string;
  detalles: IDetalle[];
}

export interface ResultPedido {
  results: IPedido[]
}

export interface IPedidosData {
  
    pendientes: IPedido[];
    aprobados: IPedido[];
    entregados: IPedido[];
  

}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'appCART/ver_dashboard/'; // URL de Django

  constructor(private http: HttpClient) { }

  obtenerPedidos(): Observable<ResultPedido> {
    
    return this.http.get<ResultPedido>(this.apiUrl);
  }

  agregarPedido(pedido: IPedido): Observable<IPedido> {
    return this.http.post<IPedido>(this.apiUrl, pedido);
  }
}
