import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { matchOtherValidator } from '../../validators/password-validator';
import { trigger, style, state, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
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
export class RegisterPageComponent implements OnInit {

  smallScreen: boolean;

  registrationForm: FormGroup;

  emailState: boolean;
  passwordState: boolean;
  repeatPasswordState: boolean;
  steamIdState: boolean;

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
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      repeatPassword: ['', [Validators.compose(
        [Validators.required, Validators.minLength(6), Validators.maxLength(32), matchOtherValidator('password')]
      )]],
      steamId: ['', [Validators.required, Validators.pattern('^STEAM_[0-5]:[01]:[0-9]+$')]]
    });
  }

  emailError() {
    const control = this.registrationForm.get('email');

    if (control.hasError('required')) {
      return 'Uzupełnij adres email';
    } else if (control.hasError('email')) {
      return 'Adres email nieprawidłowy';
    }
  }

  passwordError() {
    const control = this.registrationForm.get('password');

    if (control.hasError('required')) {
      return 'Uzupełnij hasło';
    } else if (control.hasError('minlength')) {
      return 'Minimalna długość hasła to 6';
    } else if (control.hasError('maxlength')) {
      return 'Maksymalna długość hasła to 32';
    }
  }

  repeatPasswordError() {
    const control = this.registrationForm.get('repeatPassword');

    if (control.hasError('required')) {
      return 'Uzupełnij hasło';
    } else if (control.hasError('minlength')) {
      return 'Minimalna długość hasła to 6';
    } else if (control.hasError('maxlength')) {
      return 'Maksymalna długość hasła to 32';
    } else if (control.hasError('matchOther')) {
      return 'Hasła nie pasują do siebie';
    }
  }

  steamIdError() {
    const control = this.registrationForm.get('steamId');

    if (control.hasError('required')) {
      return 'Uzupełnij Steam';
    } else if (control.hasError('pattern')) {
      return 'SteamID nieprawidłowy';
    }
  }

  onSubmit() {
    if (!this.registrationForm.valid) {
      if (!this.registrationForm.get('email').valid) {
        this.emailState = !this.emailState;
      }

      if (!this.registrationForm.get('password').valid) {
        this.passwordState = !this.passwordState;
      }

      if (!this.registrationForm.get('repeatPassword').valid) {
        this.repeatPasswordState = !this.repeatPasswordState;
      }

      if (!this.registrationForm.get('steamId').valid) {
        this.steamIdState = !this.steamIdState;
      }
    } else {
      this.authService.registerUser(
        {
          email: this.registrationForm.get('email').value,
          password: this.registrationForm.get('password').value,
          steamId: this.registrationForm.get('steamId').value
        }
      ).subscribe((data) => {

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
