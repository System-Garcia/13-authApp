import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Al hacer el inject se dispara su constructor
  private authService = inject(AuthService);
  private router = inject(Router);

  // Propiedad computada para decidir si se muestra el login o no
  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  // Cada vez que un signal dentro cambia se dispara el effect
  public authStatusChangedEffect = effect(() => {

    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      // Esto es util para nuestro metodo logout en el service
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
    }
  });
}
