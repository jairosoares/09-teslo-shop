import { Component, inject, signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [RouterLink, ReactiveFormsModule],
})
export class LoginPageComponent {

  authService = inject(AuthService);

  router = inject(Router);

  fb = inject(FormBuilder);

  hasError = signal(false);

  isPosting = signal(false);

  loginForm = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  })

  onSubmit() {

   if (this.loginForm.invalid)  {
    this.showMessageError();
    return;
   }

   const { email = '', password = '' } = this.loginForm.value;
   this.authService.login(email!, password!)
    .subscribe(isAuthenticated => {
      if ( isAuthenticated ) {
        this.router.navigateByUrl('/');
        return;
      }
      this.showMessageError();
    })
  }

  showMessageError() {
    this.hasError.set(true);
    setTimeout( () => {
      this.hasError.set(false);
    }, 2000);
  }

}
