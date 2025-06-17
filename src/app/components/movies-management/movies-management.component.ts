import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MOVIE_LIST } from '../../shared/constants/movies-mockup.constants';

@Component({
  selector: 'app-movies-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies-management.component.html',
  styleUrl: './movies-management.component.css'
})
export class MoviesManagementComponent {
  movies: any[] = [];
  filteredMovies: any[] = [];
  paginatedMovies: any[] = [];
  searchQuery: string = '';
  lastSearchQuery: string | null = null;
  isDetailsModalOpen = false;
  selectedMovie: any = null;
  isModalOpen = false;
  isEditing = false;
  currentMovie = this.getEmptyMovie();
  isDeleteModalOpen = false;

  page = 1;
  itemsPerPage = 10;
  totalPages = 1;


  constructor() {
    this.loadMovies();
  }

  getEmptyMovie() {
    return {
      id: null,
      title: '',
      category: '',
      imageUrl: ''
    };
  }

  loadMovies() {
    this.movies = MOVIE_LIST;
    
    this.applySearch();
  }

  applySearch(event?: Event) {
    event?.preventDefault();
    const query = this.searchQuery.toLowerCase();
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(query)
    );
    this.totalPages = Math.ceil(this.filteredMovies.length / this.itemsPerPage);
    this.page = 1;
    this.updatePaginatedMovies();

    // Armazenando a última busca
    if (this.searchQuery) {
      this.lastSearchQuery = this.searchQuery.trim();
    } else {
      this.lastSearchQuery = null;
    }

    this.searchQuery = '';
  }

  updatePaginatedMovies() {
    const firstMovieIndexCurrentPage = (this.page - 1) * this.itemsPerPage;
    const lastMovieIndexCurrentPage = firstMovieIndexCurrentPage + this.itemsPerPage;
    this.paginatedMovies = this.filteredMovies.slice(firstMovieIndexCurrentPage, lastMovieIndexCurrentPage);
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.updatePaginatedMovies();
    }
  }

  openDetailsModal(movie: any) {
    this.selectedMovie = movie;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal() {
    this.selectedMovie = null;
    this.isDetailsModalOpen = false;
  }

  // Captura a tecla "Esc" e fecha o modal
  @HostListener('document:keydown.escape', ['$event'])
  onEscPressed(event: KeyboardEvent) {
    this.closeDetailsModal();
    this.closeEditModal();
    this.closeDeleteModal();
  }

  openEditModal(editing = false, movie: any = null) {
    this.isEditing = editing;
    this.isModalOpen = true;
    this.currentMovie = editing ? { ...movie, category: movie.category.join(', ') } : this.getEmptyMovie();
  }

  closeEditModal() {
    this.isModalOpen = false;
  }

  addMovie() {
    const newMovie = {
      ...this.currentMovie,
      id: Date.now(),
      category: this.currentMovie.category.split(',').map((c: string) => c.trim())
    };
    this.movies.push(newMovie);
    this.applySearch();
    this.closeEditModal();
  }

  updateMovie() {
    const index = this.movies.findIndex(m => m.id === this.currentMovie.id);
    if (index > -1) {
      this.movies[index] = {
        ...this.currentMovie,
        category: this.currentMovie.category.split(',').map((c: string) => c.trim())
      };
      this.applySearch();
    }
    this.closeEditModal();
  }

  // Abrir e Fechar o Modal de Excluir
  openDeleteModal(movie: any) {
    this.selectedMovie = movie;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.selectedMovie = null;
  }

  // Deletar Filme
  deleteMovie() {
    const index = this.movies.findIndex(m => m.id === this.selectedMovie.id);
    if (index > -1) {
      this.movies.splice(index, 1);
    }
    this.closeDeleteModal();
  }

  clearSearch() {
    this.searchQuery = '';  // Limpar o campo de pesquisa
    this.lastSearchQuery = null;  // Limpar a última busca
    this.applySearch();  // Reaplicar a pesquisa com o campo vazio
  }
}
