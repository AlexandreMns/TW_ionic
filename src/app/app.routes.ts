import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search',
    loadComponent: () => import('./seleciona-biblioteca/seleciona-biblioteca.page').then( m => m.SelecionaBibliotecaComponent)
  },
  {
    path: 'library/:libraryId/add',
    loadComponent: () => import('./adicionar-livro/adicionar-livro.page').then( m => m.AdicionarLivroComponent)
  },
  {
    path: 'library/:libraryId/requisitados',
    loadComponent: () => import('./requisitar-livro/requisitar-livro.page').then( m => m.RequisitarLivroComponent)
  },
  {
    path: 'library/:libraryId/search',
    loadComponent: () => import('./motor-pesquisa/motor-pesquisa.page').then( m => m.MotorPesquisaComponent)
  },
  {
    path: 'library/:libraryId/book/:id',
    loadComponent: () => import('./detalhe-livro/detalhe-livro.page').then( m => m.DetalheLivroComponent)
  },
  {
    path: 'library/:libraryId/emprestimo/livrosDevolvidos',
    loadComponent: () => import('./emprestimo-livro/emprestimo-livro.page').then( m => m.EmprestimoLivroComponent)
  },
  {
    path: 'library/:libraryId/emprestimo/livrosHistorico',
    loadComponent: () => import('./emprestimo-livro-historico/emprestimo-livro-historico.page').then( m => m.EmprestimoLivroHistoricoComponent)
  },
  {
    path: 'library/:libraryId/book/:id/confirmar',
    loadComponent: () => import('./emprestimo-confirmacao/emprestimo-confirmacao.page').then( m => m.EmprestimoConfirmacaoComponent)
  },
  {
    path: 'library/:libraryId/emprestimo/livro/:id',
    loadComponent: () => import('./emprestimo-detalhe/emprestimo-detalhe.page').then( m => m.EmprestimoDetalheComponent)
  },
  {
    path: 'library/:libraryId',
    loadComponent: () => import('./usar-biblioteca-route/usar-biblioteca-route.page').then( m => m.UsarBibliotecaRouteComponent)
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'search',
    pathMatch: 'full',
  },
];

