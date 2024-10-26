import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Message} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MessageSharedService {

  private messageSource = new BehaviorSubject<Message[] | null>(null);
  currentMessage = this.messageSource.asObservable();

  setMessage(message: Message[]) {
    this.messageSource.next(message);
  }
}
