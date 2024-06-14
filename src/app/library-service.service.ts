import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library } from './models/Library';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryServiceService {
  private server = "https://193.136.62.24";

  constructor(private http: HttpClient) { }

  getLibraries(){
    const url = this.server + '/v1/library';
    return this.http.get<Library[]>(url)
  }

  getCurrentLibrary(uuid: string|null){
    const url = this.server + '/v1/library/' + uuid;
    return this.http.get<Library>(url);
  }
}
