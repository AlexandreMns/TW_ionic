import { Livro } from "./Livro";
import { Biblioteca } from "./Biblioteca";
import { Autor } from "./Autor";
import { Cover } from "./Cover";

export class LivroCompleto extends Livro{
    available : number;
    library: Biblioteca; // [Biblioteca];
    book: Livro; // [Livro];
    checkedOut : number;
    override isbn: string;
    stock : number; //stock não associa 

    constructor(isbn: string, title: string, description: string, authors: [Autor], subjects: [string], subjectsPeople: [string], subjectsTimes: [string], subjectsPlaces: [string], publishDate: string, numberOfPages: number, byStatement: string, cover: Cover, library: Biblioteca, stock: number, available: number, book: Livro, checkedOut: number) {
        super(isbn, title, description, authors, subjects, subjectsPeople, subjectsTimes, subjectsPlaces, publishDate, numberOfPages, byStatement, cover);
        this.available = available;
        this.isbn = isbn;
        this.library = library;
        this.stock = stock;
        this.book = book;
        this.checkedOut = checkedOut;
    }

    public getLibrary(){
        return this.library;
    }
    
    public getAvailable(){
        return this.available;
    }

    public getBook(){
        return this.book;
    }

    public getCheckedOut(){
        return this.checkedOut;
    }

    public setLibrary(library: Biblioteca){
        this.library = library;
    }

    public setAvailable(available: number){
        this.available = available;
    }

    public setBook(book: Livro){
        this.book = book;
    }

    public setCheckedOut(checkedOut: number){
        this.checkedOut = checkedOut;
    }

    /*public toString(){
        return "LivroCompleto [isbn=" + this.isbn + ", title=" + this.title + ", description=" + this.description + ", authors=" + this.authors + ", subjects=" + this.subjects + ", subjectsPeople=" + this.subjectsPeople + ", subjectsTimes=" + this.subjectsTimes + ", subjectsPlaces=" + this.subjectsPlaces + ", publishDate=" + this.publishDate + ", numberOfPages=" + this.numberOfPages + ", byStatement=" + this.byStatement + ", cover=" + this.cover + ", library=" + this.library + ", stock=" + this.stock + ", available=" + this.available + ", book=" + this.book + ", checkedOut=" + this.checkedOut + "]";
    }*/
}