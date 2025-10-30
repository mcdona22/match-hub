import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsList } from './teams-list';
import { DebugElement, inputBinding, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TeamService } from '../../application/team-service';
import { ITeam } from '../../data/i-team';

type TeamsServiceSpy = jasmine.SpyObj<TeamService>;

describe('TeamsList', () => {
  let component: TeamsList;
  let fixture: ComponentFixture<TeamsList>;
  let debugElement: DebugElement;
  let teamServiceSpy: TeamsServiceSpy;
  let teamsInput: ITeam[];

  beforeEach(async () => {
    // teamsInput = [{ name: 'Forest' }];
    // await TestBed.configureTestingModule({
    //   imports: [TeamsList, TeamsList],
    // }).compileComponents();
    // fixture = TestBed.createComponent(TeamsList, {
    //   bindings: [inputBinding('teams', signal([]))],
    // });
    //
    // component = fixture.componentInstance;
    // debugElement = fixture.debugElement;
    // // fixture.componentRef.setInput('teams', teamsInput);
    // fixture.detectChanges();
    // await fixture.whenStable();
  });

  it('should create', async () => {
    const someTeamsCss = '.data-team-list';
    await setupComponent();

    // fixture.detectChanges();
    // await fixture.whenStable();

    expect(component).toBeTruthy();

    const teamList = debugElement.query(By.css(someTeamsCss));

    expect(teamList).withContext('couldnt find the teams div').toBeTruthy();
  });

  it('should show some teams when they are available', async () => {
    const noTeamsCss = '.data-no-teams';
    const someTeamsCss = '.data-team-list';

    teamsInput = [{ name: 'Forest' }];
    await setupComponent(teamsInput);
    const noTeams = debugElement.query(By.css(noTeamsCss));
    const someTeams = debugElement.query(By.css(someTeamsCss));
    expect(noTeams).withContext('expected no teams not visible').toBeFalsy();
    expect(someTeams).withContext('expected teams to be visible').toBeTruthy();
    console.log(`Teams`, someTeams.nativeElement.innerText);
  });

  it('if the teams list is empty then the message is shown only', async () => {
    const noTeamsCss = '.data-no-teams';
    const someTeamsCss = '.data-team-list';

    teamsInput = [];
    await setupComponent(teamsInput);
    const noTeams = debugElement.query(By.css(noTeamsCss));
    const someTeams = debugElement.query(By.css(someTeamsCss));
    expect(noTeams).withContext('expected no teams to be visible').toBeTruthy();
    console.log(`message`, noTeams.nativeElement.innerText);
  });

  const setupComponent = async (teams?: ITeam[]) => {
    await TestBed.configureTestingModule({
      imports: [TeamsList, TeamsList],
    }).compileComponents();
    fixture = TestBed.createComponent(TeamsList, {
      bindings: [inputBinding('teams', signal(teams ?? []))],
    });

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    await fixture.whenStable();
  };
});
