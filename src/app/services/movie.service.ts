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
}
