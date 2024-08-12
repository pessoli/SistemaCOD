import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FinancaService {

  private urlBase = 'http://localhost:8080/financas';

  constructor(private Http: HttpClient) {

    
  }
}
