import { TestBed } from '@angular/core/testing';

import { TeamsRepositoryStub } from './teams-repository-stub';

describe('TeansRepository', () => {
  let service: TeamsRepositoryStub;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsRepositoryStub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
