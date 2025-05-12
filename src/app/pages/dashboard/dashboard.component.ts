import { Component, OnInit } from '@angular/core';
import { DashboardService, IPedido, IPedidosData, ResultPedido } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
CommonModule


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{

  pedidosData: IPedidosData = { pendientes: [], aprobados: [], entregados: [] };
  pedidosFiltrados: IPedido[] = [];
  activeTab: string = 'Pendientes';
  nombre:string = '';
  constructor(private dashboardService: DashboardService, private authService: AuthService, private toastr: ToastrService) {}


  ngOnInit(): void {

    this.nombre = localStorage.getItem('nameUser')!;
    this.dashboardService.obtenerPedidos().subscribe({
      next:(data: ResultPedido) => {
        console.log(data)
        const pendientes = data.results.filter(( pedido ) => pedido.estado ==='Pendiente')
        const aprobados = data.results.filter(( pedido ) => pedido.estado ==='Aprobado por Chayanne')
        const entregados = data.results.filter(( pedido ) => pedido.estado ==='Entregado')
        this.pedidosData = {
          pendientes: pendientes,
          aprobados: aprobados,
          entregados: entregados,
        };
        console.log(this.pedidosData)
      this.setActiveTab(this.activeTab);
    }, error: (error) => {
      if (error.error.detail == 'Given token not valid for any token type') {
        this.toastr.info(
          'Su sesión a expirado. Debe iniciar sesión nuevamente'
        );
        this.authService.logout();
      }
    },
  });
}


  //filtro los pedidos
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    switch (tab) {
      case 'Pendientes':
        this.pedidosFiltrados = [];
        this.pedidosFiltrados = this.pedidosData.pendientes;
        break;
        case 'Aprobados':
        this.pedidosFiltrados = [];
        this.pedidosFiltrados = this.pedidosData.aprobados;
        break;
        case 'Entregados':
        this.pedidosFiltrados = [];
        this.pedidosFiltrados = this.pedidosData.entregados;
        break;
      default:
        this.pedidosFiltrados = [];
    }

  }
}
