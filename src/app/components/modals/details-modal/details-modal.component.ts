import { Component, Input, Signal } from '@angular/core';
import { iMovie } from '../../../interfaces/movie.interface';


@Component({
  selector: 'app-details-modal',
  imports: [],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css'
})
export class DetailsModalComponent {
  @Input() selectedMovie!: Signal<iMovie | null>;
  @Input() closeModal!: () => void;

  closeDetailsModal() {
    this.closeModal();
  }
}
