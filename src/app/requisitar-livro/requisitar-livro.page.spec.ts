import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitarLivroComponent } from './requisitar-livro.page';

describe('RequisitarLivroComponent', () => {
  let component: RequisitarLivroComponent;
  let fixture: ComponentFixture<RequisitarLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitarLivroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequisitarLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
