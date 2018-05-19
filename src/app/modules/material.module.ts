import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';

const dependencies = [
  BrowserAnimationsModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  imports: [
    dependencies
  ],
  exports: [
    dependencies
  ],
  declarations: []
})
export class MaterialModule { }
