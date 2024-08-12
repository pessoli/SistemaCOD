import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FinancaComponent} from "./components/financa/financa.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FinancaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
