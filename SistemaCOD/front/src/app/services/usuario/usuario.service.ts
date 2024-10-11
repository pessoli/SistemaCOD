import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  validaUsuario(email: string, senha: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/validaUsuario?email=${email}&senha=${senha}`, { headers });
  }


  saveUsuario(usuario: any): Observable<any> {
    console.log(usuario)
    return this.http.post(`${this.baseUrl}/usuarios`, usuario);
  }
}
