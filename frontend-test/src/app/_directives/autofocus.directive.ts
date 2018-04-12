import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {
  private autofocus;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    if (this.autofocus || typeof this.autofocus === 'undefined') {
      this.el.nativeElement.focus();
    }
  }

  @Input() set appAutofocus(condition: boolean) {
    this.autofocus = condition !== false;
  }
}
