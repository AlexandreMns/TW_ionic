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
export class AdicionarLivroComponent implements OnInit{
  livros: LivroCompleto[] = [];
  livro: Livro;
  imagem: Cover;
  x: boolean = false;
  boxValue: string = '';
  stockIsbn: number;
  mensagemErro: string = ''; 
  biblioteca:Biblioteca;
  livroISBN: string = '';
  @Output() updateLivro = new EventEmitter <string> ();
  userId:string='';
  //@Input('selectedLivroId') livroId='';
  selectedLivroId: string = '';

  constructor(private bibliotecaService: BibliotecaServiceService,private route:ActivatedRoute, private appService: AppService, private router: Router) {
    this.livro = {} as Livro;
    this.imagem = {} as Cover;
    this.livros = [];
    this.stockIsbn = 0;
    this.biblioteca = {} as Biblioteca;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
  }

  ngOnInit(): void {
    this.initBiblioteca();
    this.carregaLivros();
  }
  
  sensorEnter(event: boolean){
    if(event == true){
      this.x = true;
      return this.x;
    } else {
      this.x = false;
      return this.x;
    }
  }
  onEnter(ISBN: string  ) {
      if (this.isValidISBN(ISBN)) {
      this.livroISBN = ISBN;
      this.initLivro(this.livroISBN);
      this.mensagemErro = 'ISBN válido';
    } else {
      this.mensagemErro = 'ISBN inválido';
      this.livro = {} as Livro;
    }
  }

  isValidISBN(ISBN: string): boolean {
    // Remove espaços em branco e hifens do ISBN
    const cleanedISBN = ISBN.replace(/[^\dX]/gi, '');
  
    // Verifica se o comprimento do ISBN é válido entre 10 a 13 digiros 
    if (cleanedISBN.length !== 10 && cleanedISBN.length !== 13) {
      return false;
    }
  
    return true;
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

  initLivro(isbn: string){
    this.bibliotecaService.getBook(isbn).subscribe(
      value => {this.livro = <Livro>value
      },
      (error: any) => {
        console.error('Error:', error);
        this.livro = {} as Livro; // Set livro to an empty object when an error occurs
      }
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

  goToRequisitarLivro(livroIsbn: any){
    const biblioId = this.route.snapshot.paramMap.get('biblioteca');
    let url = '/biblio/' + biblioId + '/livro/' + livroIsbn+ '/requisitar';
    this.router.navigateByUrl(url);
  }
  
  getBiblioId(id:string){
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      value => this.biblioteca = <Biblioteca>value
    );
  }

  getImg(livro: Livro, tamanho: number){
    return this.bibliotecaService.getImagens(livro, tamanho);
  }


  // Method to handle button click (if needed)
  handleClick() {
    console.log('Box Value:', this.boxValue);
  }


  selectBook(id: string) {
    this.selectedLivroId = id;
  }

  

  /*getStockISBN(isbn: string): number {
    const livro = this.livros.find((livro: LivroCompleto) => livro.isbn === isbn);
    return livro ? livro.stock : this.stockIsbn;
  }*/
}
