import { Component, OnInit } from '@angular/core';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: [
  ]
})
export class PedidoComponent {

  constructor(public pedidoService: PedidoService) { }



}