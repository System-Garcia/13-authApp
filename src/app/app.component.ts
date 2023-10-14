import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService = inject( AuthService );

  public finishedAuthCheck = computed<boolean>( () => {
    if(this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;

  });

  public authStatusChangedEffect = effect( () => {
    console.log(this.authService.authStatus())
  })
}
