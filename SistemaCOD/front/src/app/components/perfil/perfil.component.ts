import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PerfilModel} from "./perfil.model";
import {ConfirmationService, Message, MessageService} from "primeng/api";
import {UsuarioService} from "../../services/usuario/usuario.service";
import {SharedService} from "../../services/shared/shared.service";
import {tap} from "rxjs";
import {CalendarModule} from "primeng/calendar";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
    InputGroupModule,
    ConfirmDialogModule
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

    this.usuarioService.buscaUsuarioPorId(idUsuario as unknown as number)
      .pipe(
        tap(usuario => {
          console.log(usuario)
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
    const idUsuario = this.sharedService.getIdUsuario() as unknown as number;

    this.perfil = {
      id: idUsuario,
      nome: this.formGroupPerfil.controls['nome'].value,
      email: this.formGroupPerfil.controls['email'].value,
      dataNascimento: this.formGroupPerfil.controls['dataNascimento'].value,
      ativo: true
    }

    this.usuarioService.atualizarPerfil(this.perfil?.id, this.perfil)
      .pipe(
        tap(() =>
          this.messages = [{ severity: 'success', detail: 'Usuário atualizado com sucesso!', life: 3000 }]
        ),
        tap(() => {
          this.usuarioService.buscaUsuarioPorId(idUsuario).subscribe();
        })
      )
      .subscribe();
  }

}
