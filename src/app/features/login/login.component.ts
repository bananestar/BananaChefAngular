import { Component, OnInit } from '@angular/core';
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

  isLoggedIn = false;
  showAlert = false;
  errorMessage = '';

  constructor(
    private _authService: AuthService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this._storageService.isLoggedIn())
      this.isLoggedIn = this._storageService.isLoggedIn();
  }

  showAlertMessage(): void {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000); // Masquer l'alerte après 5 secondes (ajustez selon vos besoins)
  }

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

        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoggedIn = false;
        this.alert();
      },
    });
  }

  reloadPage(): void {
    location.reload();
  }
}
