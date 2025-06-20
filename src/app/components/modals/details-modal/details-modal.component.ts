import { Component, Input } from '@angular/core';
import { iMovie } from '../../../interfaces/movie.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-modal',
  imports: [],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css'
})
export class DetailsModalComponent {
  @Input() selectedMovie: iMovie | null = null;
  @Input() closeModal!: () => void;

  closeDetailsModal() {
    this.closeModal();
  }
}
