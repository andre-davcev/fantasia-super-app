import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Role } from '../../../enums';
import { AuthService, RegisterRequest } from '../../../services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public errorMessage!: string;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
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

      this.auth.register(registerRequest).subscribe();
    } else {
      this.errorMessage = 'Please fill in all the required fields.';
    }
  }
}
