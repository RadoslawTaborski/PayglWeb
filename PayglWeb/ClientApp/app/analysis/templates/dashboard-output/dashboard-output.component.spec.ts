import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutputComponent } from './dashboard-output.component';

describe('DashboardOutputComponent', () => {
  let component: DashboardOutputComponent;
  let fixture: ComponentFixture<DashboardOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
