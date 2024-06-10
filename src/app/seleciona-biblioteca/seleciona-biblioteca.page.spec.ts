import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionaBibliotecaComponent } from './seleciona-biblioteca.page';

describe('SelecionaBibliotecaComponent', () => {
  let component: SelecionaBibliotecaComponent;
  let fixture: ComponentFixture<SelecionaBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionaBibliotecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecionaBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
