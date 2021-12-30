import { Component, Input } from '@angular/core';
import { SelecaoComponent } from './selecao-component/selecao-component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  titulo: string = '';
  opcoes: string[] = ['Leite Condensado', 'Banana', 'Granola', 'Morango', 'Leite em pó', 'Côco', 'Castanha de caju']
  escolhaAte: number = 0;
}
