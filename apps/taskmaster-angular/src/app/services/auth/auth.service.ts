import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private storage: StorageService = inject(StorageService);

  private apiUrl: string = 'http://localhost:8080/api/auth';

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
