import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeLoansComponentComponent } from './cooperative-loans-component.component';

describe('CooperativeLoansComponentComponent', () => {
  let component: CooperativeLoansComponentComponent;
  let fixture: ComponentFixture<CooperativeLoansComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperativeLoansComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperativeLoansComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
