import { Component, Input } from '@angular/core';
import { iMovie } from '../../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  @Input() isDeleteModalOpen: boolean = false;
  @Input() selectedMovie: iMovie | null = null;
  @Input() closeModal: () => void = () => {};

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  closeDeleteModal() {
    this.closeModal();
  }

  deleteMovie() {
    console.log('Deleting movie:', this.selectedMovie);
  }

}
