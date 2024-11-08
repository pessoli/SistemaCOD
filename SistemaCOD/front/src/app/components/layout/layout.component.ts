import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {MenuModule} from "primeng/menu";
import {NgClass} from "@angular/common";
import {MenuItem, MenuItemCommandEvent, Message, PrimeIcons} from "primeng/api";
import {MessageSharedService} from "../../services/message/messageShared.service";
import {SharedService} from "../../services/shared/shared.service";
import {Router} from "@angular/router";
import {MessagesModule} from "primeng/messages";

@Component({
  selector: 'app-layout',
  standalone: true,
    imports: [
        MenuModule,
        NgClass,
        MessagesModule
    ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  acessosTela?: MenuItem[]
  botaoSair?: MenuItem[]
  messages: Message[] = []


  constructor(
    private sharedService: SharedService,
    private router: Router,
    private messageSharedService: MessageSharedService,
  ) {
  }

  public ngOnInit() {
    const idUsuario = this.sharedService.getIdUsuario();

    this.acessosTela = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        routerLink: [`/perfil/${idUsuario}`]
      },
      {
        label: 'Tipo Despesa',
        icon: 'pi pi-pencil',
        routerLink: [`/tipo-despesa/${idUsuario}`]
      },
      {
        label: 'Despesas',
        icon: 'pi pi-wallet',
        routerLink: [`/despesa/${idUsuario}`]
      },
      {
        label: 'Financiamento',
        icon: 'pi pi-dollar',
        routerLink: [`/financiamento/${idUsuario}`]
      },
      {
        label: 'Educação Financeira',
        icon: 'pi pi-book',
        routerLink: ['/educacao-financeira']
      },
      {
        label: 'Relatório',
        icon: 'pi pi-chart-line',
        routerLink: ['/relatorio']
      },
    ];

    this.botaoSair = [
      {
        label: 'Sair',
        icon: PrimeIcons.SIGN_OUT,
        command: () => this.logout()
      },
    ]

    this.messageSharedService.exibeMensagemLimite();

    // Se houver mensagens, recebe as atualizações do serviço
    this.messageSharedService.currentMessage.subscribe(messages => {
      this.messages = messages || [];
    });
  }

  public logout() {
    localStorage.removeItem('userId');

    this.router.navigate(['/login'])
  }
}
