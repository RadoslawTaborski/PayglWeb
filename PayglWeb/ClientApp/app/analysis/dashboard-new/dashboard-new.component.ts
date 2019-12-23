import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { IFilter } from '../../entities/entities';

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {
    @Input() visible: boolean
    @Output() finishedOutput = new EventEmitter<string>();

    filter: IFilter

    isLoaded: boolean = false;
    name: string = "";

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    ngOnInit() {
        this.isLoaded = true;
    }

    ngOnChanges() {
        this.isLoaded = true;
    }

    close() {
        this.emitOutput()
    }

    emitOutput() {
        console.log("emited: finished")
        this.finishedOutput.emit(this.name);
    }

    async select() {
        this.isLoaded = false;
        this.isLoaded = true
        this.emitOutput()
    }
}
