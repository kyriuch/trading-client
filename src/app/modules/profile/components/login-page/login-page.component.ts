import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../../components/alert/alert.component';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('shake', [
      transition('* => *', [
        animate(150, keyframes([
          style({ 'margin-left': '10px', 'margin-right': '0px' }),
          style({ 'margin-left': '0px', 'margin-right': '10px' }),
          style({ 'margin-left': '10px', 'margin-right': '0px' }),
          style({ 'margin-left': '0px', 'margin-right': '20px' }),
          style({ 'margin-left': '10px', 'margin-right': '0px' }),
          style({ 'margin-left': '0px', 'margin-right': '10px' }),
          style({ 'margin-left': '10px', 'margin-right': '0px' }),
          style({ 'margin-left': '0px', 'margin-right': '0px' }),
        ]))
      ])
    ])
  ]
})
export class LoginPageComponent implements OnInit {

  smallScreen: boolean;

  loginForm: FormGroup;

  emailState: boolean;
  passwordState: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder,
    private authService: AuthService, private dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit() {
    this.breakpointObserver.observe('(max-width: 768px)').subscribe((breakpointState: BreakpointState) => {
      this.smallScreen = breakpointState.matches;
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    });
  }

  emailError() {
    const control = this.loginForm.get('email');

    if (control.hasError('required')) {
      return 'Uzupełnij adres email';
    } else if (control.hasError('email')) {
      return 'Adres email nieprawidłowy';
    }
  }

  passwordError() {
    const control = this.loginForm.get('password');

    if (control.hasError('required')) {
      return 'Uzupełnij hasło';
    } else if (control.hasError('minlength')) {
      return 'Minimalna długość hasła to 6';
    } else if (control.hasError('maxlength')) {
      return 'Maksymalna długość hasła to 32';
    }
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      if (!this.loginForm.get('email').valid) {
        this.emailState = !this.emailState;
      }

      if (!this.loginForm.get('password').valid) {
        this.passwordState = !this.passwordState;
      }
    } else {
      this.authService.login(
        {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value
        }
      ).subscribe((data) => {
        this.authService.authenticate(data);
      }, (err: HttpErrorResponse) => {
        const dialogRef = this.dialog.open(AlertComponent,
          {
            width: '400px',
            height: '200px',
            data: err.error,
            role: 'alertdialog'
          });
      });
    }
  }
}
