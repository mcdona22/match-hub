import { TeamService } from './team-service';
import { ITeamsRepository } from '../data/I-teams-repository';
import { TestBed } from '@angular/core/testing';
import { ITeam } from '../data/i-team';
import { TeamsRepositoryStub } from '../data/teams-repository-stub';

type TeamsRepositorySpy = jasmine.SpyObj<ITeamsRepository> & {
  readAllTeamsSpy: jasmine.Spy<ITeamsRepository['readAllTeams']>;
};

fdescribe('TeamsService', () => {
  let service: TeamService;
  let teamsRepositorySpy: TeamsRepositorySpy;

  beforeEach(async () => {
    teamsRepositorySpy = jasmine.createSpyObj<ITeamsRepository>(
      'ITeamsRepository',
      {
        readAllTeams: new Promise<ITeam[]>(() => {}),
      }, // Initialize with a placeholder Promise
    ) as TeamsRepositorySpy;

    teamsRepositorySpy.readAllTeamsSpy = teamsRepositorySpy.readAllTeams;

    TestBed.configureTestingModule({
      providers: [
        TeamService,
        // Provide our mock instance whenever TeamsRepositoryStub is requested
        { provide: TeamsRepositoryStub, useValue: teamsRepositorySpy },
      ],
    });

    service = TestBed.inject(TeamService);
  });

  it('should create the service', () => {
    teamsRepositorySpy.readAllTeams.and.returnValue(new Promise(() => {}));
    expect(service).withContext('didnt create the service').toBeTruthy();
    // const initialResponse = service.fetchTeams();
  });

  it('should immediately resolve to undefined', async () => {
    const { promise } = createControllablePromise();
    teamsRepositorySpy.readAllTeamsSpy.and.returnValue(promise);

    const response = service.fetchTeams();

    expect(response())
      .withContext('it should be immediately undefined')
      .toBeUndefined();
  });
  it('should  resolve to [] if no values available after a pause ', async () => {
    const { promise, resolve } = createControllablePromise();
    teamsRepositorySpy.readAllTeamsSpy.and.returnValue(promise);

    const response = service.fetchTeams();

    await resolve([]);

    expect(response()).withContext('expected the empty set').toEqual([]);
  });

  it('should  resolve to a populated list where available after a pause', async () => {
    const teams: ITeam[] = [{ name: 'Forest' }, { name: 'Man Utd' }];
    const { promise, resolve } = createControllablePromise();
    teamsRepositorySpy.readAllTeamsSpy.and.returnValue(promise);
    const response = service.fetchTeams();

    await resolve(teams);

    console.log(`Response data:`, response());

    expect(response()!.length)
      .withContext('expected the data set')
      .toEqual(teams.length);
  });

  const createControllablePromise = (): {
    promise: Promise<ITeam[]>;
    resolve: (value: ITeam[]) => void;
  } => {
    let resolve!: (value: ITeam[]) => void;
    const promise = new Promise<ITeam[]>((r) => {
      resolve = r;
    });
    return { promise, resolve };
  };
});
