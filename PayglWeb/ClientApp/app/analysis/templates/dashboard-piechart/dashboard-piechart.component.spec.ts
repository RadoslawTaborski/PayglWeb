import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPiechartComponent } from './dashboard-piechart.component';

describe('DashboardPiechartComponent', () => {
  let component: DashboardPiechartComponent;
  let fixture: ComponentFixture<DashboardPiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
