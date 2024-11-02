import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {SharedService} from "../services/shared/shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private sharedService: SharedService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userId = this.sharedService.getIdUsuario(); // Método para obter o ID do usuário

    // Se não houver ID do usuário (não autenticado), redireciona para a tela de login
    if (!userId) {
      this.router.navigate(['/login']);
      return false;
    }

    return true; // Se o usuário estiver autenticado, permite o acesso
  }
}
