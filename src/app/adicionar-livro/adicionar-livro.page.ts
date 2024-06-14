import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Biblioteca } from '../models/Biblioteca';
import { AppService } from '../app.service';
import { Cover } from '../models/Cover';
import { LivroCompleto } from '../models/LivroCompleto';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { SelecionaBibliotecaComponent } from '../seleciona-biblioteca/seleciona-biblioteca.page';
import { Livro } from '../models/Livro';
import { IonicModule } from '@ionic/angular';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adicionar-livro',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent,
    FormsModule,
    IonicModule
  ],
  templateUrl: './adicionar-livro.page.html',
   styleUrl: './adicionar-livro.page.scss'
})
export class AdicionarLivroComponent implements OnInit {
  livros: LivroCompleto[] = [];
  livro: Livro;
  imagem: Cover;
  x: boolean = false;
  boxValue: string = '';
  stockIsbn: number = 0;
  mensagemErro: string = ''; 
  biblioteca: Biblioteca;
  livroISBN: string = '';
  @Output() updateLivro = new EventEmitter<string>();
  userId: string = '';
  selectedLivroId: string = '';

  constructor(private bibliotecaService: BibliotecaServiceService, private route: ActivatedRoute, private appService: AppService, private router: Router) {
    this.livro = {} as Livro;
    this.imagem = {} as Cover;
    this.livros = [];
    this.biblioteca = {} as Biblioteca;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
  }

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
  }

  sensorEnter(event: boolean) {
    this.x = event;
  }

  onEnter(ISBN: string, bibliotecaId: string) {
    if (this.isValidISBN(ISBN)) {
      this.livroISBN = ISBN;
      this.initLivro(this.livroISBN, bibliotecaId);
      this.mensagemErro = 'ISBN válido';
    } else {
      this.mensagemErro = 'ISBN inválido';
      this.livro = {} as Livro;
    }
  }

  isValidISBN(ISBN: string): boolean {
    const cleanedISBN = ISBN.replace(/[^\dX]/gi, '');
    return cleanedISBN.length === 10 || cleanedISBN.length === 13;
  }

  private carregaLivros() {
    const id = this.route.snapshot.paramMap.get('libraryId');
    this.bibliotecaService.getLibraryBooks(id).subscribe(
      value => this.livros = <LivroCompleto[]>value
    );
  }

  private initBiblioteca() {
    const id = this.route.snapshot.paramMap.get('libraryId');
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  initLivro(isbn: string, bibliotecaId: string) {
    this.bibliotecaService.getBook(isbn).subscribe(
      (value: Livro) => {
        this.livro = value;
      },
      (error) => {
        this.mensagemErro = 'ISBN inválido';
      }
    );
  }

  submitStock() {
    const createLibraryBookRequest = { stock: this.stockIsbn };
    this.bibliotecaService.addBookToLibrary(this.biblioteca.id, this.livroISBN, createLibraryBookRequest).subscribe(
      (response) => {
        console.log('Book added with stock:', response);
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }

  goToBibiloteca() {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    const url = '/biblio/' + biblioId;
    this.router.navigateByUrl(url);
  }

  getBiblioId(id: string) {
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  getImg(livro: Livro, tamanho: number) {
    return this.bibliotecaService.getImagens(livro, tamanho);
  }

  selectBook(id: string) {
    this.selectedLivroId = id;
  }
}