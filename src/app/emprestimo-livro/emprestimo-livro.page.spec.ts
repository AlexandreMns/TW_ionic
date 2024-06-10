import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoLivroComponent } from './emprestimo-livro.page';


describe('EmprestimoLivroComponent', () => {
  let component: EmprestimoLivroComponent;
  let fixture: ComponentFixture<EmprestimoLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoLivroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmprestimoLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
