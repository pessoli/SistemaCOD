import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TipoDespesaModel} from "../../components/tipo-despesa/tipo-despesa.model";

@Injectable({
  providedIn: 'root'
})
export class TipoDespesaService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  buscarTipoDespesaPorIdUsuario(idUsuario: number): Observable<TipoDespesaModel[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<TipoDespesaModel[]>(`${this.baseUrl}/tipo_despesa/busca/${idUsuario}`, { headers });
  }

  buscaTipoDespesaPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tipo_despesa/${id}`)
  }

  saveTipoDespesa(tipoDespesa: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tipo_despesa`, tipoDespesa);
  }

  atualizaTipoDespesa(tipoDespesa: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tipo_despesa/atualizaTipoDespesa`, tipoDespesa);
  }

  tipoDespesaLimiteUltrapassado(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/despesas/tipoDespesaLimiteUltrapassado?idUsuario=${idUsuario}`);
  }

  isTipoDespesaLimiteUltrapassado(idTipoDespesa: number, valor: number, idDespesa: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/despesas/isTipoDespesaLimiteUltrapassado?idTipoDespesa=${idTipoDespesa}&valor=${valor}&idDespesa=${idDespesa}`)
  }

  chartTipoDespesa(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tipo_despesa/chartTipoDespesa?idUsuario=${idUsuario}`);
  }

  chartTipoDespesaSomaMes(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tipo_despesa/chartTipoDespesaSoma?idUsuario=${idUsuario}`);
  }
}
