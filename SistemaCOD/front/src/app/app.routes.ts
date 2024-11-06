import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CadastroUsuarioComponent} from "./components/cadastro-usuario/cadastro-usuario.component";
import {HomeComponent} from "./components/home/home.component";
import {PerfilComponent} from "./components/perfil/perfil.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {TipoDespesaComponent} from "./components/tipo-despesa/tipo-despesa.component";
import {FinanciamentoComponent} from "./components/financiamento/financiamento.component";
import {AuthGuard} from "./guards/auth.guard";
import {DespesaComponent} from "./components/despesa/despesa.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: CadastroUsuarioComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // Defina aqui as rotas que devem usar o layout com a sidebar
      { path: 'home', component: HomeComponent },
      { path: 'perfil/:id', component: PerfilComponent },
      { path: 'tipo-despesa/:idUsuario', component: TipoDespesaComponent },
      { path: 'financiamento/:idUsuario', component: FinanciamentoComponent },
      { path: 'despesa/:idUsuario', component: DespesaComponent },
      // ...
    ]
  },
];
