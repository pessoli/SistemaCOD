import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CadastroUsuarioComponent} from "./components/cadastro-usuario/cadastro-usuario.component";
import {HomeComponent} from "./components/home/home.component";
import {PerfilComponent} from "./components/perfil/perfil.component";
import {LayoutComponent} from "./components/layout/layout.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: CadastroUsuarioComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Defina aqui as rotas que devem usar o layout com a sidebar
      { path: 'home', component: HomeComponent },
      { path: 'perfil/:id', component: PerfilComponent },
      // ...
    ]
  },
];
