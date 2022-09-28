import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirectiveDirective {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '20px'); 
  }
}
