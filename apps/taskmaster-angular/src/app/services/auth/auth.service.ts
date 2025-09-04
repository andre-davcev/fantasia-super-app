import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from '../storage/storage.service';
import {
  AuthenticationRequest,
  AuthenticationResponse,
  RegisterRequest,
} from './http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {}

  public login(
    request: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  public register(request: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.apiUrl}/register`,
      request
    );
  }

  public logout(): void {
    this.storage.clearToken();
    this.router.navigate(['/']);
  }

  public isLoggedIn() {
    return this.storage.getToken() != null;
  }
}
