import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoDetalheComponent } from './emprestimo-detalhe.page';

describe('EmprestimoDetalheComponent', () => {
  let component: EmprestimoDetalheComponent;
  let fixture: ComponentFixture<EmprestimoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmprestimoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
