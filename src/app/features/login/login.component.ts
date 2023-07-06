import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/user/login';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: Login = {
    emailOrUsername: '',
    password: '',
  };

  errorMessage = '';

  constructor(
    private _authService: AuthService,
    private _storageService: StorageService,
    private _routerService: Router
  ) {}

  ngOnInit(): void {}

  // showAlertMessage(): void {
  //   this.showAlert = true;
  //   setTimeout(() => {
  //     this.showAlert = false;
  //   }, 5000); // Masquer l'alerte après 5 secondes 
  // }

  alert() {
    Swal.fire({
      text: 'Connection failed. Please check your credentials!',
      icon: 'error',
      confirmButtonColor: '#f1b081',
    });
  }

  onSubmit(): void {
    this._authService.login(this.form).subscribe({
      next: (data) => {
        this._storageService.saveUser(data);

        this.redirect();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.alert();
      },
    });
  }

  redirect(): void {
    this._routerService.navigateByUrl('/home');
    window.location.reload();
  }
}
