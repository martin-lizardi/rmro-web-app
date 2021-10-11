import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  StorageService,
  UserData,
} from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  private openDialog() {
    this.dialog.open(AlertComponent, {
      data: {
        type: 'info',
        title: '¡Oops! Algo salió mal',
        content: 'Vuelva a intentar.',
      },
    });
  }

  public async login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const { email, password } = this.form.value;
      try {
        const logRes = await this.authService.login(email, password);
        const { user } = logRes;

        this.userService.getUser(user?.uid || '').subscribe(
          (userDB) => {
            const newUser: UserData = {
              email,
              rol: userDB.rol,
              uid: userDB.uid,
              refreshToken: user?.refreshToken || '',
            };

            this.storageService.user = newUser;
            this.router.navigate(['/home']);
          },
          () => {
            this.openDialog();
          }
        );
      } catch (error) {
        this.openDialog();
      }
    }
  }
}
