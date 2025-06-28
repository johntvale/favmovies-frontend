import { iMovie } from "./movie.interface";

export interface iBasicUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface iUser {
  id: string;
  name: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
  favoriteList: iMovie[];
  watchLaterList: iMovie[];
  watchedList: iMovie[];
  createdAt: string;
  updatedAt: string;
}

export interface iResponseBasicUser {
  message: string;
  users: iBasicUser[];
}