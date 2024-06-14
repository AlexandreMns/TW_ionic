import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Biblioteca } from './models/Biblioteca';
import { LivroCompleto } from './models/LivroCompleto';
import { Livro } from './models/Livro';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cover } from './models/Cover';
import { CheckedOutBook } from './models/CheckedOutBook';
import { Checkout } from './models/Checkout';


@Injectable({
  providedIn: 'root'
})
export class BibliotecaServiceService {
  private servidor = "https://193.136.62.24";
  requisitados: Livro[] = [];
  livroPesquisa: Livro[] = [];
  deliveryDate: Date = new Date();
  private livrosSubject = new BehaviorSubject<Livro[]>([]);
  livros$: Observable<Livro[]> = this.livrosSubject.asObservable();
  libraryId: string | null = "";

  constructor(private http: HttpClient) {
  }

  getLibraries(){
    const url = this.servidor+'/v1/library';
    return this.http.get<Biblioteca[]>(url);
  }

  getCurrentLibrary(uuid: string|null ){
    const url = this.servidor+'/v1/library/' + uuid;
    return this.http.get<Biblioteca>(url);
  }

  public checkOutBook(isbn: string, userId: string, bibliotecaId: string | null): Observable<any> {
    const url = this.servidor +'/v1/library/'+bibliotecaId+'/book/'+ isbn+'/checkout?userId='+ userId;
    return this.http.post(url, {});
  }

  public checkInBook(isbn: string, userId: string, bibliotecaId: string | null): Observable<any> {
    const url = this.servidor+'/v1/library/'+bibliotecaId+'/book/'+isbn+'/checkin?userId='+ userId;
    return this.http.post(url, {});
  }

  public addBookToLibrary(bibliotecaId: string, isbn: string, createLibraryBookRequest: any): Observable<any> {
    const url = this.servidor+'/v1/library/'+bibliotecaId+'/book/'+ isbn;
    return this.http.post(url, createLibraryBookRequest);
  }

  public updateBookStock(bibliotecaId: string, isbn: string, updateLibraryBookRequest: any): Observable<any> {
    const url = this.servidor+'/v1/library/'+bibliotecaId+'/book/'+ isbn;
    return this.http.put(url, updateLibraryBookRequest);
  }


  public getLibraryBooks(uuid: string|null){
    const url = this.servidor+'/v1/library/' + uuid + '/book';
    return this.http.get<LivroCompleto[]>(url);
  }

  public getUserController(uuid: string|null){
    const url = this.servidor+'/v1/user/checked-out?userId=' + uuid;
    return this.http.get<CheckedOutBook[]>(url);
  }

  public getUserControllerHistory(uuid: string|null){
    const url = this.servidor+'/v1/user/checkout-history?userId=' + uuid;
    return this.http.get<CheckedOutBook[]>(url);
  }

  public getCover(uuid: string|null){
    const url = this.servidor+'/v1/assets/cover/' + uuid + '-M.jpg';
    return this.http.get<Cover>(url);
  }

  public getBook(uuid: string|null){
    const url = this.servidor+'/v1/book/' + uuid;
    return this.http.get<LivroCompleto>(url);
  }

  /*public getCheckout(uuid: string|null, isbn: string|null){
    const url = this.servidor+'/v1/library/' + uuid + '/book/' + isbn + '/checkout';
    return this.http.post<Checkout>(url);
  }*/

  removerLivro(isbn: string | null, uuid: string | null){
    const url = this.servidor+'/v1/library/' + uuid + '/book/' + isbn;
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
  });
    return this.http.put(url,'{"stock": 0}',  { headers: httpHeaders });
  }

  public getImagens(livro: LivroCompleto | Livro, tamanho: number){
    if (!livro) return null;
    let original: string;
    switch (tamanho) {
      case 0:
        original = (livro as LivroCompleto).book?.cover?.smallUrl || (livro as Livro).cover?.smallUrl;
        break;
      case 1:
        original = (livro as LivroCompleto).book?.cover?.mediumUrl || (livro as Livro).cover?.mediumUrl;
        break;
      case 2:
        original = (livro as LivroCompleto ).book?.cover?.largeUrl || (livro as Livro).cover?.largeUrl;
        break;
      default:
        return null;
    }
    if (original != null || original!= undefined) {
      let replaceString = original.replace("/api", this.servidor);
      return replaceString;
    } else {
      return original = '';
    }
  }

  public requisitarLivro(livro: LivroCompleto) {
    if (livro.stock > 0) {
        const isLivroRequisitado = this.requisitados.some(req => req.isbn === livro.isbn);
        if (!isLivroRequisitado) {
          livro.stock--;
          alert("Livro requisitado: " + livro.book.title);
          this.getBook(livro.isbn).subscribe(requisitado => {
            this.requisitados.push(requisitado);
            const date = new Date();
            const deliveryMonth = date.getMonth() + 1;
            const deliveryYear = date.getFullYear();
            let nextMonth = deliveryMonth + 1;
            let nextYear = deliveryYear;
            if (nextMonth > 12) {
              nextMonth -= 12;
              nextYear += 1;
            }
            const deliveryDay = date.getDate();
            const lastDayOfMonth = new Date(nextYear, nextMonth, 0).getDate();
            const deliveryDayAdjusted = Math.min(deliveryDay, lastDayOfMonth);
            this.deliveryDate = new Date(nextYear, nextMonth - 1, deliveryDayAdjusted);
          });
        } else {
          alert(livro.book.title + " já está a ser requisitado.");
        }
      }else {
      alert("Stock do livro '" + livro.title + "' indisponível.");
      }
  }

  public motorPesquisa(isbn: string){
    this.getBook(isbn).subscribe(pesquisado => {
      this.livroPesquisa = [];
      this.livroPesquisa.push(pesquisado)
    });
  } 
}
