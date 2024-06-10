import { LivroCompleto } from "./LivroCompleto";

export class Checkout {
    active: boolean;
    book: LivroCompleto;
    createTimestamp: string;
    dueDate: string;
    id: string;
    overdue: boolean;
    updateTimestamp: string;
    userId: string;
    
    constructor(active: boolean, book: LivroCompleto, createTimestamp: string, dueDate: string, id: string, overdue: boolean, updateTimestamp: string, userId: string) {
        this.active = active;
        this.book = book;
        this.createTimestamp = createTimestamp;
        this.dueDate = dueDate;
        this.id = id;
        this.overdue = overdue;
        this.updateTimestamp = updateTimestamp;
        this.userId = userId;
    }
}