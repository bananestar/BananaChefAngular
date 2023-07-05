import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { inject } from '@angular/core';

export function authenticationGuard(): CanActivateFn {
  return () => {
    const oauthService: StorageService = inject(StorageService);
    const router: Router = inject(Router);
    if (oauthService.isLoggedIn()) router.navigateByUrl('/home');
    return !oauthService.isLoggedIn();
  };
}
