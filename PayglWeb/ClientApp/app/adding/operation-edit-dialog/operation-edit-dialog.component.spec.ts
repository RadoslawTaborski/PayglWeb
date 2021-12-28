import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationEditDialogComponent } from './operation-edit-dialog.component';

describe('OperationEditDialogComponent', () => {
    let component: OperationEditDialogComponent;
    let fixture: ComponentFixture<OperationEditDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperationEditDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationEditDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
