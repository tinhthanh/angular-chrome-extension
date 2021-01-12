import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  @Input()
  appHighlight: string;
  @Input()
  isHighlight: boolean = true;
  @Input()
  trackChange: Function = this.hasChange;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isHighlight && changes['appHighlight'] && this.trackChange(changes['appHighlight'].previousValue, changes['appHighlight'].currentValue)) {
      if(this.el.nativeElement.classList.contains('change')){
        this.el.nativeElement.classList.remove('change');
        this.el.nativeElement.classList.add('change-virtual');
      } else if(this.el.nativeElement.classList.contains('change-virtual')) {
        this.el.nativeElement.classList.remove('change-virtual');
        this.el.nativeElement.classList.add('change');
      } else {
        this.el.nativeElement.classList.add('change');
      }
    }
  }

  hasChange(previousValue: any, currentValue: any): boolean {
    return JSON.stringify(previousValue) != JSON.stringify(currentValue);
  }

}
