import { Injectable } from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {Message} from "primeng/api";
import {TipoDespesaService} from "../tipo-despesa/tipo-despesa.service";
import {SharedService} from "../shared/shared.service";

@Injectable({
  providedIn: 'root'
})
export class MessageSharedService {

  private messageSource = new BehaviorSubject<Message[] | null>(null);
  currentMessage = this.messageSource.asObservable();

  constructor(
    private tipoDespesaService: TipoDespesaService,
    private sharedService: SharedService,
  ) {
  }

  exibeMensagemLimite() {
    const idUsuario = this.sharedService.getIdUsuario();

    // Requisição para verificar os limites de despesa
    this.tipoDespesaService.tipoDespesaLimiteUltrapassado(idUsuario as unknown as number, 0)
      .pipe(
        tap(res => {
          // Se houver tipo de despesa com limite ultrapassado, gera uma mensagem para cada tipo
          if (res && res.length > 0) {
            const mensagens: Message[] = res.map((tipo: any) => ({
              severity: 'error',
              summary: 'Aviso',
              detail: `Limite foi ultrapassado para o tipo de despesa: ${tipo.tipoDespesa}`
            }));

            this.setMessage(mensagens);
          } else {
            // Caso não haja tipos de despesa com limite ultrapassado, podemos limpar as mensagens
            this.setMessage([]);
          }
        })
      )
      .subscribe();
  }

  setMessage(message: Message[]) {
    this.messageSource.next(message);
  }
}
