import { iMovie } from "./movie.interface";

export interface iBasicUser {
  id: string,
  email: string,
  name: string,
  role: string
}

export interface iUser {
  _id: string;
  name: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
  favoriteList: iMovie[];  // Lista de filmes favoritos
  watchLaterList: iMovie[]; // Lista de filmes para assistir depois
  watchedList: iMovie[];    // Lista de filmes assistidos
  createdAt: Date;
  updatedAt: Date;
}