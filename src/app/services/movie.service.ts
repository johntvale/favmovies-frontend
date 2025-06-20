import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iResponseMovie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl: string = 'http://localhost:3001/movies';

  constructor(private http: HttpClient) { }

  getMovieList(): Observable<iResponseMovie> {
    return this.http.get<iResponseMovie>(`${this.apiUrl}/search`, { withCredentials: true });
  }

  createMovie(movie: any): Observable<iResponseMovie> {
    return this.http.post<iResponseMovie>(`${this.apiUrl}/create`, movie, { withCredentials: true });
  }

  updateMovie(movie: any): Observable<iResponseMovie> {
    return this.http.put<iResponseMovie>(`${this.apiUrl}/update/${movie.id}`, movie, { withCredentials: true });
  }

  deleteMovie(movieId: string): Observable<iResponseMovie> {
    return this.http.delete<iResponseMovie>(`${this.apiUrl}/delete/${movieId}`, { withCredentials: true });
  }
  
  getMovieById(movieId: string): Observable<iResponseMovie> {
    return this.http.get<iResponseMovie>(`${this.apiUrl}/details/${movieId}`, { withCredentials: true });
  }
}
