import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem, Message, MessageService, PrimeIcons, PrimeNGConfig} from 'primeng/api';
import {NavigationEnd, Router} from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { MessageSharedService } from '../../services/message/messageShared.service';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Sidebar, SidebarModule} from "primeng/sidebar";
import {StyleClassModule} from "primeng/styleclass";
import {MenuModule} from "primeng/menu";
import {ToastModule} from "primeng/toast";
import {PanelMenuModule} from "primeng/panelmenu";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarModule, ButtonModule, RippleModule, StyleClassModule, MenuModule, ToastModule, PanelMenuModule
  ],
  providers: [MessageService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  acessosTela?: MenuItem[]
  botaoSair?: MenuItem[]
  messages: Message[] = []
  sidebarVisible: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private messageSharedService: MessageSharedService
  ) {}

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  ngOnInit() {
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
        routerLink: [`/relatorio/${idUsuario}`]
      },
    ];

    this.botaoSair = [
      {
        label: 'Sair',
        icon: PrimeIcons.SIGN_OUT,
        command: () => this.logout()
      },
    ]

    // Atualiza a mensagem sempre que a rota for carregada
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/home') {
        this.atualizarMensagens();
      }
    });

    // Exibe mensagem inicial
    this.atualizarMensagens();
  }

  public atualizarMensagens() {
    this.messageSharedService.exibeMensagemLimite();
    this.messageSharedService.currentMessage.subscribe(messages => {
      this.messages = messages || [];
    });
  }

  public logout() {
    localStorage.removeItem('userId');

    this.router.navigate(['/login'])
  }
}
