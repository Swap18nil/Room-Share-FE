import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common-classes/user';
import { AuthService } from 'src/app/common-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  user:User = new User()

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.user.email = this.loginForm.value.email;
      this.user.password = this.loginForm.value.password;
      this.authService.login(this.user).subscribe(
        response => {
          alert('Login Successfull');
          localStorage.setItem('userId', response.id);
          this.router.navigate(['/rooms']);
        },
        error => {
          alert('Error registering user');
        }
      );
    }
  }

}
