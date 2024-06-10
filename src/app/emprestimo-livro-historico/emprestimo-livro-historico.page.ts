import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Biblioteca } from '../models/Biblioteca';
import { OnInit } from '@angular/core';
import { LivroCompleto } from '../models/LivroCompleto';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckedOutBook } from '../models/CheckedOutBook';
import { RouterModule } from '@angular/router';
import { SelecionaBibliotecaComponent } from '../seleciona-biblioteca/seleciona-biblioteca.page';
import { Livro } from '../models/Livro';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-emprestimo-livro-historico',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelecionaBibliotecaComponent,
    AppComponent,
    FormsModule
  ],
  templateUrl: './emprestimo-livro-historico.page.html',
  styleUrl: './emprestimo-livro-historico.page.scss'
})
export class EmprestimoLivroHistoricoComponent implements OnInit{
  livros: LivroCompleto[] = [];
  biblioteca:Biblioteca;
  userCheckout: CheckedOutBook[] = [];
  //userCheckoutHistory: CheckedOutBook[] = [];
  livro: Livro;
  user: CheckedOutBook;
  currentDate = new Date();
  @Output() updateLivro = new EventEmitter <string> ();
  @Output() updateBibioteca = new EventEmitter <string> ();
  userId:string='';
  mensagem:string = '';
  @Input('selectedLivroId') livroId=''
  deliveryDate: Date = new Date();
  selectedUser = '';
  options = [
    { label: 'Wonderful User', value: 'Wonderful User' },
    { label: 'TWAM', value: 'TWAM' },
  ];

  constructor(private bibliotecaService: BibliotecaServiceService, private route:ActivatedRoute, private appService: AppService,private appComponent: AppComponent, private router: Router) {
    this.biblioteca = {} as Biblioteca;
    this.user = {} as CheckedOutBook;
    this.mensagem = '';
    this.livro = {} as Livro;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
  }

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
    //this.Livro();
    //this.initUserCheckout(this.userId);
  }

  updateUser(){
    this.appService.setUserId(this.selectedUser);
  }

  emprestarLivro() {
    const today = new Date();
    const deliveryMonth = today.getMonth() + 1;
    const deliveryYear = today.getFullYear();
    let nextMonth = deliveryMonth + 1;
    let nextYear = deliveryYear;
    if (nextMonth > 12) {
      nextMonth -= 12;
      nextYear += 1;
    }
    const deliveryDay = today.getDate();
    const lastDayOfMonth = new Date(nextYear, nextMonth, 0).getDate();
    const deliveryDayAdjusted = Math.min(deliveryDay, lastDayOfMonth);
    this.deliveryDate = new Date(nextYear, nextMonth - 1, deliveryDayAdjusted);

    // Destacar informações expiradas
    /*const currentDate = new Date();
    if (this.deliveryDate < currentDate) {
      // Destacar a informação para o usuário
      console.log('O prazo de entrega expirou!');
    }*/
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

  /*private Livro(){
    return this.livro;
  }*/

  initLivro(isbn: string){
    this.bibliotecaService.getBook(isbn).subscribe(
      value => this.livro = <Livro>value
    );
  }

  /*private*/ initUserCheckout(userId: string){
    this.bibliotecaService.getUserControllerHistory(userId).subscribe(
      value => this.userCheckout = <CheckedOutBook[]>value
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

  getBiblioId(id:string){
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  goToDetalhes(livro: any){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/livro/'+ livro;
    this.router.navigateByUrl(url);
  }

  goToBibiloteca(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId;
    this.router.navigateByUrl(url);
  }

  goTolivros(){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/livros';
    this.router.navigateByUrl(url);
  }
  
  /*obterNomeUsuario(nome: string) {
    const nomeArmazenado = nome
    for(let i = 0; i < this.userCheckout.length; i++){
      if (nomeArmazenado == this.userCheckout[i].userId) {
        this.userId = this.userCheckout[i].userId;
        return this.userId;
      }
    }
    return null;
  }
  
  /*definirNomeUsuario(nome: string): void {
    // Armazena o nome do usuário no armazenamento local
    localStorage.setItem('nomeUsuario', nome);
  }*/

  mostrarMensagem() {
    this.mensagem = 'O livro foi emprestado com sucesso!\nPrazo de entrega: '
  }

  getLivrosId(id:string){
    this.bibliotecaService.getLibraryBooks(id).subscribe(
      value => this.livros = <LivroCompleto[]>value
    );
  }

  getImg(livro: Livro, tamanho: number){
    return this.bibliotecaService.getImagens(livro, tamanho);
  }
}
