import {Component, OnInit} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {TipoDespesaModel} from "../tipo-despesa/tipo-despesa.model";
import {map, tap} from "rxjs";
import {SharedService} from "../../services/shared/shared.service";
import {TipoDespesaService} from "../../services/tipo-despesa/tipo-despesa.service";
import {DespesaService} from "../../services/despesa/despesa.service";
import {ToolbarModule} from "primeng/toolbar";

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    MultiSelectModule,
    ToolbarModule
  ],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css'
})
export class RelatorioComponent implements OnInit{
  rangeDates!: Date[];
  tipoDespesa!: TipoDespesaModel[];
  selectedTipoDespesa!: TipoDespesaModel[];

  geraExcel = true;

  constructor(
    private sharedService: SharedService,
    private tipoDespesaService: TipoDespesaService,
    private despesaService: DespesaService
  ) {
  }

  ngOnInit() {
    this.buscaTipoDespesa()
  }

  public buscaTipoDespesa() {
    const idUsuario = this.sharedService.getIdUsuario();

    this.tipoDespesaService.buscarTipoDespesaPorIdUsuario(idUsuario as unknown as number)
      .pipe(
        map(res => {
          this.tipoDespesa = Array.isArray(res)
            ? res
              .filter((item: TipoDespesaModel) => item.ativo)
              .map((item: TipoDespesaModel) => ({
                id: item.id,
                tipoDespesa: item.tipoDespesa,
                limite: item.limite,
                ativo: item.ativo,
                idUsuario: item.idUsuario,
                valorLimite: item.valorLimite
              }))
            : [];
        })
      )
      .subscribe();
  }

  exportar() {
    const idUsuario = this.sharedService.getIdUsuario();

    // Garantir que as datas estejam no formato correto (ISO string)
    const dataInicio = this.rangeDates[0].toISOString().split('T')[0]; // Formato 'yyyy-MM-dd'
    const dataFim = this.rangeDates[1].toISOString().split('T')[0]; // Formato 'yyyy-MM-dd'

    // Verifique se selectedTipoDespesa é um array válido e se tem itens
    const idTipoDespesa = Array.isArray(this.selectedTipoDespesa) && this.selectedTipoDespesa.length > 0
      ? this.selectedTipoDespesa.map(item => item.id)
      : null; // Se não houver tipos selecionados, passamos null

    this.despesaService.exportarRelatorio(
      idUsuario as unknown as number,
      this.geraExcel,
      dataInicio,
      dataFim,
      idTipoDespesa
    )
      .pipe(
        tap((response: Blob) => {
          const fileName = this.geraExcel ? 'Relatório da Despesa.xlsx' : 'Relatório da Despesa.pdf';

          // Cria um link temporário para o arquivo
          const downloadLink = document.createElement('a');
          const objectUrl = URL.createObjectURL(response);  // Cria um URL temporário para o Blob

          downloadLink.href = objectUrl;
          downloadLink.download = fileName;  // Define o nome do arquivo
          downloadLink.click();  // Simula o clique para iniciar o download

          // Libera o objeto URL após o download para liberar recursos
          URL.revokeObjectURL(objectUrl);
        }, error => {
          console.error('Erro ao exportar o relatório:', error);
        })
      )
      .subscribe();
  }



}
