import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CommonModule, CurrencyPipe, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {SharedService} from "../../services/shared/shared.service";
import {map, tap} from "rxjs";
import {FinanciamentoModel} from "./financiamento.model";
import {FinanciamentoService} from "../../services/financiamento/financiamento.service";
import {CalendarModule} from "primeng/calendar";
import {FloatLabelModule} from "primeng/floatlabel";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-financiamento',
  standalone: true,
  imports: [
    Button,
    CheckboxModule,
    ConfirmDialogModule,
    CurrencyPipe,
    DialogModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    NgIf,
    PrimeTemplate,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    CommonModule,
    CalendarModule,
    FloatLabelModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './financiamento.component.html',
  styleUrl: './financiamento.component.css'
})
export class FinanciamentoComponent {
  financiamentos!: FinanciamentoModel[];
  financiamento!: FinanciamentoModel;

  idFinanciamento!: number;
  dataParcelaPaga?: Date;

  financiamentoDialog = false;
  submitted = false;

  parcelaDialog = false;

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService,
    private financiamentoService: FinanciamentoService,
  ) {
    this.buscarConta();
  }

  public buscarConta() {
    const idUsuario = this.sharedService.getIdUsuario()

    this.financiamentoService.buscarContaPorIdUsuario(idUsuario as unknown as number)
      .pipe(
        map(res => {
          this.financiamentos = res.map((item: FinanciamentoModel) => ({
            id: item.id,
            conta: item.conta,
            totalParcelas: item.totalParcelas,
            parcelasPagas: item.parcelasPagas,
            parcelasRestantes: item.parcelasRestantes,
            valorTotal: item.valorTotal,
            valorParcela: item.valorParcela,
            valorRestante: item.valorRestante,
            valorPago: item.valorPago,
            ativo: item.ativo,
            idUsuario: item.idUsuario
          }));
        })
      )
      .subscribe();
  }

  adicionarFinanciamento() {
    this.submitted = false;
    this.financiamentoDialog = true;

    this.financiamento = {
      id: 0,
      conta: '',
      parcelasPagas: 0,
      parcelasRestantes: 0,
      totalParcelas: 0,
      valorParcela: 0,
      valorRestante: 0,
      valorPago: 0,
      valorTotal: 0,
      ativo: true,
      idUsuario: this.sharedService.getIdUsuario() as unknown as number
    };
  }

  salvarFinanciamento() {
    this.submitted = true;

    if (this.financiamento.conta.trim()) {

      if (this.financiamento.id === 0) {
        this.financiamentoService.saveConta(this.financiamento)
          .pipe(
            tap(() => {
              this.buscarConta();
            })
          )
          .subscribe();

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Financiamento criado com Sucesso!', life: 3000 });
      } else {
        this.financiamentoService.atualizaConta(this.financiamento)
          .pipe(
            tap(() => {
              this.buscarConta()
            })
          )
          .subscribe();

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Financiamento atualizado com Sucesso!', life: 3000 });
      }


      this.financiamentoDialog = false;
      this.financiamento = {
        id: 0,
        conta: '',
        parcelasPagas: 0,
        parcelasRestantes: 0,
        totalParcelas: 0,
        valorParcela: 0,
        valorRestante: 0,
        valorPago: 0,
        valorTotal: 0,
        ativo: true,
        idUsuario: this.sharedService.getIdUsuario() as unknown as number
      };
    }


  }

  editarFinanciamento(conta: FinanciamentoModel) {
    this.financiamento = { ...conta };
    this.financiamentoDialog = true;
  }

  pagarParcela(id: number) {
    this.idFinanciamento = id;
    this.parcelaDialog = true;
  }

  salvarParcelaPaga() {
    this.submitted = true;
    let data: Date;

    this.financiamentoService.buscaPagamentoPorIdConta(this.idFinanciamento)
      .pipe(
        tap((res) => {
          res.map((item: any) => {
            data = new Date(item.dataPagamento[0], item.dataPagamento[1] - 1, item.dataPagamento[2]);
          })
        }),
        tap(() => {
          if ((data !== undefined) && data.getTime() === this.dataParcelaPaga?.getTime()) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Parcela referente ao mês selecionado já foi pago. ', life: 3000 });
          } else {
            this.mesPagamento(this.idFinanciamento);
          }
        })
      )
    .subscribe()

      this.parcelaDialog = false;
  }

  public mesPagamento(idConta: number) {
    this.financiamentoService.mesPagamentoParcela(
      {
        dataPagamento: this.dataParcelaPaga,
        idConta: idConta
      }
    )
      .pipe(
        tap(() => {
          this.atualizaParcelas(idConta)
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Mês pagamento cadastrado com Sucesso!', life: 3000 });
        })
      )
      .subscribe()
  }

  public atualizaParcelas(idConta: number) {
    this.financiamentoService.atualizaParcelasConta(idConta)
      .pipe(
        tap(() => this.buscarConta())
      )
      .subscribe();
  }

  hideDialog() {
    this.parcelaDialog = false;
    this.financiamentoDialog = false;
    this.submitted = false;
  }
}
