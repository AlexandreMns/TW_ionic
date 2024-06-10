import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsarBibliotecaRouteComponent } from './usar-biblioteca-route.page';

describe('UsarBibliotecaRouteComponent', () => {
  let component: UsarBibliotecaRouteComponent;
  let fixture: ComponentFixture<UsarBibliotecaRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsarBibliotecaRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsarBibliotecaRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
