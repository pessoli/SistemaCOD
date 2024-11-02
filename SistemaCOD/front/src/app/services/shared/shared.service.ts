import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  getIdUsuario(): string | null {
    return localStorage.getItem('userId');
  }
}
