import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const TOKEN_KEY_STORE = 'token';

const baseUrl = environment.baseUrl;
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({providedIn: 'root'})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');

  private _user = signal<User|null>(null);

  private _token = signal<string|null>(null);

  private http = inject(HttpClient);

  // Assim que AuthService esteja pronto, vai disparar o recurso abaixo
  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  })

  authStatus = computed<AuthStatus>(() => {
    if ( this._authStatus() === 'checking' ) return 'checking';
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  })


  usr = computed( () => this._user());

  token = computed( () => this._token());

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email,
      password
    }).pipe(
      map( resp => this.handleAuthSuccess(resp)),
      catchError( (error: any) => this.handleAuthError())
    );
  }

  checkStatus(): Observable<boolean> {
    console.log('chamou checkStatus');

    const token = localStorage.getItem(TOKEN_KEY_STORE);
    if (!token) {
      this.logout();
      return of(false);
    }
    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      headers: {
        Authorization: `Bearer ${token}`

      }
    }).pipe(
      tap( resp => this.handleAuthSuccess(resp)),
      map( () => true),
      catchError( (error: any) => this.handleAuthError())
    );

  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem(TOKEN_KEY_STORE);
  }

  private handleAuthSuccess({token,user}: AuthResponse) {
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');
    localStorage.setItem(TOKEN_KEY_STORE, token);
    return true; // retorna um boolean? Mas e o AuthResponse aí tipo obj retornado?

  }

  private handleAuthError() {
    this.logout();
    return of(false);
  }

}