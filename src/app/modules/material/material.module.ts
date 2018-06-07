import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatInputModule,
  MatChipsModule, MatDialogModule
} from '@angular/material';

const dependencies = [
  BrowserAnimationsModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatChipsModule,
  MatDialogModule
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
