import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iMovie } from '../../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})

export class MovieCardComponent {
  @Input() cardType: string = '';
  @Input() rankType: string = '';
  @Input() highlight: boolean = false;
  @Input() movie: iMovie | any = {};
}
