import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSummaryView } from './team-summary-view';

describe('TeamSummaryView', () => {
  let component: TeamSummaryView;
  let fixture: ComponentFixture<TeamSummaryView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSummaryView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSummaryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
