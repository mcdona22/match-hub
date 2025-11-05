import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient } from '@angular/common/http';

import { teamsInterceptor } from './teams-interceptor';
import { LocalStorageDataService } from './local-storage-data-service';

describe('teamsInterceptorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => teamsInterceptor(req, next));
  let service: LocalStorageDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), LocalStorageDataService],
    });

    service = TestBed.inject(LocalStorageDataService);
  });

  fit('should be created', () => {
    expect(interceptor).withContext('changed here').toBeTruthy();
    expect(service).toBeTruthy();
    const allTeams = service.allTeams();
    console.log(`Teams in test`, allTeams);
  });
});
