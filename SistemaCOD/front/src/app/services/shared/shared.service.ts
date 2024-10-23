import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private id: number = 0;

  setIdUsuario(id: number) {
    this.id = id;
  }

  getUsuario(): number {
    return this.id;
  }
}
