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
import { CommonModule } from '@angular/common';
import { CheckedOutBook } from '../models/CheckedOutBook';
import { RouterModule } from '@angular/router';
import { SelecionaBibliotecaComponent } from '../seleciona-biblioteca/seleciona-biblioteca.page';
import { Livro } from '../models/Livro';
import { Checkout } from '../models/Checkout';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-emprestimo-confirmacao',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent,
    IonicModule
  ],
  templateUrl: './emprestimo-confirmacao.page.html',
  styleUrl: './emprestimo-confirmacao.page.scss'
})
export class EmprestimoConfirmacaoComponent implements OnInit{
  biblioteca:Biblioteca;
  livroCompleto: LivroCompleto;
  livros: LivroCompleto[] = [];
  livro: Livro;
  userCheckout: CheckedOutBook[] = [];
  imagem: Cover;
  user : CheckedOutBook;
  userId:string='';
  //@Input('selectedLivroId') livroId='';

  constructor(private bibliotecaService: BibliotecaServiceService, private route:ActivatedRoute, private appService: AppService, private router: Router){
    this.biblioteca = {} as Biblioteca;
    this.livro = {} as Livro;
    this.user = {} as CheckedOutBook;
    this.livroCompleto = {} as LivroCompleto;
    this.imagem = {} as Cover;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
  }

  ngOnInit(): void {
    this.carregaLivros();
    this.initBiblioteca();
    this.initLivro();
    //this.getUserCheckout();
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

  formatarTimestamp(timestamp: string): string {
    const data = new Date(timestamp);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; 
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();

    const dataFormatada = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    const horaFormatada = `${hora < 10 ? '0' + hora : hora}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

    return `${dataFormatada} ${horaFormatada}`;
  }

  goToBibiloteca(){
    const biblioId = this.route.snapshot.paramMap.get('libraryId');
    let url = '/library/' + biblioId;
    this.router.navigateByUrl(url);
  }

  getBiblioId(id:string){
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  initUserCheckout(userId: string){
    this.bibliotecaService.getUserController(userId).subscribe(
      value => this.userCheckout = <CheckedOutBook[]>value
    );
  }

  getImg(livro: Livro, tamanho: number){
    return this.bibliotecaService.getImagens(livro, tamanho);
  }

  /*getUserCheckout(){
    for(let i = 0; i < this.userCheckout.length; i++){
      if(this.userCheckout[i].bookId == this.livro.isbn){
        this.user = this.userCheckout[i];
      }
    }
    console.log("User not found")
    return null;
  }*/
}
