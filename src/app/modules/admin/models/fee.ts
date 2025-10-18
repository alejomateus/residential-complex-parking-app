import { IFormValidationMessages } from '@app/models/form-validation-messages';

export interface Fee {
	id?: string;
	licensePlate: string;
	phone: string;
	observations?: string;
	startDateTime?: string | number;
	endDateTime?: string | number;
	parkingSlotId?: string;
	total?: string;
	createdAt?: Date;
}

export interface FeeValidationMessages {
	licensePlate: IFormValidationMessages[];
	phone: IFormValidationMessages[];
}
