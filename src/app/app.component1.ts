import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SelecionaBibliotecaComponent } from './seleciona-biblioteca/seleciona-biblioteca.page';
import { HttpClientModule } from '@angular/common/http';
import { BibliotecaServiceService } from './biblioteca-service.service';
import { UsarBibliotecaRouteComponent } from './usar-biblioteca-route/usar-biblioteca-route.page';
import { DetalheLivroComponent } from './detalhe-livro/detalhe-livro.page';
import {EmprestimoLivroComponent} from './emprestimo-livro/emprestimo-livro.page';

import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    UsarBibliotecaRouteComponent,
    DetalheLivroComponent,
    EmprestimoLivroComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
    BibliotecaServiceService,
    AppService
  ],
})
export class AppComponent {
  title = 'biblioteca-client';
  selectedUser = '';
  options = [
    { label: 'Wonderful User', value: 'Wonderful User' },
    { label: 'TWAM', value: 'TWAM' }
  ];

  constructor(private appService: AppService) { }

  updateUser(){
    this.appService.setUserId(this.
    selectedUser
    );
  }

}
