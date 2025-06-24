import { Component, HostListener, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { iMovie, iResponseMovie, MOVIE_FORMS_TYPE } from '../../interfaces/movie.interface';
import { MovieService } from '../../services/movie.service';
import { PaginationComponent } from "../pagination/pagination.component";
import { DetailsModalComponent } from "../modals/details-modal/details-modal.component";
import { FormModalComponent } from "../modals/form-modal/form-modal.component";
import { DeleteModalComponent } from "../modals/delete-modal/delete-modal.component";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-movies-management',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, DetailsModalComponent, FormModalComponent, DeleteModalComponent, LoadingComponent],
  templateUrl: './movies-management.component.html',
  styleUrl: './movies-management.component.css'
})

export class MoviesManagementComponent {
  movies = signal<iResponseMovie['movies'] | any >([]);
  filteredMovieList: iMovie[] = [];
  filteredAndPaginatedMovieList: iMovie[] = [];
  isLoadindMovieList: boolean = false;

  searchFilter: string = '';
  lastMovieSearch: string = '';

  currentPage: number = 1;
  limitMoviesPerPage: number = 10;
  totalMovies: number = 0;
  totalPages: number = 0;

  isDetailsModalOpen: boolean = false;
  isRegisterModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  currentModalType: string = '';
  
  selectedMovie = signal<iMovie | null>(null);

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(){
    this.getMovieList()
  }
  
  getMovieList() {
    this.isLoadindMovieList = true;
    this.movieService.getMovieList().subscribe({
      next: (response: iResponseMovie) => {
        this.movies.set(response.movies);
        this.filterMovieList();
        this.isLoadindMovieList = false;
      },
      error: () => {
        this.toastr.error('Error ao iniciar lista de Filmes');
      }
    });
  }

  filterMovieList() {
    this.filteredMovieList = this.movies().filter((movie: iMovie) =>
      movie.title.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
    this.lastMovieSearch = this.searchFilter;
    this.searchFilter = '';
    this.currentPage = 1;
    this.paginateMovieList();
  }

  clearSearch() {
    this.searchFilter = '';
    this.filterMovieList();
  }

  paginateMovieList() {
    this.totalMovies = this.filteredMovieList.length;
    this.totalPages = Math.ceil(this.totalMovies / this.limitMoviesPerPage);
  
    const startIndex = (this.currentPage - 1) * this.limitMoviesPerPage;
    const endIndex = startIndex + this.limitMoviesPerPage;
  
    this.filteredAndPaginatedMovieList = this.filteredMovieList.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginateMovieList();
  }

  openModal(modalType: string, movie?: iMovie) {
    switch (modalType) {
      case MOVIE_FORMS_TYPE.DETAILS:
        this.isDetailsModalOpen = true;
        break;
        case MOVIE_FORMS_TYPE.REGISTER:
        this.currentModalType = modalType;
        this.isRegisterModalOpen = true;
        break;
        case MOVIE_FORMS_TYPE.EDIT:
        this.currentModalType = modalType;
        this.isEditModalOpen = true;
        break;
      case MOVIE_FORMS_TYPE.DELETE:
        this.isDeleteModalOpen = true;          
    }

    if (movie) {
      this.selectedMovie.set(movie);
    }
  }

  closeModal() {
    this.isDetailsModalOpen = false;
    this.isRegisterModalOpen = false;
    this.isEditModalOpen = false;
    this.isDeleteModalOpen = false;
    this.currentModalType = '';

    if (this.selectedMovie) {
      this.selectedMovie.set(null);
    }
  }

  getRowNumber(index: number): number {
    return (this.currentPage - 1) * this.limitMoviesPerPage + index + 1;
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeModal();
  }
}
