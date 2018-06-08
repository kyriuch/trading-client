import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../modules/profile/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  smallScreen: boolean;
  isAdmin: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe('(max-width: 768px)').subscribe((state: BreakpointState) => {
      this.smallScreen = state.matches;
    });

    this.authService.isAdmin.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

}
