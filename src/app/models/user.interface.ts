import { RoleEnum } from '@core/types/role.enum';
import { ICommonAttributes } from '@models/common-interface-attributes';

export interface IUser extends ICommonAttributes {
  name: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  isActive?: boolean;
  role?: RoleEnum;
}
