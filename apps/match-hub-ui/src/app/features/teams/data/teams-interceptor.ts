import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageDataService } from './local-storage-data-service';
import { of } from 'rxjs';
import { TEAMS_URL } from './teams-repository-http';
import { ITeam } from './i-team';

export const teamsInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(LocalStorageDataService);
  const isTeamsUrl = req.url.includes(TEAMS_URL);
  const regex = /\/api\/teams(?:\/(.+?))?(?:\?|$)/;
  const match = req.url.match(regex);
  match?.forEach((match) => console.log(`Inner match`, match));

  if (match && !match[1] && req.method == 'GET') {
    console.log(`teamsInterceptor: intercepted ${req.method}`, req.url);
    const data = storageService.allTeams();
    const response = new HttpResponse({
      status: 200,
      body: data,
      url: req.url,
    });

    return of(response);
  }

  if (match && !match[1] && req.method == 'POST') {
    const partialTeam = req.body as Partial<ITeam>;
    // const partial = JSON.parse(body) as Partial<ITeam>;

    const writtenTeam = storageService.addTeam(partialTeam);
    console.log(`written team`, writtenTeam);
    const response = new HttpResponse({
      status: 201,
      body: writtenTeam,
      url: req.url,
    });

    return of(response);
  }

  if (match && match[1] && req.method == 'GET') {
    const teamId = match[1];
    console.log(`fetching from api/teams/${teamId}`);
    const data = storageService.findTeam(teamId);
    console.log(`Found team`, data);
    let response: HttpResponse<any>;
    if (data) {
      response = new HttpResponse({
        status: 200,
        body: data,
        url: req.url,
      });
    } else {
      response = new HttpResponse({
        status: 404,
      });
    }
    return of(response);
  }

  return next(req);
};
