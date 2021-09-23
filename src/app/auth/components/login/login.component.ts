import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      // const { email, password } = this.form.value;
      // this.authService
      //   .login(email, password)
      //   .then(() => {
      //     this.router.navigate(['/admin']);
      //   })
      //   .catch(() => {
      //     alert('No es válido');
      //   });
    }
  }
}
