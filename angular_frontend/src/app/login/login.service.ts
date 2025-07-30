import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * AuthService handles user authentication, login and JWT token management for the session.
 */
// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: WritableSignal<string | null> = signal<string | null>(null);

  // eslint-disable-next-line no-unused-vars
  constructor(private _http: HttpClient) {}

  /**
   * Logs in the user with given credentials.
   * On success, stores token.
   * @param email 
   * @param password 
   */
  // PUBLIC_INTERFACE
  async login(email: string, password: string): Promise<void> {
    // Use environment.apiUrl to target the real backend
    const loginUrl = `${environment.apiUrl}/auth/login`;
    try {
      const response: any = await lastValueFrom(
        this._http.post(loginUrl, { email, password })
      );
      // Correct way to update signal value (writable signal):
      this._token.set(response?.token || null);
      // Optionally store in localStorage for browser
      if (
        typeof globalThis !== 'undefined' &&
        typeof globalThis.localStorage !== 'undefined' &&
        response?.token
      ) {
        globalThis.localStorage.setItem('token', response.token);
      }
    } catch (err: any) {
      // Optionally rethrow for UI error handling
      throw err instanceof HttpErrorResponse ? err : { error: { message: 'Unknown login error' } };
    }
  }

  /**
   * Returns the session token, if signed in.
   */
  // PUBLIC_INTERFACE
  token(): string | null {
    // Use browser guard for localStorage
    if (this._token()) return this._token();
    if (
      typeof globalThis !== 'undefined' &&
      typeof globalThis.localStorage !== 'undefined'
    ) {
      return globalThis.localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Logs out the user by removing the token.
   */
  // PUBLIC_INTERFACE
  logout(): void {
    this._token.set(null);
    if (
      typeof globalThis !== 'undefined' &&
      typeof globalThis.localStorage !== 'undefined'
    ) {
      globalThis.localStorage.removeItem('token');
    }
  }
}
