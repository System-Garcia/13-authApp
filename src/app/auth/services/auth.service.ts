import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // La propiedad asegura que nadie lo puede editar, aunque use el mismo servicio
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient)

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // Para que nadie modifique el valor del user actual usamos una señal computada
  public currentUser = computed( () => this._currentUser)
  public authStatus = computed( () => this._authStatus)

  constructor() { }

  login(email: string, password: string): Observable<Boolean> {

    const url = `${this.baseUrl}/auth/login`
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      // Destructuring
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);

        console.log({ user, token });
      }),
      map(() => true),

      // TODO: errores
      // Este operador nos permite regresar un error sin importar el tipado
      catchError((err) => throwError(() => err.error.message))
    );

    return of(true)
  }
}
