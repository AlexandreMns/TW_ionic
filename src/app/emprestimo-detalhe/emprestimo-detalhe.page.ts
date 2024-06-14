import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Biblioteca } from '../models/Biblioteca';
import { Cover } from '../models/Cover';
import { OnInit } from '@angular/core';
import { LivroCompleto } from '../models/LivroCompleto';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckedOutBook } from '../models/CheckedOutBook';
import { RouterModule } from '@angular/router';
import { SelecionaBibliotecaComponent } from '../seleciona-biblioteca/seleciona-biblioteca.page';
import { Livro } from '../models/Livro';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-emprestimo-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent,
    FormsModule,
    IonicModule
  ],
  templateUrl: './emprestimo-detalhe.page.html',
  styleUrl: './emprestimo-detalhe.page.scss'
})
export class EmprestimoDetalheComponent implements OnInit{
  biblioteca:Biblioteca;
  livroCompleto: LivroCompleto;
  livros: LivroCompleto[] = [];
  livro: Livro;
  imagem: Cover;
  userCheckout: CheckedOutBook[] = [];
  userId:string='';
  selectedUser = '';
  options = [
    { label: 'Wonderful User', value: 'Wonderful User' },
    { label: 'TWAM', value: 'TWAM' },
  ];
  //@Input('selectedLivroId') livroId='';

  constructor(private bibliotecaService: BibliotecaServiceService, private route:ActivatedRoute, private appService: AppService, private router: Router) {
    this.biblioteca = {} as Biblioteca;
    this.livro = {} as Livro;
    this.livroCompleto = {} as LivroCompleto;
    this.imagem = {} as Cover;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
  }

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
    this.initLivro();
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

  private initLivro(){
    const id = this.route.snapshot.paramMap.get('id');
    this.bibliotecaService.getBook(id).subscribe(
      value => this.livro = <Livro>value
    );
  }

  goToBibiloteca(){
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId;
    this.router.navigateByUrl(url);
  }

  goToRequisitarLivro(livroIsbn: any){
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/biblio/' + biblioId + '/livro/' + livroIsbn+ '/requisitar';
    this.router.navigateByUrl(url);
  }

  goToMotorPesquisa(){
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/biblio/' + biblioId + '/pesquisa';
    this.router.navigateByUrl(url);
  }

  goToConfirmarEmprestimo(){
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/biblio/' + biblioId + '/emprestimo/livro/' + this.livro.isbn + '/confirmar';
    this.router.navigateByUrl(url);
    return this.userId;
  }

  getBiblioId(id:string){
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  getImg(livro: Livro, tamanho: number){
    return this.bibliotecaService.getImagens(livro, tamanho);
  }


  initUserCheckout(userId: string){
    this.bibliotecaService.getUserController(userId).subscribe(
      value => this.userCheckout = <CheckedOutBook[]>value
    );
  }


  updateUser(){
    this.appService.setUserId(this.selectedUser);
  }
}
