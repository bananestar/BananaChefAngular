import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/user/register';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: Register = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  errorMessage = '';
  successMessage = '';
  constructor(
    private _authService: AuthService,
    private _routerService: Router
  ) {}

  alertSuccess() {
    Swal.fire({
      text:
        this.successMessage +
        'Please login now! You will be redirected to the login page.',
      icon: 'success',
      confirmButtonColor: '#f1b081',
    });
  }

  alertError() {
    Swal.fire({
      text: this.errorMessage,
      icon: 'error',
      confirmButtonColor: '#f1b081',
    });
  }

  redirect(): void {
    setTimeout(() => {
      this._routerService.navigateByUrl('/signIn');
    }, 5000);
  }

  onSubmit(): void {
    this._authService.register(this.form).subscribe({
      next: (data) => {
        this.successMessage = data;
        this.alertSuccess();
        this.redirect();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.alertError();
      },
    });
  }
}
