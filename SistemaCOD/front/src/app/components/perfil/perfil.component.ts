import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PerfilModel} from "./perfil.model";
import {Message} from "primeng/api";
import {UsuarioService} from "../../services/usuario/usuario.service";
import {Router} from "@angular/router";
import {MessageSharedService} from "../../services/message/messageShared.service";
import {SharedService} from "../../services/shared/shared.service";
import {tap} from "rxjs";
import {CalendarModule} from "primeng/calendar";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";

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
    ReactiveFormsModule,
    CalendarModule,
    InputGroupAddonModule,
    InputGroupModule
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
    private sharedService: SharedService
  ) {
    this.formGroupPerfil = this.fb.group({
      id: [0, [Validators.required]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
    })

    const idUsuario = this.sharedService.getIdUsuario()

    this.usuarioService.buscaUsuarioPorId(idUsuario)
      .pipe(
        tap(usuario => {
          const dataNascimento = new Date(usuario.dataNascimento[0], usuario.dataNascimento[1] - 1, usuario.dataNascimento[2]);

          this.formGroupPerfil.setValue({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            dataNascimento: dataNascimento,
          });
        })
      )
      .subscribe();
  }

  public alterarPerfil() {
    const idUsuario = this.formGroupPerfil.controls['id'].value;

    this.perfil = {
      id: idUsuario,
      nome: this.formGroupPerfil.controls['nome'].value,
      email: this.formGroupPerfil.controls['email'].value,
      dataNascimento: this.formGroupPerfil.controls['dataNascimento'].value,
      ativo: true
    }

    this.usuarioService.atualizarPerfil(idUsuario, this.perfil)
      .pipe(
        tap(() =>
          this.messages = [{ severity: 'success', detail: 'Usuário atualizado com sucesso!'}]
        ),
        tap(() => {
          this.usuarioService.buscaUsuarioPorId(idUsuario).subscribe();
        })
      )
      .subscribe();
  }

}
