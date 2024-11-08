import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {CalendarModule} from "primeng/calendar";
import {FloatLabelModule} from "primeng/floatlabel";
import {DespesaModel} from "./despesa.model";
import {SharedService} from "../../services/shared/shared.service";
import {DespesaService} from "../../services/despesa/despesa.service";
import {map, tap} from "rxjs";
import {TipoDespesaModel} from "../tipo-despesa/tipo-despesa.model";
import {TipoDespesaService} from "../../services/tipo-despesa/tipo-despesa.service";

@Component({
  selector: 'app-despesa',
  standalone: true,
  imports: [
    Button,
    CheckboxModule,
    ConfirmDialogModule,
    CurrencyPipe,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    NgIf,
    PaginatorModule,
    PrimeTemplate,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    CalendarModule,
    FloatLabelModule,
    DatePipe
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.css'
})
export class DespesaComponent {
  despesas!: DespesaModel[];
  despesa!: DespesaModel;

  selectedTipoDespesa!: TipoDespesaModel;
  tipoDespesa!: TipoDespesaModel[];

  despesaDialog = false;
  submitted = false;

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService,
    private despesaService: DespesaService,
    private tipoDespesaService: TipoDespesaService,
    private confirmationService: ConfirmationService
  ) {
    this.buscarDespesa();
  }

  public buscarDespesa() {
    this.buscaTipoDespesa();

    const idUsuario = this.sharedService.getIdUsuario();

    this.despesaService.buscaDespesaPorIdUsuario(idUsuario as unknown as number)
      .pipe(
        map(res => {
          this.despesas = res.map((item: DespesaModel) => ({
            id: item.id,
            observacao: item.observacao,
            data: item.data,
            valor: item.valor,
            idUsuario: item.idUsuario,
            idTipoDespesa: item.idTipoDespesa,
            tipoDespesaNome: this.getTipoDespesaNome(item.idTipoDespesa)
          }))
        })
      )
      .subscribe();
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

  adicionarDespesa() {
    this.buscaTipoDespesa();
    this.submitted = false;
    this.despesaDialog = true;

    this.despesa = {
      id: 0,
      observacao: '',
      tipoDespesaNome: '',
      idTipoDespesa: 0,
      valor: 0,
      data: new Date(),
      idUsuario: this.sharedService.getIdUsuario() as unknown as number
    }
  }

  salvarDespesa() {
    this.submitted = true;

    if (this.despesa.observacao.trim()) {

      this.despesa = {
        id: this.despesa.id,
        observacao: this.despesa.observacao,
        tipoDespesaNome: '',
        idTipoDespesa: this.selectedTipoDespesa.id,
        valor: this.despesa.valor,
        idUsuario: this.despesa.idUsuario,
        data: this.despesa.data
      }

      this.tipoDespesaService.tipoDespesaLimiteUltrapassado(this.despesa.idUsuario, this.despesa.valor)
        .pipe(
          tap(res => {

          })
        )
        .subscribe()

      if (this.despesa.id === 0) {
        this.despesaService.saveDespesa(this.despesa)
          .pipe(
            tap(() => {
              this.buscarDespesa();
            })
          )
          .subscribe()

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Despesa criada com Sucesso!', life: 3000 });
      } else {
        this.despesaService.atualizaDespesa(this.despesa)
          .pipe(
            tap(() => {
              this.buscarDespesa()
            })
          )
          .subscribe()

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Despesa atualizada com Sucesso!', life: 3000 });
      }
    }


    this.despesaDialog = false;
    this.despesa = {
      id: 0,
      observacao: '',
      tipoDespesaNome: '',
      idTipoDespesa: 0,
      valor: 0,
      data: new Date(),
      idUsuario: this.sharedService.getIdUsuario() as unknown as number
    }
  }

  deletaDespesa(id: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja excluir essa Despesa?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.despesaService.excluiDespesa(id)
          .pipe(
            tap(() => {
              this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Despesa deletado com Sucesso!' });
              this.buscarDespesa()
            })
          )
          .subscribe()
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Você cancelou a ação.' });
      }
    });
  }

  editarDespesa(despesa: DespesaModel) {
    this.despesa = {
      ...despesa,
      data: new Date(despesa.data) // Converte a data para um objeto Date
    };
    this.despesaDialog = true;
  }

  hideDialog() {
    this.despesaDialog = false;
    this.submitted = false;
  }

  public getTipoDespesaNome(idTipoDespesa: number): string {
    const tipo = this.tipoDespesa.find(td => td.id === idTipoDespesa);
    return tipo ? tipo.tipoDespesa : 'Desconhecido';
  }
}
