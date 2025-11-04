import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTile } from './contact-tile';

describe('ContactTile', () => {
  let component: ContactTile;
  let fixture: ComponentFixture<ContactTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
