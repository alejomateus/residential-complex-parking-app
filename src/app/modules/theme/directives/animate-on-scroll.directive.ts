import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[kotAnimateOnScroll]'
})
export class AnimateOnScrollDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    });

    observer.observe(element);
  }
}
