import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
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
  @Input() selectedMovie!: Signal<iMovie | null>;
  @Input() closeModal: () => void = () => {};
  @Output() activatedMovieDeletion = new EventEmitter<void>();

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  closeFormModal() {
    this.closeModal();
  }

  deleteMovie() {
    console.log('Deleting movie:', this.selectedMovie());
    this.movieService.deleteMovie(this.selectedMovie()!._id!).subscribe({
      next: (response)=>{
        if (response.message.includes('success')){
          this.toastr.success('Filme excluído com sucesso!')
          this.activatedMovieDeletion.emit();
          this.closeModal();
        }
      },
      error: ()=>{
        this.toastr.error('Erro ao atualizar filme. Tente novamente mais tarde.');
      }
    });
  }

}
