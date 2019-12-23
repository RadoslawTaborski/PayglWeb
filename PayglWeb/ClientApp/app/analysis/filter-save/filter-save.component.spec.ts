import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSaveComponent } from './filter-save.component';

describe('FilterSaveComponent', () => {
  let component: FilterSaveComponent;
  let fixture: ComponentFixture<FilterSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
