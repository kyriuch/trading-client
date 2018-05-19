import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  smallScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe('(max-width: 768px)').subscribe((state: BreakpointState) => {
        this.smallScreen = state.matches;
    });
  }

  ngOnInit() {
  }

}
