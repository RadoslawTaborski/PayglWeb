import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchematicDialogComponent } from './schematic-dialog.component';

describe('SchematicDialogComponent', () => {
    let component: SchematicDialogComponent;
    let fixture: ComponentFixture<SchematicDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SchematicDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchematicDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
