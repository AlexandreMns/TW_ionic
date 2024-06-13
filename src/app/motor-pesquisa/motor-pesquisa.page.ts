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

@Component({
  selector: 'app-motor-pesquisa',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent,
    IonicModule
  ],
  templateUrl: './motor-pesquisa.page.html',
  styleUrl: './motor-pesquisa.page.scss'
})
export class MotorPesquisaComponent implements OnInit{
  biblioteca:Biblioteca;
  livros: LivroCompleto[] = [];
  livro: Livro;
  nomeLivro: string;
  erroPesquisa: string;
  resultadosPesquisa: Livro;

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
    this.initLivro();
  }

  constructor(private bibliotecaService: BibliotecaServiceService, private route:ActivatedRoute, private router: Router) {
    this.biblioteca = {} as Biblioteca;
    this.nomeLivro = '';
    this.erroPesquisa = '';
    this.resultadosPesquisa = {} as Livro;
    this.livro = {} as Livro;
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

  private initLivro(){
    const id = this.route.snapshot.paramMap.get('id');
    this.bibliotecaService.getBook(id).subscribe(
      value => this.livro = <Livro>value
    );
  }

  goToBibiloteca(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId;
    this.router.navigateByUrl(url);
  }

  getImg(livro: Livro, tamanho: number){
    return this.bibliotecaService.getImagens(livro, tamanho);
  }

  getBiblioId(id:string){
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  onEnter(titulo: string) {
    for (let i = 0; i < this.livros.length; i++) {
      if (titulo == this.livros[i].book.title) {
        this.livroISBN(this.livros[i].book.isbn);
      } else {
        this.erroPesquisa = 'Título inválido';
        this.livro = {} as Livro;
      }
    }
  }

  getLivoPesquisado(){
    return this.bibliotecaService.livroPesquisa;
  }

  livroISBN(isbn: string){
    return this.bibliotecaService.motorPesquisa(isbn);
  }
}
