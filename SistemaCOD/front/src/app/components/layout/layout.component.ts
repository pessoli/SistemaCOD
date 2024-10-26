import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {MenuModule} from "primeng/menu";
import {NgClass} from "@angular/common";
import {MenuItem, Message, PrimeIcons} from "primeng/api";
import {MessageSharedService} from "../../services/message/messageShared.service";
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MenuModule,
    NgClass
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  acessosTela?: MenuItem[]
  botaoSair?: MenuItem[]


  constructor(
    private sharedService: SharedService,
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
        icon: 'pi pi-list-check',
        routerLink: [`/tipo-despesa/${idUsuario}`]
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
        routerLink: ['/educacao-financeira']
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
