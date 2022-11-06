import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { ControlsOf, LoginData } from '../core/models';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, CardModule, InputTextModule],
})
export class LoginComponent implements OnInit {
  form!: FormGroup<ControlsOf<LoginData>>;

  constructor(private auth: AuthService, private fb: NonNullableFormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group<ControlsOf<LoginData>>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
    });
  }

  login(): void {
    this.auth
      .login(this.form.getRawValue())
      .then(() => this.router.navigate(['/']))
      .catch(error => console.log(error));
  }
}
