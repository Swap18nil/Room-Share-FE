import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/common-classes/user';
import { AuthService } from 'src/app/common-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  user: User = new User()
  constructor(private fb: FormBuilder,private authService: AuthService,private router:Router ) {
    this.registerForm = this.fb.group({
      fullName: [this.user.fullName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user.fullName = this.registerForm.value.fullName;
      this.user.email = this.registerForm.value.email;
      this.user.password = this.registerForm.value.password;
      this.authService.register(this.user).subscribe(
        response => {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        },
        error => {
          alert('Error registering user');
        }
      );
    }
  }
}
