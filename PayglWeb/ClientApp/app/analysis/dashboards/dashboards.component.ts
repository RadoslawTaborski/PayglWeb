import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Dashboard, IFilter, Filter, DashboardFilterRelation } from '../../entities/entities';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Message, MessageType } from '../templates/message/Message';

@Component({
    selector: 'app-dashboards',
    templateUrl: './dashboards.component.html',
    styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: IFilter[] = [];
    public selected: IFilter;
    showFilterAddMode: boolean;
    showDashboardAddMode: boolean;

    allDashboards: Dashboard[] = []
    infoMessage: Message;
    showInfo: boolean;

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.allDashboards = this.shared.dashboards
        //console.log(this.allDashboards)
        this.isLoaded = true;
        //console.log(this.allDashboards)
        //console.log(this.isLoaded)
    }

    getDashboards(array: Dashboard[]) {
        return array.filter(d => !d.IsMarkForDeletion)
    }

    getRelations(array: DashboardFilterRelation[]) {
        return array.filter(d => !d.IsMarkForDeletion)
    }

    onDashboardClick(o: IFilter) {
        //console.log("click")
        this.showInfo = false;
        if (!this.clicked.includes(o)) {
            this.clicked.push(o);
        } else {
            const index = this.clicked.indexOf(o, 0);
            if (index > -1) {
                this.clicked.splice(index, 1);
            }
        }
    }

    isClicked(o: IFilter): boolean {
        return this.clicked.includes(o);
    }

    isFilter(f: IFilter): boolean {
        return (f instanceof Filter)
    }

    drop(event: CdkDragDrop<string[]>, array: IFilter[]) {
        //console.log("here")
        moveItemInArray(array, event.previousIndex, event.currentIndex);
    }

    addFilter(o: IFilter) {
        //console.log("addFilter")
        this.selected = o
        this.showFilterAddMode = true;
    }

    getResponseFromAddFilter($event) {
        this.showFilterAddMode = false;
        //console.log($event)
        if ($event != undefined) {
            let tmp = new DashboardFilterRelation(null, $event, true, 0);
            tmp.IsDirty = true;
            this.selected.IsDirty = true;
            let firstIdxOfDeleted = (this.selected as Dashboard).Relations.findIndex(t => t.IsMarkForDeletion);
            firstIdxOfDeleted = firstIdxOfDeleted > 0 ? firstIdxOfDeleted : (this.selected as Dashboard).Relations.length;
            //console.log(firstIdxOfDeleted);
            (this.selected as Dashboard).Relations.splice(firstIdxOfDeleted, 0, tmp);
        }
    }

    addDashboard() {
        this.showDashboardAddMode = true;
    }

    getResponseFromNewDashboard($event) {
        this.showDashboardAddMode = false;
        //console.log($event)
        if ($event != undefined) {
            let tmp = new Dashboard(null, this.shared.tmpCreatingUser(), $event, false, this.allDashboards.length, [])
            tmp.IsDirty = true;
            let firstIdxOfDeleted = this.allDashboards.findIndex(t => t.IsMarkForDeletion);
            firstIdxOfDeleted = firstIdxOfDeleted > 0 ? firstIdxOfDeleted : this.allDashboards.length;
            //console.log(firstIdxOfDeleted);
            this.allDashboards.splice(firstIdxOfDeleted, 0, tmp);
        }
    }

    delete(d: Dashboard, o: IFilter) {
        //console.log(this.allDashboards)
        let boardIdx = this.allDashboards.indexOf(d)
        if (o == null) {
            //console.log("here0")
            if (this.dashboardIsUsed(d)) {
                this.infoMessage = new Message(MessageType.Warning, "Element jest używany. Najpierw usuń zależność.")
                this.showInfo = true;
                //console.log("here")
            } else {
                if (d.Id != null) {
                    moveItemInArray(this.allDashboards, boardIdx, this.allDashboards.length - 1);
                    d.IsDirty = true;
                    d.IsMarkForDeletion = true;
                    d.Order = this.allDashboards.length - 1;
                } else {
                    let index = this.allDashboards.indexOf(d, 0);
                    if (index > -1) {
                        this.allDashboards.splice(index, 1);
                    }
                }
                this.showInfo = false;
            }
        } else {
            let rel = d.Relations.filter(f => f.Filter == o)[0]
            if (rel.Id != null) {
                moveItemInArray(this.allDashboards[boardIdx].Relations, this.allDashboards[boardIdx].Relations.indexOf(rel), this.allDashboards[boardIdx].Relations.length - 1);
                rel.IsDirty = true
                rel.IsMarkForDeletion = true;
                rel.Order = this.allDashboards[boardIdx].Relations.length - 1;
                d.IsDirty = true;
            } else {
                let index = d.Relations.indexOf(rel, 0);
                if (index > -1) {
                    d.Relations.splice(index, 1);
                }
            }
            this.showInfo = false;
        }
        //console.log(this.allDashboards)
    }

    async save() {
        if (confirm("Czy na pewno zapisać wszystkie zmiany?")) {
            for (let i = 0; i < this.allDashboards.length; ++i) {
                if (this.allDashboards[i].Order != i + 1) {
                    //console.log(this.allDashboards[i].Name, this.allDashboards[i].Order, i + 1, this.allDashboards[i].IsVisible)
                    this.allDashboards[i].Order = i + 1;
                    this.allDashboards[i].IsDirty = true;
                }
                for (let j = 0; j < this.allDashboards[i].Relations.length; ++j) {
                    if (this.allDashboards[i].Relations[j].Order != j + 1) {
                        //console.log(this.allDashboards[i].Relations[j].Filter.Name, this.allDashboards[i].Relations[j].Order, j + 1)
                        this.allDashboards[i].Relations[j].Order = j + 1;
                        this.allDashboards[i].Relations[j].IsDirty = true;
                        this.allDashboards[i].IsDirty = true;
                    }
                }
            }
            this.showInfo = false;

            let tmp = this.sort(this.allDashboards)

            //console.log(tmp)
            await this.shared.sendDashboards(tmp).then(async value => {
                this.isLoaded = false;
                await this.reload();
                this.isLoaded = true;
            });
        }
    }

    sort(dashboards: Dashboard[]): Dashboard[] {
        //console.log("0:", dashboards)
        let result: Dashboard[] = []
        for (let i = 0; i < dashboards.length; ++i) {
            let d = dashboards[i]
            if (d.Id == null && this.dashboardIsUsed(d)) {
                result.push(d)
                dashboards.splice(i, 1)
                --i;
            }
        }
        //console.log("1:", result)
        for (let i = 0; i < dashboards.length; ++i) {
            let d = dashboards[i]
            if (this.dashboardIsUsed(d)) {
                result.push(d)
                dashboards.splice(i, 1)
                --i;
            }
        }
        //console.log("2:", result)
        //console.log("2:", dashboards)
        for (let i = 0; i < dashboards.length; ++i) {
            let d = dashboards[i]
            result.push(d)
            dashboards.splice(i, 1)
            --i;
        }
        //console.log("3:",result)

        return result;
    }

    dashboardIsUsed(d: Dashboard): boolean {
        let allUsed: IFilter[] = []
        for (let item of this.getDashboards(this.allDashboards)) {
            allUsed = allUsed.concat(this.getNestedDashboards(item))
        }

        //console.log("here: ", allUsed)

        if (allUsed.filter(f => f.Name == d.Name).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    private findAllUsedDashboards(output: IFilter[], relations: DashboardFilterRelation[]) {
        for (let relation of relations.filter(f => !f.IsMarkForDeletion)) {
            if (relation.Filter instanceof Dashboard) {
                output.push(relation.Filter)
            }
        }
    }

    private getNestedDashboards(dashboard: Dashboard): IFilter[] {
        let result: IFilter[] = []
        this.findAllUsedDashboards(result, dashboard.Relations)
        return result
    }

    changeVisible(o: Dashboard) {
        o.IsVisible = !o.IsVisible
        o.IsDirty = true
    }

    async reload() {
        await new Promise(resolve => setTimeout(resolve, 4000));
        this.ngOnInit()
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
