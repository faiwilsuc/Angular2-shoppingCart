import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onLogin() {
    this.authService.loginUser(this.myForm.value);
  }

  ngOnInit():any {
      this.myForm = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
      });
  }

}
