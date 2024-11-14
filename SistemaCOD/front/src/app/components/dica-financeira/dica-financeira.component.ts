import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AccordionModule} from "primeng/accordion";
import {DicaFinanceiraModel} from "./dicaFinanceira.model";
import {DicaFinanceiraService} from "../../services/dica-financeira/dica-financeira.service";
import {tap} from "rxjs";
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";

@Component({
  selector: 'app-dica-financeira',
  standalone: true,
  imports: [
    AccordionModule, CommonModule, PaginatorModule, ToolbarModule
  ],
  templateUrl: './dica-financeira.component.html',
  styleUrl: './dica-financeira.component.css'
})
export class DicaFinanceiraComponent implements OnInit {
  dicaFinanceira: DicaFinanceiraModel[] = [];  // Lista completa de dicas
  primeiroItem: number = 0;  // Indica o item que começa a página
  itensPorPagina: number = 10;  // Quantidade de itens por página

  constructor(
    private dicaFinanceiraService: DicaFinanceiraService,
  ) {}

  ngOnInit(): void {
    // Carrega as dicas
    this.listaDicas();
  }

  listaDicas() {
    this.dicaFinanceiraService.listarDicas()
      .pipe(
        tap(res => {
          this.dicaFinanceira = res;
        })
      )
      .subscribe();
  }

  // Retorna as dicas de acordo com a página atual
  getDicasPorPagina(): DicaFinanceiraModel[] {
    return this.dicaFinanceira.slice(this.primeiroItem, this.primeiroItem + this.itensPorPagina);
  }

  // Atualiza o índice do primeiro item ao mudar de página
  onPaginaMudou(event: any): void {
    this.primeiroItem = event.first;
  }

  // Lógica para retornar a URL da imagem
  getImagemUrl(id: number): string {
    return `http://localhost:8080/dica_financeira/imagem/${id}`;
  }

}
