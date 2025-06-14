export interface iMovie {
  title: string,
  description: string,
  category: string[],
  releaseDate: Date,
  director?: string,
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

export interface iBasicMovie {
  title: string,
  description: string,
  category: string[],
  releaseDate: Date,
  director?: string,
  imageUrl: string,
  cast?: string[]
}

export interface iResponseMovie {
  message: string,
  movies: iMovie[]
}