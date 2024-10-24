import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  validaUsuario(email: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseUrl}/usuarios/validaUsuario?email=${email}&senha=${senha}`, { headers });
  }


  saveUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario);
  }

  atualizarPerfil(id: number, usuario: any): Observable<any> {
   return this.http.put(`${this.baseUrl}/usuarios/atualizaUsuario?id=${id}`, usuario);
  }

  buscaUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${id}`);
  }
}
