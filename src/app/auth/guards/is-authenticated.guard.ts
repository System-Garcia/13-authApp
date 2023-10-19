import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  console.log('GUARD', authService.authStatus())
  const router = inject( Router);

  if( authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  // if( authService.authStatus() === AuthStatus.checking) {
  //   return false;
  // }


  // const url = state.url // Ruta a la que se quiere entrar
  // localStorage.setItem('path', url);
  router.navigateByUrl('/auth/login');
  return false;
};
