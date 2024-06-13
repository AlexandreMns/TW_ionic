import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library } from './models/Library';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryServiceService {
  private server = "http://193.136.62.24";

  constructor(private http: HttpClient) { }

  getLibraries(){
    const url = this.server + '/v1/library';
    return this.http.get<Library[]>(url).pipe(
        catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getCurrentLibrary(uuid: string|null){
    const url = this.server + '/v1/library/' + uuid;
    return this.http.get<Library>(url);
  }
}
