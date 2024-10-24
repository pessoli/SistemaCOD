import {Component, OnInit} from '@angular/core';
import {MenuModule} from "primeng/menu";
import {NgClass} from "@angular/common";
import {MenuItem, Message, PrimeIcons} from "primeng/api";
import {MessageService} from "../../services/message/message.service";
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
