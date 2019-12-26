import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { IFilter, Filter, Dashboard, DashboardFilterRelation } from '../../entities/entities';
import { Message, MessageType } from '../templates/message/Message';

@Component({
  selector: 'app-filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.css']
})
export class FilterSelectionComponent implements OnInit {
    @Input() visible: boolean
    @Input() selected: Dashboard
    @Input() enableDashboards: Dashboard[]
    @Output() finishedOutput = new EventEmitter<IFilter>();

    filter: IFilter
    selectedItems: IFilter[]=[]

    isLoaded: boolean = false;
    name: string = "";
    showInfo: boolean;
    infoMessage: Message;

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.selectedItems = this.getNestedFiltersAndDashboards(this.selected);
        console.log(this.selectedItems)
        this.isLoaded = true;
        //console.log(this.selected)
    }

    private findAllFilters(output: IFilter[], relations: DashboardFilterRelation[]) {
        for (let relation of relations) {
            if (relation.Filter instanceof Filter) {
                output.push(relation.Filter)
            } else if (relation.Filter instanceof Dashboard) {
                output.push(relation.Filter)
                this.findAllFilters(output, relation.Filter.Relations)
            }
        }
    }

    private getNestedFiltersAndDashboards(dashboard: Dashboard): IFilter[]{
        let result : IFilter[] = []
        this.findAllFilters(result, dashboard.Relations)
        result.push(dashboard)
        return result
    }

    getFilters(): Filter[] {
        let tmp = this.shared.filters.filter(f => !this.selectedItems.map(i => (i.Name)).includes(f.Name))
        //console.log(tmp)
        return tmp
    }

    getDashboards(): Dashboard[] {
        let tmp = this.enableDashboards.filter(d => !d.IsVisible).filter(f => !this.selectedItems.map(i => (i.Name)).includes(f.Name))
        //console.log(tmp)
        return tmp
    }

    close() {
        this.emitOutput()
    }

    emitOutput() {
        console.log("emited: finished")
        this.finishedOutput.emit(this.filter);
    }

    async select() {
        this.isLoaded = false;
        //console.log(this.filter)
        this.isLoaded = true
        this.emitOutput()
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
