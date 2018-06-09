import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../modules/profile/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  smallScreen: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isLoaded: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.isLoaded = false;

    this.breakpointObserver.observe('(max-width: 768px)').subscribe((state: BreakpointState) => {
      this.smallScreen = state.matches;
    });

    this.authService.init().subscribe(authUser => {
      this.authService.authenticate(authUser);

      this.isAdmin = this.authService.isAdmin.value;
      this.isUser = this.authService.isUser.value;

      this.authService.isAdmin.subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });

      this.authService.isUser.subscribe(isUser => {
        this.isUser = isUser;
      });

      this.isLoaded = true;
    });
  }

  signOut(): void {
    this.authService.signOut();
    if (this.router.url !== '') {
      this.router.navigateByUrl('');
    }
  }
}
