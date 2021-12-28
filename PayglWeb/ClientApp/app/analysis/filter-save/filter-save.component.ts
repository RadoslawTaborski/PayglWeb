import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Filter } from '../../entities/entities';
import { ApplicationStateService } from '../../shared/application-state.service';
import { SharedService } from '../../shared/shared.service';
import { Message, MessageType } from '../templates/message/Message';

@Component({
    selector: 'app-filter-save',
    templateUrl: './filter-save.component.html',
    styleUrls: ['./filter-save.component.css']
})
export class FilterSaveComponent implements OnInit, OnChanges {
    @Input() visible: boolean
    @Input() filter: Filter
    @Input() isNew: boolean = true;
    @Output() finishedOutput = new EventEmitter<boolean>();

    isLoaded: boolean = false;
    name: string = "";
    showInfo: boolean;
    infoMessage: Message;

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.name = this.filter.Name
        this.isLoaded = true;
    }

    close() {
        this.emitOutput(false)
    }

    emitOutput(success: boolean) {
        //console.log("emited: finished")
        this.finishedOutput.emit(success);
    }

    async save() {
        this.isLoaded = false;
        if (this.name.length > 3) {
            let filterCopy = this.filter;
            filterCopy.Name = this.name
            filterCopy.IsDirty = true
            await this.shared.sendFilter(filterCopy)
            this.isNew = true;
            this.showInfo = false;
            this.emitOutput(true)
        } else {
            this.infoMessage = new Message(MessageType.Error, "Nazwa musi mieć minimum 3 znaki")
            this.showInfo = true;
        }
        this.isLoaded = true
    }

    async saveAs() {
        this.isLoaded = false;
        if (this.name.length > 2) {
            let filterCopy = this.filter;
            filterCopy.Id = null;
            filterCopy.Name = this.name
            filterCopy.IsDirty = true
            await this.shared.sendFilter(filterCopy)
            this.showInfo = false;
            this.emitOutput(true)
        } else {
            this.infoMessage = new Message(MessageType.Error, "Nazwa musi mieć minimum 3 znaki")
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
