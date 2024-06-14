import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Biblioteca } from '../models/Biblioteca';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-seleciona-biblioteca',
  templateUrl: './seleciona-biblioteca.page.html',
  styleUrl: './seleciona-biblioteca.page.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
})
export class SelecionaBibliotecaComponent implements OnInit{
  libraries: Biblioteca[]=[];
  @Output() updateBibioteca = new EventEmitter <string> ();

  constructor(private biblioService: BibliotecaServiceService, private router: Router ) {}

  ngOnInit(): void {
    this.biblioService.getLibraries().subscribe(value => this.libraries = value);
  }

  goToBibiloteca(biblioId: any){
    let url = '/library/' + biblioId;
    this.updateBibioteca.emit(biblioId);
    this.router.navigateByUrl(url);
  }


}
