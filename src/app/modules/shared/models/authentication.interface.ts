import { RoleEnum } from "@core/types/role.enum";
import { IUser } from "@models/user.interface";

export interface IAuthentication {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  refreshToken: string;
  user: IUser;
}

export interface IAuthTokenDecoded {
  id: string;
  role: RoleEnum;
  exp: string;
  iat: string;
}
