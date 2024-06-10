import { Autor } from "./Autor";
import { Cover } from "./Cover";

export class Livro {
    isbn:string;
    title:string;
    description:string;
    authors: [Autor];
    subjects: [string];
    subjectsPeople: [string];
    subjectsTimes: [string];
    subjectsPlaces: [string];
    publishDate:string;
    numberOfPages:number;
    byStatement:string;
    cover: Cover;

    constructor(isbn: string, title: string, description: string, authors: [Autor], subjects: [string], subjectsPeople: [string], subjectsTimes: [string], subjectsPlaces: [string], publishDate: string, numberOfPages: number, byStatement: string, cover: Cover) {
        this.isbn = isbn;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.subjects = subjects;
        this.subjectsPeople = subjectsPeople;
        this.subjectsTimes = subjectsTimes;
        this.subjectsPlaces = subjectsPlaces;
        this.publishDate = publishDate;
        this.numberOfPages = numberOfPages;
        this.byStatement = byStatement;
        this.cover = cover;
    }
    // Add no adicionar-livros para meter o stock do livrp
    
}