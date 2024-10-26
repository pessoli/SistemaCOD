import {Component, OnInit} from '@angular/core';
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {MessageSharedService} from "../../services/message/messageShared.service";
import {MenuModule} from "primeng/menu";
import {NgClass, NgStyle} from "@angular/common";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MessagesModule,
    MenuModule,
    NgStyle,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  messages!: Message[]


  constructor(
    private messageService: MessageSharedService,
  ) {
  }

  public ngOnInit() {
    this.messageService.currentMessage.subscribe(message => {
      this.messages = message as Message[]; // Recebe a mensagem do serviço
    });
  }
}
