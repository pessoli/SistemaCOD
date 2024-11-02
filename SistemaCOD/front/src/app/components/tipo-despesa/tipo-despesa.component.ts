import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import {Button, ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {CommonModule, CurrencyPipe} from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import {FormBuilder, FormsModule} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {CheckboxModule} from "primeng/checkbox";
import {TipoDespesaModel} from "./tipo-despesa.model";
import {SharedService} from "../../services/shared/shared.service";
import {TipoDespesaService} from "../../services/tipo-despesa/tipo-despesa.service";
import {map, tap} from "rxjs";

@Component({
  selector: 'app-tipo-despesa',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    CheckboxModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './tipo-despesa.component.html',
  styleUrl: './tipo-despesa.component.css'
})
export class TipoDespesaComponent {
  tipoDespesas!: TipoDespesaModel[];
  tipoDespesa!: TipoDespesaModel;

  tipoDespesaDialog = false;
  submitted = false;
  statuses!: any[];

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService,
    private tipoDespesaService: TipoDespesaService,
  ) {
    this.buscarTipoDespesa();

    this.statuses = [
      { label: 'Com Limite', value: 'Com Limite' },
      { label: 'Sem Limite', value: 'Sem Limite' }
    ]
  }

  public buscarTipoDespesa() {
    const idUsuario = this.sharedService.getIdUsuario()

    this.tipoDespesaService.buscarTipoDespesaPorIdUsuario(idUsuario as unknown as number)
      .pipe(
        map(res => {
          console.log(res)
          this.tipoDespesas = res.map((item: TipoDespesaModel) => ({
            id: item.id,
            tipoDespesa: item.tipoDespesa,
            limite: item.limite === 'SEM_LIMITE' ? 'Sem Limite' : 'Com Limite',
            valorLimite: item.valorLimite,
            ativo: item.ativo,
            idUsuario: item.idUsuario
          }));
        })
      )
      .subscribe();
  }

  adicionarTipoDespesa () {
    this.submitted = false;
    this.tipoDespesaDialog = true;

    this.tipoDespesa = {
      id: 0,
      tipoDespesa: '',
      limite: 'SEM_LIMITE',
      valorLimite: 0,
      ativo: true,
      idUsuario: this.sharedService.getIdUsuario() as unknown as number
    };
  }

  salvarTipoDespesa() {
    this.submitted = true;

    if (this.tipoDespesa.tipoDespesa.trim()) {

      this.tipoDespesa.limite = this.tipoDespesa.limite === 'Sem Limite' ? 'SEM_LIMITE' : 'COM_LIMITE';

      if (this.tipoDespesa.id === 0) {
        this.tipoDespesaService.saveTipoDespesa(this.tipoDespesa).subscribe();

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tipo Despesa criado com Sucesso!', life: 3000 });
      } else {
        this.tipoDespesaService.atualizaTipoDespesa(this.tipoDespesa)
          .pipe(
            tap(() => {
              this.buscarTipoDespesa()
            })
          )
        .subscribe();

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tipo Despesa atualizado com Sucesso!', life: 3000 });
      }

      this.buscarTipoDespesa();
      this.tipoDespesaDialog = false;
      this.tipoDespesa = {
        id: 0,
        tipoDespesa: '',
        limite: 'SEM_LIMITE',
        valorLimite: 0,
        ativo: false,
        idUsuario: 0
      };
    }


  }

  editarTipoDespesa(tipoDespesa: TipoDespesaModel) {
    this.tipoDespesa = { ...tipoDespesa };
    this.tipoDespesaDialog = true;
  }

  hideDialog() {
    this.tipoDespesaDialog = false;
    this.submitted = false;
  }

  getSeverity(limite: string) {
    switch (limite) {
      case 'Com Limite':
        return 'success';
      case 'Sem Limite':
        return 'warning';
      default:
        return undefined
    }
  }

  onLimiteChange() {
    if (this.tipoDespesa.limite === 'Sem Limite') {
      this.tipoDespesa.valorLimite = 0; // Ou use 0, dependendo de como você deseja representar um campo vazio
    }
  }

}
