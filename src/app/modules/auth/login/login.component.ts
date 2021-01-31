import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from 'src/app/core/models/Service.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = null;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.min(3),Validators.maxLength(30)]],
      password: ['', [Validators.required,Validators.min(8), Validators.maxLength(30)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const payload: Service = {
        requestBody: this.loginForm.getRawValue()
      }
      this.httpService.apiPost('LOGIN', payload, true).subscribe((res: any) => {
        this.authService.userLogged.next(true);
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.router.navigateByUrl('/moment');
      }, err => {
        this.messageService.showError('Invalid Username Password')
      });
    }
  }
}
