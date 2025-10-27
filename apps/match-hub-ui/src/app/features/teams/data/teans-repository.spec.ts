import { TestBed } from '@angular/core/testing';

import { TeamsRepository } from './teams-repository';

describe('TeansRepository', () => {
  let service: TeamsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
