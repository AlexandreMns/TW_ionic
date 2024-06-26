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
import { LibraryServiceService } from '../library-service.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-detalhe-livro',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent,
    IonicModule,
    FormsModule
  ],
  templateUrl: './detalhe-livro.page.html',
  styleUrl: './detalhe-livro.page.scss'
})
export class DetalheLivroComponent implements OnInit {
  livros: LivroCompleto[] = [];
  livroCompleto: LivroCompleto;
  livro: Livro;
  stockIsbn: number = 0;
  imagem: Cover;
  removidos: LivroCompleto[] = [];
  biblioteca: Biblioteca;
  requisitados: Livro[] = [];
  @Output() updateLivro = new EventEmitter<string>();
  userId: string = '';

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
    this.initLivro();
    console.log(this.userId);
  }

  constructor(
    private bibliotecaService: BibliotecaServiceService,
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router,
    private libraryService: LibraryServiceService
  ) {
    this.biblioteca = {} as Biblioteca;
    this.livro = {} as Livro;
    this.livroCompleto = {} as LivroCompleto;
    this.imagem = {} as Cover;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
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

  private initLivro() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bibliotecaService.getBook(id).subscribe(
      value => this.livro = <Livro>value
    );
  }

  goToBibiloteca() {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId;
    this.router.navigateByUrl(url);
  }

  goToRequisitarLivro(livroIsbn: any) {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/biblio/' + biblioId + '/livro/' + livroIsbn + '/requisitar';
    this.router.navigateByUrl(url);
  }

  goToEmprestimoDetalhe(livroIsbn: any) {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/biblio/' + biblioId + '/emprestimo/livro/' + livroIsbn;
    this.router.navigateByUrl(url);
  }

  getBiblioId(id: string) {
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  updateStock(livro: LivroCompleto) {
    const updateLibraryBookRequest = { stock: this.stockIsbn };
    this.bibliotecaService.updateBookStock(this.biblioteca.id, livro.isbn, updateLibraryBookRequest).subscribe(
      value => this.livroCompleto = <LivroCompleto>value
    );
  }

  getRequisitarLivro(livro: LivroCompleto) {
    const bibliotecaId = this.route.snapshot.paramMap.get('libraryId');
    this.bibliotecaService.checkOutBook(livro.isbn, this.userId, bibliotecaId).subscribe(
      (response) => {
        console.log('Book checked out:', response);
        alert('Livro requisitado com sucesso!');
      },
      (error) => {
        console.error('Error checking out book:', error);
        alert('Erro ao requisitar o livro. Por favor, tente novamente.');
      }
    );
  }

  removerLivro(isbn: string | null) {
    alert("Removendo livro com ISBN: " + isbn);
    this.bibliotecaService.removerLivro(isbn, this.biblioteca.id).subscribe(
      () => {
        this.livro;
        alert("Livro removido com sucesso!");
      }, 
      error => {
        if (error == 404) {
          alert("Tem livros emprestados impossíveis de remover");
        }
      }
    );
  }

  getImg(livro: Livro, tamanho: number) {
    return this.bibliotecaService.getImagens(livro, tamanho);
  }

  checkOutBook(livro: Livro): void {
    const confirmation = confirm('Você tem certeza que quer requisitar este livro?');
    if (confirmation) {
      this.bibliotecaService.checkOutBook(livro.isbn, this.userId, this.biblioteca.id).subscribe(
        () => {
          alert(`Livro requisitado com sucesso!\nISBN do livro: ${livro.isbn}+\nNome do usuário: +${this.userId}`);
        },
        error => {
          alert('Erro ao requisitar o livro. Por favor, tente novamente.');
          console.error('Erro ao requisitar o livro:', error);
        }
      );
    }
  }
}
