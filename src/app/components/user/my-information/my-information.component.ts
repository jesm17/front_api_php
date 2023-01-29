import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.css'],
})
export class MyInformationComponent {
  userInfo: User = {
    email: '',
    address: '',
    birthdate: '',
    city: '',
    name: '',
    password: '',
    age: 0,
    phone_number: '',
  };
  user_phone: string = '';
  user_age: number = 0;
  userId: any = sessionStorage.getItem('user_id');
  constructor(private userSevice: UserService, private _snackBar: MatSnackBar) {
    this.initForm();
  }

  phoneForm!: FormGroup;
  initForm(): void {
    this.phoneForm = new FormGroup({
      phone: new FormControl('', [Validators.max(3999999990)]),
      age: new FormControl('', [Validators.max(100)]),
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getInfo();
  }
  getInfo() {
    this.userSevice.getUser(this.userId).subscribe((res: any) => {
      console.log(res.additionalInfo);

      this.userInfo = res.user;
      if (res.additionalInfo[0] != null) {
        this.userInfo.phone_number = res.additionalInfo[0].phone_number;
        this.userInfo.age = res.additionalInfo[0].age;
      } else {
      }
    });
  }
  updateInfo() {
    this.userSevice.updateAdditionalInfo(this.userInfo).subscribe(
      (res: any) => {
        this.openSnackBar(res.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar');
  }
}
