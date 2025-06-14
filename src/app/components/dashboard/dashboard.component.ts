import { iMovie } from '../../interfaces/movie.interface';
import { MovieService } from './../../services/movie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  movieList: iMovie[] = [];
  constructor(private movieService: MovieService) {}

  getMovieList() {
    this.movieService.getMovieList().subscribe({
      next: (result) => {
        if (result.movies) {
          this.movieList = result.movies;
        }
        console.log(this.movieList);
      },
      error: () => {},
    });
  }

  ngOnInit() {
    this.getMovieList();
  }

}
