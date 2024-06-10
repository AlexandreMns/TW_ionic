import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoConfirmacaoComponent } from './emprestimo-confirmacao.page';

describe('EmprestimoConfirmacaoComponent', () => {
  let component: EmprestimoConfirmacaoComponent;
  let fixture: ComponentFixture<EmprestimoConfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoConfirmacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmprestimoConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
