import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {UsuarioService} from "../../services/usuario/usuario.service";
import {Router} from "@angular/router";
import {CadastroUsuarioModel} from "./cadastro-usuario.model";
import {tap} from "rxjs";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {MessageService} from "../../services/message/message.service";

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonDirective,
    MessagesModule,
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  formGroupUsuario: FormGroup;
  usuario?: CadastroUsuarioModel;
  messages!: Message[]

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.formGroupUsuario = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    })
  }

  public novoUsuario() {
    const nome = this.formGroupUsuario.controls['nome'].value;
    const email = this.formGroupUsuario.controls['email'].value;
    const senha = this.formGroupUsuario.controls['senha'].value;

    this.usuario = {
      nome,
      email,
      senha,
      ativo: true
    };

    console.log(this.usuario);

    this.usuarioService.validaUsuario(email, senha)
      .pipe(
        tap(res => {
          if (!res) {
            this.salvarUsuario(this.usuario as CadastroUsuarioModel)
          } else {
            this.messages = [{ severity: 'error', detail: 'Já existe um Usuário com esse email e senha cadastrado!'}]
          }
        })
      )
      .subscribe();
  }

  public salvarUsuario(usuario: CadastroUsuarioModel) {
    this.usuarioService.saveUsuario(usuario)
      .pipe(
        tap(() => {
          this.messageService.setMessage([{ severity: 'info', summary: 'Info', detail: 'Usuário cadastrado com sucesso!'}]);
          this.router.navigate(['/home']).then()
        })
      )
      .subscribe();
  }

}