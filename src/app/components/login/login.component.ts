import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private routere: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.initForm();
  }
  hide = true;
  data: Login = {
    password: '',
    email: '',
  };
  loginForm!: FormGroup;

  login() {
    const data: Login = {
      email: this.data.email,
      password: this.data.password,
    };

    this.loginService.login(data).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('user_id', res.id);
        this.openSnackBar('Bienvenido');

        this.router.navigate(['/pokemons']);
      },
      (err) => {
        this.openSnackBar(err.error.message);
      }
    );
  }
  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar');
  }
}
