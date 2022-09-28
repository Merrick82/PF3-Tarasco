import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { TransformPipe } from '../pipes/transform.pipe';
import { CustomDirectiveDirective } from '../directives/custom-directive.directive';

@NgModule({
  declarations: [
    TransformPipe,
    CustomDirectiveDirective
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
    TransformPipe,
    CustomDirectiveDirective
  ]
})
export class SharedModule { }
