import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporativesComponent } from './corporatives.component';

describe('CorporativesComponent', () => {
  let component: CorporativesComponent;
  let fixture: ComponentFixture<CorporativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
