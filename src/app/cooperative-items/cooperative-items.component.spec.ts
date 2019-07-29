import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeItemsComponent } from './cooperative-items.component';

describe('CooperativeItemsComponent', () => {
  let component: CooperativeItemsComponent;
  let fixture: ComponentFixture<CooperativeItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperativeItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperativeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
