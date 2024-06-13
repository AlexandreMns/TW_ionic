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
import { CheckedOutBook } from '../models/CheckedOutBook';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-requisitar-livro',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent,
    IonicModule
  ],
  templateUrl: './requisitar-livro.page.html',
  styleUrl: './requisitar-livro.page.scss'
})
export class RequisitarLivroComponent implements OnInit{
  livros: LivroCompleto[] = [];
  livro: Livro;
  imagem: Cover;
  currentDate: Date = new Date();
  devolverData: Date = new Date();
  userCheckout: CheckedOutBook[] = [];
  livrosRequisitados: Livro[];
  biblioteca:Biblioteca;
  @Output() updateLivro = new EventEmitter <string> ();
  userId:string='';
  @Input('selectedLivroId') livroId='';

  constructor(private bibliotecaService: BibliotecaServiceService, private route:ActivatedRoute, private appService: AppService, private router: Router) {
    this.livro = {} as Livro;
    this.imagem = {} as Cover;
    this.userCheckout = [];
    this.livrosRequisitados = [];
    this.biblioteca = {} as Biblioteca;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
   }

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
    //this.initLivro();
  }

  goToDetalhes(livro: any){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/livros/'+ livro;
    this.router.navigateByUrl(url);
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

  /*private initLivro(){
    const id = this.route.snapshot.paramMap.get('id');
    this.bibliotecaService.getBook(id).subscribe(
      value => this.livro = <Livro>value
    );
  }*/

  getLivrosId(id:string){
    this.bibliotecaService.getLibraryBooks(id).subscribe(
      value => this.livros = <LivroCompleto[]>value
    );
  }

  getBiblioId(id:string){
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }
  goToBibiloteca(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId;
    this.router.navigateByUrl(url);
  }

  goToMotorPesquisa(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/pesquisa';
    this.router.navigateByUrl(url);
  }

  initUserCheckout(userId: string){
    this.bibliotecaService.getUserController(userId).subscribe(
      value => this.userCheckout = <CheckedOutBook[]>value
    );
  }

  //meter por id do user 
  getRequiredBook(){
    return this.bibliotecaService.requisitados;
  }

  getImg(livro: LivroCompleto | Livro, tamanho: number){
    return this.bibliotecaService.getImagens(livro, tamanho);
  }

  getDataRequesitados(){
    this.devolverData = this.bibliotecaService.deliveryDate;
    return this.bibliotecaService.deliveryDate;
  }
}
