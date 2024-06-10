import { Livro } from "./Livro";
import { LocalTime } from "./LocalTime";

export class CheckedOutBook {
    active: boolean;
    book: Livro;
    bookId: string;
    createTimestamp: string;
    dueDate: string;
    id: string;
    libraryAdress: string;
    libraryCloseTime: LocalTime;
    libraryId: string;
    libraryName: string;
    libraryOpenTime: LocalTime;
    updateTimestamp: string;
    userId: string;

    constructor(active: boolean, book: Livro, bookId: string, createTimestamp: string, dueDate: string, id: string, libraryAdress: string, libraryCloseTime: LocalTime, libraryId: string, libraryName: string, libraryOpenTime: LocalTime, updateTimestamp: string, userId: string) {
        this.active = active;
        this.book = book;
        this.bookId = bookId;
        this.createTimestamp = createTimestamp;
        this.dueDate = dueDate;
        this.id = id;
        this.libraryAdress = libraryAdress;
        this.libraryCloseTime = libraryCloseTime;
        this.libraryId = libraryId;
        this.libraryName = libraryName;
        this.libraryOpenTime = libraryOpenTime;
        this.updateTimestamp = updateTimestamp;
        this.userId = userId;
    }
}
