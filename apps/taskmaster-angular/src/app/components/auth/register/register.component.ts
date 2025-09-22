import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { from } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Role } from '../../../enums';
import {
  AuthenticationResponse,
  AuthService,
  RegisterRequest,
  StorageService,
} from '../../../services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private auth: AuthService = inject(AuthService);
  private storage: StorageService = inject(StorageService);
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);

  public registerForm: FormGroup;
  public errorMessage!: string;

  constructor() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [Role.User, Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = this.registerForm.value;

      this.auth
        .register(registerRequest)
        .pipe(
          tap((response: AuthenticationResponse) =>
            this.storage.setToken(response.token)
          ),
          tap(() => (this.errorMessage = '')),
          switchMap(() => from(this.router.navigate(['/']))),
          catchError(
            () =>
              (this.errorMessage =
                'Incorrect registration information, please try again.')
          )
        )
        .subscribe();
    } else {
      this.errorMessage = 'Please fill in all the required fields.';
    }
  }
}
