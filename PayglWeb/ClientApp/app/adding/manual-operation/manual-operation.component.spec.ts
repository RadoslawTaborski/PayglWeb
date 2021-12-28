import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualOperationComponent } from './manual-operation.component';

describe('ManualOperationComponent', () => {
    let component: ManualOperationComponent;
    let fixture: ComponentFixture<ManualOperationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManualOperationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManualOperationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
