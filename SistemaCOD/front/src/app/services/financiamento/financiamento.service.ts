import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FinanciamentoModel} from "../../components/financiamento/financiamento.model";

@Injectable({
  providedIn: 'root'
})
export class FinanciamentoService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  buscarContaPorIdUsuario(idUsuario: number): Observable<FinanciamentoModel[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<FinanciamentoModel[]>(`${this.baseUrl}/contas/busca/${idUsuario}`, { headers });
  }

  buscaContaPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/contas/${id}`)
  }

  saveConta(conta: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contas`, conta);
  }

  atualizaConta(conta: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/contas/atualizaConta`, conta);
  }

  mesPagamentoParcela(pagamento: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contas/mesPagamentoParcela`, pagamento);
  }

  buscaPagamentoPorIdConta(idConta: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/contas/buscaPagamento?idConta=${idConta}`);
  }

  atualizaParcelasConta(idConta: number): Observable<any> {
    const url = `${this.baseUrl}/contas/atualizaParcelasConta?idConta=${idConta}`;
    return this.http.put<any>(url, null);
  }
}
