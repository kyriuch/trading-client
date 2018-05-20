import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  smallScreen: boolean;

  registrationForm: FormGroup;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver.observe('(max-width: 768px)').subscribe((state: BreakpointState) => {
      this.smallScreen = state.matches;
    });

    this.registrationForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
        repeatPassword: new FormControl(),
        steamId: new FormControl()
      })
    });
  }
}
