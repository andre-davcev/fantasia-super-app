
import { Component } from '@angular/core';
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
  public loginForm: FormGroup;
  public errorMessage!: string;

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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
            (error) =>
              (this.errorMessage = 'Incorrect login, please try again.')
          )
        )
        .subscribe();
    } else {
      this.errorMessage = 'Please fill in all the required fields.';
    }
  }
}
