import { Component, Input } from '@angular/core';
import { seletorOpcoes } from './opcoes-interface';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao-component.html',
  styleUrls: ['./selecao-component.css']
})
export class SelecaoComponent {

  @Input() titulo: string = '';
  @Input() opcoes: string[] = []
  @Input() escolhaAte: number = 0;

  opcoesEscolhidas: string[] = [];

  // função que valida se opção já existe no array
  marcaDesmarca(opcao: string) {
    if (this.escolhaAte > 1) {
      const idx = this.opcoesEscolhidas.indexOf(opcao);

      if (idx === -1) {
        this.opcoesEscolhidas.push(opcao)
      } else {
        this.opcoesEscolhidas.splice(idx, 1)
      }
    } else {
      this.opcoesEscolhidas = [opcao]
    }


  }

  exibir: boolean = true;

  toggleShow() {
    this.exibir = !this.exibir
    console.log(this.opcoesEscolhidas)
  }

}


