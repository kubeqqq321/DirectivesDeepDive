import {Component, inject, Input, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  // @Input({required:true}) email: string = '';
  // @Input({required:true}) password: string = '';

  email = signal("");
  password = signal("");
  private authService = inject(AuthService);

  onSubmit() {
    this.authService.authenticate(this.email(), this.password());
  }
}
