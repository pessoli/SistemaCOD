import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PerfilModel} from "./perfil.model";
import {Message, MessageService} from "primeng/api";
import {UsuarioService} from "../../services/usuario/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
      ButtonDirective,
      CardModule,
      FloatLabelModule,
      InputTextModule,
      MessagesModule,
      PaginatorModule,
      ReactiveFormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  formGroupPerfil: FormGroup;
  perfil?: PerfilModel;
  messages!: Message[];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.formGroupPerfil = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    })
  }

  public alterarPerfil() {

  }

}
