import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

export const authMatchGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated$;
};
