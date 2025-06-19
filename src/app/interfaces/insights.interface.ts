import { iMovie } from "./movie.interface"
import { iUser } from "./user.interface"

export interface iInsights {
  favorites: {
    top3Favorites: iMovie[],
    mostFavoriteMovieOfTheMonth: iMovie[],
    miniCards: {
      totalMovies: number,
      totalFavoriteMarks: number,
      percentageOfFavorited: number
    }
  },
  watched: {
    top3MostWatched: iMovie[],
    mostWatchedOfTheMonth: iMovie[],
    miniCards: {
      totalViews: number,
      percentageOfWatchedMovies: number,
      userWhoWatchedTheMostMovies: iUser | null
    }
  },
  ratings: {
    top3Ratings: iMovie[],
    mostRatedMovieOfTheMonth: iMovie[] | null,
    miniCards: {
      totalRatings: number,
      overallRatingAverage: number,
      userWhoRatedTheMostMovies: iUser | null
    }
  }
}

export interface iResponseInsights {
  message: string,
  insights: iInsights,
}