import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated$;
};
