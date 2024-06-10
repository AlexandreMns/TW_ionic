import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoLivroHistoricoComponent } from './emprestimo-livro-historico.page';

describe('EmprestimoLivroHistoricoComponent', () => {
  let component: EmprestimoLivroHistoricoComponent;
  let fixture: ComponentFixture<EmprestimoLivroHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoLivroHistoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmprestimoLivroHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
