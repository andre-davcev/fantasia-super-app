import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { from } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import {
  AuthenticationRequest,
  AuthenticationResponse,
  AuthService,
  StorageService,
} from '../../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private auth: AuthService = inject(AuthService);
  private storage: StorageService = inject(StorageService);
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);

  public loginForm: FormGroup;
  public errorMessage!: string;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const authenticationRequest: AuthenticationRequest = this.loginForm.value;

      this.auth
        .login(authenticationRequest)
        .pipe(
          tap((response: AuthenticationResponse) =>
            this.storage.setToken(response.token)
          ),
          tap(() => (this.errorMessage = '')),
          switchMap(() => from(this.router.navigate(['/']))),
          catchError(
            () => (this.errorMessage = 'Incorrect login, please try again.')
          )
        )
        .subscribe();
    } else {
      this.errorMessage = 'Please fill in all the required fields.';
    }
  }
}
