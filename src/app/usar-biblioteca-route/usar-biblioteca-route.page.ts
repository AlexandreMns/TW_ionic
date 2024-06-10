import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Biblioteca } from '../models/Biblioteca';
import { SelecionaBibliotecaComponent } from '../seleciona-biblioteca/seleciona-biblioteca.page';
import { Output, EventEmitter } from '@angular/core';
import { Livro } from '../models/Livro';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { LivroCompleto } from '../models/LivroCompleto';
import { BookRequeste } from '../models/BookRequest';
import { CheckedOutBook } from '../models/CheckedOutBook';

@Component({
  selector: 'usar-biblioteca-route',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent
  ],
  templateUrl: './usar-biblioteca-route.page.html',
  styleUrl: './usar-biblioteca-route.page.scss'
})
export class UsarBibliotecaRouteComponent implements OnInit{
  biblioteca:Biblioteca;
  nomeLivro: string;
  erroPesquisa: string;
  request: BookRequeste
  resultadosPesquisa: Livro[];
  //imagem:Cover;
  livros: LivroCompleto[] = [];
  livro: Livro;
  userId:string='';
  userCheckout: CheckedOutBook[] = [];
  @Input('selectedLibraryId') libraryId='';
  @Output() updateBibioteca = new EventEmitter <string> ();

  constructor(private bibliotecaService: BibliotecaServiceService, private route:ActivatedRoute, private appService: AppService, private router: Router) {
    this.biblioteca = {} as Biblioteca;
    this.erroPesquisa = '';
    this.resultadosPesquisa = [];
    this.request = {} as BookRequeste;
    this.nomeLivro = '';
    this.livro = {} as Livro;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
  }

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
    this.initUserCheckout(this.userId);
  }

  private carregaLivros() {
    const id = this.route.snapshot.paramMap.get('biblioteca');
    this.bibliotecaService.getLibraryBooks(id).subscribe(
      value => this.livros = <LivroCompleto[]>value
    );
  }

  private initBiblioteca() {
    const id = this.route.snapshot.paramMap.get('biblioteca');
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  private initUserCheckout(id: string){
    this.bibliotecaService.getUserController(id).subscribe(
      value => this.userCheckout = <CheckedOutBook[]>value
    );
  }

  /*initLivro(isbn: string){
    this.bibliotecaService.getBook(isbn).subscribe(
      value => {this.livro = <Livro>value
      },
      (error: any) => {
        console.error('Error:', error);
        this.livro = {} as Livro; // Set livro to an empty object when an error occurs
      }
    );
  }*/

  associarLivro(isbn: string): void {
    return this.bibliotecaService.motorPesquisa(isbn);
  }

  getRequisitarLivro(livro: LivroCompleto){
    return this.bibliotecaService.requisitarLivro(livro);
  }

  getBiblioId(id:string){
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  onEnter(titulo: string) {
    for (let i = 0; i < this.livros.length; i++) {
      if (titulo == this.livros[i].book.title) {
        this.associarLivro(this.livros[i].book.isbn);
        this.erroPesquisa = 'ISBN válido';
      } else {
        this.erroPesquisa = 'Título inválido';
        this.livro = {} as Livro;
      }
    }
  }
  getImg(livro: LivroCompleto | Livro, tamanho: number){
    return this.bibliotecaService.getImagens(livro, tamanho);
  }

  getLivrosId(id:string){
    this.bibliotecaService.getLibraryBooks(id).subscribe(
      value => this.livros = <LivroCompleto[]>value
    );
  }
  goToDetalhes(livro: any){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/livro/'+ livro;
    this.router.navigateByUrl(url);
  }

  goToMotorPesquisa(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/pesquisa';
    this.router.navigateByUrl(url);
  }

  goToEmprestimoLivroDevolvidos(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/emprestimo/livrosDevolvidos';
    this.router.navigateByUrl(url);
  }

  goToEmprestimoLivroHistorico(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/emprestimo/livrosHistorico';
    this.router.navigateByUrl(url);
  }

  goToAdicionarLivro(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/adicionar';
    this.router.navigateByUrl(url);
  }

  goToRequisitarLivro(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/requisitados';
    this.router.navigateByUrl(url);
  }

}