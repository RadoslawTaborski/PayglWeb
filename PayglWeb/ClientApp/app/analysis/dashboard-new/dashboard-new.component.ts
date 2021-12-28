import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { IFilter, DashboardFilterRelation, Filter, Dashboard } from '../../entities/entities';
import { Message, MessageType } from '../templates/message/Message';

@Component({
    selector: 'app-dashboard-new',
    templateUrl: './dashboard-new.component.html',
    styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {
    @Input() visible: boolean
    @Input() allDashboards: IFilter[]
    @Output() finishedOutput = new EventEmitter<string>();

    filter: IFilter

    isLoaded: boolean = false;
    name: string = "";
    infoMessage: Message;
    showInfo: boolean;

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    ngOnInit() {
        this.isLoaded = true;
    }

    ngOnChanges() {
        this.isLoaded = true;
    }

    close() {
        this.emitOutput(undefined)
    }

    nameIsUsed(name: string): boolean {
        return this.allDashboards.map(m => m.Name).includes(name)
    }

    emitOutput(name?: string) {
        //console.log("emited: finished")
        this.finishedOutput.emit(name);
    }

    async select() {
        this.isLoaded = false;
        if (this.name.length > 2) {
            if (!this.nameIsUsed(this.name)) {
                this.emitOutput(this.name)
                this.showInfo = false;
            } else {
                this.infoMessage = new Message(MessageType.Warning, "Nazwa jest już używana")
                this.showInfo = true;
            }
        }
        else {
            this.infoMessage = new Message(MessageType.Warning, "Nazwa musi mieć minimum 3 znaki")
            this.showInfo = true;
        }
        this.isLoaded = true
    }

    showMessage(): boolean {
        return this.showInfo == true
    }

    messageIsWarning() {
        return Message.messageIsWarning(this.infoMessage)
    }

    messageIsSuccess() {
        return Message.messageIsSuccess(this.infoMessage)
    }

    messageIsError() {
        return Message.messageIsError(this.infoMessage)
    }
}
