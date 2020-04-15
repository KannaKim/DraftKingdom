import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftKingdomMainComponent } from './draft-kingdom-main.component';

describe('DraftKingdomMainComponent', () => {
  let component: DraftKingdomMainComponent;
  let fixture: ComponentFixture<DraftKingdomMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftKingdomMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftKingdomMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
