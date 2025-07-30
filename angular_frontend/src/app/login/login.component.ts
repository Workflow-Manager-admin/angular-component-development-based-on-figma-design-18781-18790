import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './login.service';

/**
 * LoginComponent provides a minimalistic, accessible login form.
 * PRIMARY: #2D3748 | SECONDARY: #4FD1C5 | ACCENT: #F6AD55 | Theme: Light
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  // PUBLIC_INTERFACE
  submitting: WritableSignal<boolean> = signal(false);
  // PUBLIC_INTERFACE
  error: WritableSignal<string | null> = signal(null);

  // PUBLIC_INTERFACE
  async onSubmit(): Promise<void> {
    this.submitting.set(true);
    this.error.set(null);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.submitting.set(false);
      return;
    }

    const { email, password } = this.loginForm.value;
    try {
      await this.authService.login(email!, password!);
      // If login succeeds, redirect (could be to dashboard, etc.)
      this.router.navigateByUrl('/');
    } catch (err: any) {
      this.error.set(err?.error?.message || 'Login failed. Please try again.');
      this.loginForm.get('password')?.reset();
    } finally {
      this.submitting.set(false);
    }
  }
}
