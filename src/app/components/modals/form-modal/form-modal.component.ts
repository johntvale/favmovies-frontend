import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective } from 'ngx-mask';
import { iMovie } from '../../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie.service';
import { isCategoryValid } from '../../../utils/validations.util';
import { formatDateToDashBr, inputListFormatter } from '../../../utils/formatter.util';

@Component({
  selector: 'app-form-modal',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @Input() selectedMovie!: Signal<iMovie | null>;
  @Input() closeModal: () => void = () => {};
  @Input() currentModalType: string = '';
  @Output() activatedMovieForm = new EventEmitter<void>();

  spanValidCategories = false

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
    category: new FormControl<string[] | any>([], [
      Validators.required,
      Validators.minLength(1)
    ]),
    releaseDate: new FormControl<string>('', [
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
    cast: new FormControl<string[] | any>([], [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  constructor(private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.currentModalType === 'REGISTER') {
      this.movieModal.reset();
    }
    if (this.currentModalType === 'EDIT'){
      this.initializeEditForms();
    }
  }

  initializeEditForms() {
    this.movieModal.patchValue({
      ...this.selectedMovie(),
      category: this.selectedMovie()!.category.join(', '),
      cast: this.selectedMovie()!.cast?.join(', '),
    });
  }

  registerMovie(): void {
    if (!isCategoryValid(this.movieModal.value.category)) {
      this.toastr.warning(
        `Uma ou mais Categorias <strong>inválidas</strong>. Clique no ícone de <strong>Ajuda</strong> para verificar as Categorias válidas.`
      );
    } else {
      this.movieModal.value.category = inputListFormatter(this.movieModal.value.category);
      this.movieModal.value.cast = inputListFormatter(this.movieModal.value.cast);
      this.movieModal.value.releaseDate = formatDateToDashBr(this.movieModal.value.releaseDate!);
      
      this.movieService.createMovie(this.movieModal.value as iMovie).subscribe({
        next: (response) => {
          if (response.message.includes('success')) {
            this.movieModal.reset();
            this.closeModal();
            this.activatedMovieForm.emit();
            this.toastr.success('Filme adicionado com sucesso!');
          }
        },
        error: () => {
          this.toastr.error('Erro ao adicionar filme. Tente novamente mais tarde.');
        }
      });
    }
  }

  updateMovie(): void {
    if (!isCategoryValid(this.movieModal.value.category)) {
      this.toastr.warning(
        `Uma ou mais Categorias <strong>inválidas</strong>. Clique no ícone de <strong>Ajuda</strong> para verificar as Categorias válidas.`
      );
    } else {
      this.movieModal.value.category = inputListFormatter(this.movieModal.value.category);
      this.movieModal.value.cast = inputListFormatter(this.movieModal.value.cast);
      this.movieModal.value.releaseDate = formatDateToDashBr(this.movieModal.value.releaseDate!);

      console.log('formulário atual: ', this.movieModal.value)
      this.movieService.updateMovie(this.movieModal.value as iMovie, this.selectedMovie()!._id!).subscribe({
        next: (response) => {
          if (response.message.includes('success')) {
            this.toastr.success('Filme atualizado com sucesso!');
            this.movieModal.reset();
            this.activatedMovieForm.emit();
            this.closeModal();
          }
        },
        error: () => {
          this.toastr.error('Erro ao atualizar filme. Tente novamente mais tarde.');
        },
      });
    }
  }

  onClickValidSpanCategories() {
    this.spanValidCategories = !this.spanValidCategories;
  }

  closeFormModal() {
    this.currentModalType = '';
    this.closeModal();
    this.movieModal.reset();
  }
}