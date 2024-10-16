import {Directive, effect, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Permission} from './auth.model';
import {AuthService} from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  // alias jest raczej nie zalecany do używania
  @Input({required: true, alias: 'appAuth'}) userType: Permission = 'guest';

  // userType = input.required<Permission>({alias: 'appAuth'});

  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      this.authService.activePermission() === this.userType ?
        this.viewContainerRef.createEmbeddedView(this.templateRef) :
        this.viewContainerRef.clear();
    });
  }
}
