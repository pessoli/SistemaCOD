import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem, Message, PrimeIcons} from 'primeng/api';
import {Router} from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { MessageSharedService } from '../../services/message/messageShared.service';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Sidebar, SidebarModule} from "primeng/sidebar";
import {StyleClassModule} from "primeng/styleclass";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarModule, ButtonModule, RippleModule, StyleClassModule, MenuModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  acessosTela?: MenuItem[]
  botaoSair?: MenuItem[]
  messages: Message[] = []

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;


  constructor(
    private sharedService: SharedService,
    private router: Router,
    private messageSharedService: MessageSharedService
  ) {}


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
