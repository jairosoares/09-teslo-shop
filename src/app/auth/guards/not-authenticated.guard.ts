import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = await firstValueFrom(authService.checkStatus());
  console.log({isAuthenticated});
  if (isAuthenticated) {
    // se ja esta autenticado, nao deixa ver a pagina auth pra fazer login
    console.log('Voce ja esta autenticado, portanto nao tem permissao de entrar na pagina auth. Voce foi redirecionado para pagina principal da aplicacao');
    router.navigateByUrl('/');
    return false;
  }

  return true;
}