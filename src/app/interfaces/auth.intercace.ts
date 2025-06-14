import { iBasicUser } from './user.interface';

export interface iResponseAuth {
  message: string,
}

export interface iResponseAuthWithUser {
  message: string,
  user: iBasicUser
}