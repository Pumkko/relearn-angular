import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './login.component.html',
})
export class LoginComponent {


  private authService = inject(AuthService);


  get user$(): Observable<User | null | undefined> {
    return this.authService.user$;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  login() {
    this.authService.loginWithRedirect({
      authorizationParams: {
        prompt: 'consent'
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next(value) {
        console.log(value)
      },
      error(v) {
        console.log(v)
      },
      complete() {
        console.log("logout")
      }
    });
  }

}
