import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporativeComponent } from './corporative.component';

describe('CorporativeComponent', () => {
  let component: CorporativeComponent;
  let fixture: ComponentFixture<CorporativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
