import { iMovie } from "./movie.interface"
import { iUser } from "./user.interface"

export interface iInsights {
  favorites: {
    top3Favorites: iMovie[],
    favoriteMovieOfTheMonth: iMovie,
    miniCards: {
      totalMovies: number,
      totalFavorites: number,
      percentageOfFavorited: number
    }
  },
  watched: {
    top3MostWatched: iMovie[],
    mostWatchedOfTheMonth: iMovie,
    miniCards: {
      totalViews: number,
      percentageOfWatchedMovies: number,
      userWhoWatchedTheMostMovies: iUser | null
    }
  },
  ratings: {
    top3Ratings: iMovie[],
    userWithHighestEngagement: iUser | null,
    miniCards: {
      totalRatings: number,
      mediaGeral: number,
      userWhoRatedTheMostMovies: iUser | null
    }
  }
}

export interface iResponseInsights {
  message: string,
  insights: iInsights,
}