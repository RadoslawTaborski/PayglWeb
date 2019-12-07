import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLinechartComponent } from './dashboard-linechart.component';

describe('DashboardLinechartComponent', () => {
  let component: DashboardLinechartComponent;
  let fixture: ComponentFixture<DashboardLinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLinechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
