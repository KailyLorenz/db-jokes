import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfeces';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  message: string = '';
  hide: boolean = true;
  login$!: Subscription;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.login$ = this.auth.login(user).subscribe({
      complete: () => {
        this.form.reset();
        this.router.navigate(['/jokes']);
        this.submitted = false;
      },
    });
  }

  getErrorMessageEmail(): string {
    if (this.form.get('email')?.errors?.['required']) {
      return 'You must enter a value';
    }
    return 'Not a valid email';
  }

  getErrorMessagePassword(): string {
    if (this.form.get('password')?.errors?.['required']) {
      return 'You must enter a value';
    }
    return `password must be at least ${
      this.form.get('password')?.errors?.['minlength'].requiredLength
    }`;
  }

  ngOnDestroy(): void {
    if (this.login$) {
      this.login$.unsubscribe();
    }
  }
}
