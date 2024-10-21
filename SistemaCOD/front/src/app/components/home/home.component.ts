import {Component, OnInit} from '@angular/core';
import {MessagesModule} from "primeng/messages";
import {MenuItem, Message, PrimeIcons} from "primeng/api";
import {MessageService} from "../../services/message/message.service";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MessagesModule,
    MenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  messages!: Message[]
  acessosTela?: MenuItem[]
  botaoSair?: MenuItem[]

  constructor(
    private messageService: MessageService
  ) {
  }

  public ngOnInit() {
    this.messageService.currentMessage.subscribe(message => {
      this.messages = message as Message[]; // Recebe a mensagem do serviço
    });

    this.acessosTela = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        routerLink: ['/perfil']
      },
      {
        label: 'Despesas',
        icon: 'pi pi-wallet',
        routerLink: ['/despesas']
      },
      {
        label: 'Financias',
        icon: 'pi pi-dollar',
        routerLink: ['/financias']
      },
      {
        label: 'Educação Financeira',
        icon: 'pi pi-book',
        routerLink: ['/educacao-financeira'],
        style: { width: '200px' }
      },
      {
        label: 'Relatório',
        icon: 'pi pi-chart-line',
        routerLink: ['/relatorio']
      },
      {
        label: 'Histórico',
        icon: 'pi pi-pencil',
        routerLink: ['/historico']
      }
    ];

    this.botaoSair = [
      {
        label: 'Sair',
        icon: PrimeIcons.SIGN_OUT,
        routerLink: ['/login']
      },
    ]
  }
}
