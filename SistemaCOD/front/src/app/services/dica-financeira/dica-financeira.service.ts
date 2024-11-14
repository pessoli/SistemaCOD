import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DicaFinanceiraModel} from "../../components/dica-financeira/dicaFinanceira.model";

@Injectable({
  providedIn: 'root'
})
export class DicaFinanceiraService {

  private baseUrl = "http://localhost:8080/dica_financeira";

  constructor(private http: HttpClient) { }

  listarDicas(): Observable<DicaFinanceiraModel[]> {
    return this.http.get<DicaFinanceiraModel[]>(this.baseUrl);
  }

  // Método para salvar uma dica financeira com uma imagem
  salvarDica(dicaFinanceira: DicaFinanceiraModel, imagem: File): Observable<DicaFinanceiraModel> {
    const formData: FormData = new FormData();
    formData.append('dicaFinanceira', new Blob([JSON.stringify(dicaFinanceira)], { type: 'application/json' }));
    formData.append('imagem', imagem);

    return this.http.post<DicaFinanceiraModel>(this.baseUrl, formData);
  }


  verificarDicaExistente(link: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/existe?linkVideo=${link}`);
  }

}
