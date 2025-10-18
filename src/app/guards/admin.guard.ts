import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ValidateActiveSessionService } from './validate-active-session.service';

export const adminGuard: CanActivateFn = () => {
	return inject(ValidateActiveSessionService).canActivate(true);
};
