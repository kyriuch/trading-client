import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [`
  .spacer {
    flex: auto 1 1;
  }

  .shadow {
    -webkit-box-shadow: 0px -10px 5px 16px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px -10px 5px 16px rgba(0,0,0,0.75);
    box-shadow: 0px -10px 5px 16px rgba(0,0,0,0.75);
  }`]
})
export class ToolbarComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
