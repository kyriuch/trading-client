import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { MaterialModule } from './material.module';

const components = [
  ToolbarComponent
];

@NgModule({
  imports: [
    MaterialModule
  ],
  exports: [
    components
  ],
  declarations: [
    components
  ]
})
export class ComponentsModule { }
