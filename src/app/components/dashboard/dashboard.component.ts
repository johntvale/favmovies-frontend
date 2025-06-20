import { Component, signal } from '@angular/core';

import { iMovie } from '../../interfaces/movie.interface';
import { MovieService } from './../../services/movie.service';
import { insightsService } from '../../services/insights.service';
import { iInsights } from '../../interfaces/insights.interface';
import { LoadingComponent } from "../loading/loading.component";
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { MiniCardComponent } from "./mini-card/mini-card.component";

@Component({
  selector: 'app-dashboard',
  imports: [LoadingComponent, MovieCardComponent, MiniCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  movieList: iMovie[] = [];

  isLoadingInsights: boolean = true;
  favorites = signal<iInsights['favorites'] | any >({});
  watched = signal<iInsights['watched'] | any >({});
  ratings = signal<iInsights['ratings'] | any >({});

  constructor(private movieService: MovieService, private insightsService: insightsService) {}
  
  ngOnInit() {
    this.getInsightsService();
  }
  
  getInsightsService() {
    this.isLoadingInsights = true;
    this.insightsService.getInsightsData().subscribe({
      next: (result) => {
        if (result) {
          this.favorites.set(result.insights.favorites);
          this.watched.set(result.insights.watched);
          this.ratings.set(result.insights.ratings);
        }
      },
      complete: () => {
        this.isLoadingInsights = false;
      },
      error: () => {
        this.isLoadingInsights = false;
      },
    });
  };
}
