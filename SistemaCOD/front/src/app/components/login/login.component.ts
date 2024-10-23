import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {UsuarioService} from "../../services/usuario/usuario.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FloatLabelModule} from "primeng/floatlabel";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonDirective,
    ReactiveFormsModule,
    CardModule,
    CommonModule,
    FloatLabelModule,
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formGroup: FormGroup;
  messages!: Message[];

  constructor(
    private fb: FormBuilder,
    private loginService: UsuarioService,
    private router: Router,
    private sharedService: SharedService,
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  public login() {
    const email = this.formGroup.controls['email'].value;
    const password = this.formGroup.controls['senha'].value;

    this.loginService.validaUsuario(email, password)
      .pipe(
        tap(res => {
          if (res !== null) {
            this.router.navigate(['/home']).then();
            console.log(res);
            this.sharedService.setIdUsuario(res.id)
          } else {
            this.messages = [{ severity: 'error', detail: 'Dados incorretos!'}]
          }
        }),
      )
      .subscribe();
  }

}
