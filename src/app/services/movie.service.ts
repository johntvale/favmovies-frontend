import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { iMovie, iResponseMovie } from '../interfaces/movie.interface';
import { formatDateFromIsoToBr } from '../utils/formatter.util';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl: string = 'http://localhost:3001/movies';

  constructor(private http: HttpClient) { }

  getMovieList(): Observable<iResponseMovie> {
    return this.http.get<iResponseMovie>(`${this.apiUrl}/search`, { withCredentials: true }).pipe(
      map((response) => ({
        ...response,
        movies: response.movies.map((movie)=>({
          ...movie,
          releaseDate: formatDateFromIsoToBr(movie.releaseDate)
        })),
      })),
    );
  }

  createMovie(movie: iMovie): Observable<iResponseMovie> {
    return this.http.post<iResponseMovie>(`${this.apiUrl}/register`, movie, { withCredentials: true });
  }

  updateMovie(movie: iMovie, movieId: string): Observable<iResponseMovie> {
    return this.http.patch<iResponseMovie>(`${this.apiUrl}/update/${movieId}`, movie, { withCredentials: true });
  }

  deleteMovie(movieId: string): Observable<iResponseMovie> {
    return this.http.delete<iResponseMovie>(`${this.apiUrl}/remove/${movieId}`, { withCredentials: true });
  }
  
  getMovieById(movie: iMovie, movieId: string): Observable<iResponseMovie> {
    return this.http.get<iResponseMovie>(`${this.apiUrl}/search/${movieId}`, { withCredentials: true });
  }
}
