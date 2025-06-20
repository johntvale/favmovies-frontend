import { ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';
import { iMovie } from '../../../interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @Input() selectedMovie: iMovie | null = null;
  @Input() isRegisterModalOpen: boolean = false;
  @Input() isEditModalOpen: boolean = false;
  @Input() closeModal: () => void = () => {};

  movieModal = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(500)
    ]),
    category: new FormControl<string[]>([], [
      Validators.required,
      Validators.minLength(1)
    ]),
    releaseDate: new FormControl(new Date(), [
      Validators.required
    ]),
    director: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(100)
    ]),
    trailerUrl: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.+')
    ]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.+')
    ]),
    cast: new FormControl<string[]>([], [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  constructor(private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.selectedMovie) {
      this.movieModal.patchValue({
        title: this.selectedMovie.title,
        description: this.selectedMovie.description,
        category: this.selectedMovie.category,
        releaseDate: new Date(this.selectedMovie.releaseDate),
        director: this.selectedMovie.director,
        trailerUrl: this.selectedMovie.trailerUrl,
        imageUrl: this.selectedMovie.imageUrl,
        cast: this.selectedMovie.cast
      });

    }
  }

  registerMovie(): void {
    this.movieService.createMovie(this.movieModal).subscribe({
      next: (response) => {
        if (response.message.includes('success')) {
          this.toastr.success('Filme adicionado com sucesso!');
          this.movieModal.reset();
          this.closeModal();
        }
      },
      error: () => {
        this.toastr.error('Erro ao adicionar filme. Tente novamente mais tarde.');
      },
    });
  }

  updateMovie(): void {
    this.movieService.updateMovie(this.movieModal).subscribe({
      next: (response) => {
        if (response.message.includes('success')) {
          this.toastr.success('Filme atualizado com sucesso!');
          this.movieModal.reset();
          this.closeModal();
        }
      },
      error: () => {
        this.toastr.error('Erro ao atualizar filme. Tente novamente mais tarde.');
      },
    });
  }

  closeFormModal() {
    this.closeModal();
    this.movieModal.reset();
  }


}
