import { IFormValidationMessages } from '@app/models/form-validation-messages';

export interface SignIn {
	email: string;
	password: string;
}

export interface SignInValidationMessages {
	email: IFormValidationMessages[];
	password: IFormValidationMessages[];
}
