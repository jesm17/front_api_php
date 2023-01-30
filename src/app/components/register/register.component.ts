import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import dateFormat, { masks } from 'dateformat';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form!: FormGroup;
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm();
  }

  user: User = {
    password: '',
    address: '',
    city: '',
    email: '',
    name: '',
    birthdate: '',
  };

  register() {
    this.user.birthdate = dateFormat(this.user.birthdate, 'yyyy-mm-dd');
    console.log(this.user);

    this.userService.register(this.user).subscribe(
      (res: any) => {
        if (res.status == 201) {
          this.openSnackBar(res.message);
        } else {
        }
      },
      (err) => {
        this.openSnackBar(err.error.mesage);
      }
    );
  }

  registerForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      address: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar');
  }
}
