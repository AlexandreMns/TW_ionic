import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'library',
    loadComponent: () => import('./library/library.page').then( m => m.LibraryPage)
  },
  {
    path: 'library/:id/add',
    loadComponent: () => import('./adicionar-livro/adicionar-livro.page').then( m => m.AdicionarLivroComponent)
  },
  {
    path: 'library/:id/requisitados',
    loadComponent: () => import('./requisitar-livro/requisitar-livro.page').then( m => m.RequisitarLivroComponent)
  },
  {
    path: 'library/:id/pesquisa',
    loadComponent: () => import('./motor-pesquisa/motor-pesquisa.page').then( m => m.MotorPesquisaComponent)
  },
  {
    path: 'library/:id/book/:id',
    loadComponent: () => import('./detalhe-livro/detalhe-livro.page').then( m => m.DetalheLivroComponent)
  },
  {
    path: 'library/:id/emprestimo/livrosDevolvidos',
    loadComponent: () => import('./emprestimo-livro/emprestimo-livro.page').then( m => m.EmprestimoLivroComponent)
  },
  {
    path: 'library/:id/emprestimo/livrosHistorico',
    loadComponent: () => import('./emprestimo-livro-historico/emprestimo-livro-historico.page').then( m => m.EmprestimoLivroHistoricoComponent)
  },
  {
    path: 'library/:id/book/:id/confirmar',
    loadComponent: () => import('./emprestimo-confirmacao/emprestimo-confirmacao.page').then( m => m.EmprestimoConfirmacaoComponent)
  },
  {
    path: 'library/:id/emprestimo/livro/:id',
    loadComponent: () => import('./emprestimo-detalhe/emprestimo-detalhe.page').then( m => m.EmprestimoDetalheComponent)
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

