import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DespesaModel} from "../../components/despesa/despesa.model";

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  buscaDespesaPorIdUsuario(idUsuario: number): Observable<DespesaModel[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<DespesaModel[]>(`${this.baseUrl}/despesas/busca/${idUsuario}`, { headers });
  }

  saveDespesa(despesa: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/despesas`, despesa);
  }

  atualizaDespesa(despesa: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/despesas/atualizaDespesa`, despesa);
  }

  excluiDespesa(idDespesa: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/despesas?id=${idDespesa}`);
  }
}
