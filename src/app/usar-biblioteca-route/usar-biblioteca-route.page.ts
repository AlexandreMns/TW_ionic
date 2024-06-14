import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Biblioteca } from '../models/Biblioteca';
import { SelecionaBibliotecaComponent } from '../seleciona-biblioteca/seleciona-biblioteca.page';
import { Livro } from '../models/Livro';
import { LivroCompleto } from '../models/LivroCompleto';
import { BookRequeste } from '../models/BookRequest';
import { CheckedOutBook } from '../models/CheckedOutBook';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-usar-biblioteca-route',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent,
    IonicModule,
    FormsModule
  ],
  templateUrl: './usar-biblioteca-route.page.html',
  styleUrls: ['./usar-biblioteca-route.page.scss']
})
export class UsarBibliotecaRouteComponent implements OnInit {
  biblioteca: Biblioteca;
  nomeLivro: string;
  erroPesquisa: string;
  request: BookRequeste;
  possibleMatches: Livro[];
  resultadosPesquisa: Livro[];
  filteredLivros: { book: Livro, stock: number }[] = [];
  livros: LivroCompleto[] = [];
  livro: Livro;
  userId: string = '';
  boxValue: string = '';
  userCheckout: CheckedOutBook[] = [];
  @Output() updateBibioteca = new EventEmitter<string>();

  constructor(
    private bibliotecaService: BibliotecaServiceService,
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {
    this.biblioteca = {} as Biblioteca;
    this.erroPesquisa = '';
    this.possibleMatches = [];
    this.resultadosPesquisa = [];
    this.request = {} as BookRequeste;
    this.nomeLivro = '';
    this.livro = {} as Livro;
    this.appService.getUserId.subscribe(result => this.userId = result);
  }

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
    this.initUserCheckout(this.userId);
  }

  private carregaLivros() {
    const id = this.route.snapshot.paramMap.get('libraryId');
    console.log(id);
    this.bibliotecaService.getLibraryBooks(id).subscribe(
      value => {
        this.livros = <LivroCompleto[]>value;
        this.filteredLivros = this.livros; // Initialize filteredLivros with all books
      }
    );
  }

  private initBiblioteca() {
    const id = this.route.snapshot.paramMap.get('libraryId');
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
    console.log(id);
  }

  private initUserCheckout(id: string) {
    this.bibliotecaService.getUserController(id).subscribe(
      value => this.userCheckout = <CheckedOutBook[]>value
    );
  }

  associarLivro(isbn: string): void {
    return this.bibliotecaService.motorPesquisa(isbn);
  }

  getRequisitarLivro(livro: LivroCompleto) {
    return this.bibliotecaService.requisitarLivro(livro);
  }

  handleClick() {
    console.log('Box Value:', this.boxValue);
  }

  getBiblioId(id: string) {
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  onInputChange(titulo: string) {
    if (titulo) {
      const regex = new RegExp(titulo, 'i'); // 'i' flag for case-insensitive matching
      this.filteredLivros = this.livros.filter(livro => regex.test(livro.book.title));

      if (this.filteredLivros.length === 0) {
        this.erroPesquisa = 'Título inválido';
      } else {
        this.erroPesquisa = '';
      }
    } else {
      this.filteredLivros = this.livros;
      this.erroPesquisa = '';
    }
  }

  onEnter(titulo: string) {
    if (this.filteredLivros.length === 1) {
      this.goToDetalhes(this.filteredLivros[0].book.isbn);
    } else if (this.filteredLivros.length > 1) {
      this.router.navigate(['/motor-pesquisa'], { queryParams: { query: titulo } });
    } else {
      this.erroPesquisa = 'Título inválido';
    }
  }

  getImg(livro: LivroCompleto | Livro, tamanho: number) {
    return this.bibliotecaService.getImagens(livro, tamanho);
  }

  getLivrosId(id: string) {
    this.bibliotecaService.getLibraryBooks(id).subscribe(
      value => this.livros = <LivroCompleto[]>value
    );
  }

  goToDetalhes(livro: any) {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId + '/book/' + livro;
    this.router.navigateByUrl(url);
  }
  /*
  goToMotorPesquisa() {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId + '/search';
    this.router.navigateByUrl(url);
  }*/

  goToEmprestimoLivroDevolvidos() {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId + '/emprestimo/livrosDevolvidos';
    this.router.navigateByUrl(url);
  }

  goToEmprestimoLivroHistorico() {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId + '/emprestimo/livrosHistorico';
    this.router.navigateByUrl(url);
  }

  goToAdicionarLivro() {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId + '/add';
    this.router.navigateByUrl(url);
  }

  goToRequisitarLivro() {
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId + '/requisitados';
    this.router.navigateByUrl(url);
  }
}
