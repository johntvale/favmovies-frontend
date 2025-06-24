export interface iBasicMovie {
  title: string,
  description: string,
  category: string[],
  releaseDate: string,
  director?: string,
  trailerUrl?: string,
  imageUrl: string,
  cast?: string[]
}

export interface iMovie {
  _id?: string,
  title: string,
  description: string,
  category: string[],
  releaseDate: string,
  director?: string,
  trailerUrl?: string,
  imageUrl: string,
  cast?: string[],
  ratings?: {
    user: string,
    score: number,
  }[],
  averageRating?: number,
  favorite?: {
    user: string,
    favorite: boolean,
  }[],
  favoriteCount?: number,
  view?: {
    user: string,
    view: boolean,
  }[],
  viewCount?: number
}


export interface iResponseMovie {
  message: string,
  movies: iMovie[]
}

export enum MOVIE_FORMS_TYPE {
  REGISTER = 'REGISTER',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  DETAILS = 'DETAILS'
}