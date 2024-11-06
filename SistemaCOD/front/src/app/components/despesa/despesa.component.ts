import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CurrencyPipe, NgIf} from "@angular/common";
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
import {TipoDespesaComponent} from "../tipo-despesa/tipo-despesa.component";

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
    FloatLabelModule
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

  idDespesa!: number;

  despesaDialog = false;
  submitted = false;

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService,
    private despesaService: DespesaService,
    private tipoDespesaService: TipoDespesaService
  ) {
    this.buscarDespesa();
  }

  public buscarDespesa() {
    const idUsuario = this.sharedService.getIdUsuario();

    this.despesaService.buscaDespesaPorIdUsuario(idUsuario as unknown as number)
      .pipe(

      )
      .subscribe();
  }

  public buscaTipoDespesa() {
    const idUsuario = this.sharedService.getIdUsuario();

    this.tipoDespesaService.buscarTipoDespesaPorIdUsuario(idUsuario as unknown as number)
      .pipe(
        map(res => {
          console.log(res)
          this.tipoDespesa = res.map((item: TipoDespesaModel)=> ({
            id: item.id,
            tipoDespesa: item.tipoDespesa,
            limite: item.limite,
            ativo: item.ativo,
            idUsuario: item.idUsuario,
            valorLimite: item.valorLimite
          }))
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
      idTipoDespesa: 0,
      valor: 0,
      data: new Date(),
      idUsuario: this.sharedService.getIdUsuario() as unknown as number
    }
  }

  salvarDespesa() {
    this.submitted = true;

    if (this.despesa.observacao.trim()) {

      if (this.despesa.id === 0) {
        console.log(this.despesa)
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
      idTipoDespesa: 0,
      valor: 0,
      data: new Date(),
      idUsuario: this.sharedService.getIdUsuario() as unknown as number
    }
  }

  deletaDespesa(id: number) {
    this.idDespesa = id;
    this.despesaDialog = true;
  }

  editarDespesa(despesa: DespesaModel) {
    this.despesa = { ...despesa };
    this.despesaDialog = true;
  }

  hideDialog() {
    this.despesaDialog = false;
    this.submitted = false;
  }

  public getTipoDespesa(idTipoDespesa: number): string {
    this.tipoDespesaService.buscaTipoDespesaPorId(idTipoDespesa)
      .pipe(
        tap(res => {
          this.selectedTipoDespesa.tipoDespesa = res.tipoDespesas;
        }),
      )
    .subscribe()

    return this.selectedTipoDespesa.tipoDespesa;
  }

}
