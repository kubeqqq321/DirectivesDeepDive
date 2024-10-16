import {Directive, ElementRef, inject, Input} from '@angular/core';
import {LogDirective} from './log.directive';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {

  @Input() queryParam = '';

  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective created');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Are you sure you want to leave?');

    if (wantsToLeave) {
      // const address = (event.target as HTMLAnchorElement).href;
      const address = this.hostElement.nativeElement.href;
      this.hostElement.nativeElement.href = address + '?from=' + this.queryParam;
      return;
    }
    event?.preventDefault();

  }
}
