import { TestBed } from '@angular/core/testing';

import { BibliotecaServiceService } from './biblioteca-service.service';

describe('BibliotecaServiceService', () => {
  let service: BibliotecaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibliotecaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
