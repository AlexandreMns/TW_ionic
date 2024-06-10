import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorPesquisaComponent } from './motor-pesquisa.page';

describe('MotorPesquisaComponent', () => {
  let component: MotorPesquisaComponent;
  let fixture: ComponentFixture<MotorPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorPesquisaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
