import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appDirective]',
  standalone: false
})
export class DirectiveDirective implements OnInit {
 
 constructor(private el: ElementRef, private renderer: Renderer2) { }
 
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
  }
}