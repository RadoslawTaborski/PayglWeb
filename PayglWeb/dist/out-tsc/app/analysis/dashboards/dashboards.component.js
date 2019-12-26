import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Dashboard, Filter, DashboardFilterRelation } from '../../entities/entities';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Message, MessageType } from '../templates/message/Message';
let DashboardsComponent = class DashboardsComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.isLoaded = false;
        this.clicked = [];
        this.allDashboards = [];
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadFiltersAndDashboards();
            this.allDashboards = this.shared.dashboards;
            //console.log(this.allDashboards)
            this.isLoaded = true;
            console.log(this.allDashboards);
            //console.log(this.isLoaded)
        });
    }
    getDashboards(array) {
        return array.filter(d => !d.IsMarkForDeletion);
    }
    getRelations(array) {
        return array.filter(d => !d.IsMarkForDeletion);
    }
    onDashboardClick(o) {
        //console.log("click")
        this.showInfo = false;
        if (!this.clicked.includes(o)) {
            this.clicked.push(o);
        }
        else {
            const index = this.clicked.indexOf(o, 0);
            if (index > -1) {
                this.clicked.splice(index, 1);
            }
        }
    }
    isClicked(o) {
        return this.clicked.includes(o);
    }
    isFilter(f) {
        return (f instanceof Filter);
    }
    drop(event, array) {
        //console.log("here")
        moveItemInArray(array, event.previousIndex, event.currentIndex);
    }
    addFilter(o) {
        //console.log("addFilter")
        this.selected = o;
        this.showFilterAddMode = true;
    }
    getResponseFromAddFilter($event) {
        this.showFilterAddMode = false;
        //console.log($event)
        if ($event != undefined) {
            let tmp = new DashboardFilterRelation(null, $event, true, 0);
            tmp.IsDirty = true;
            this.selected.IsDirty = true;
            let firstIdxOfDeleted = this.selected.Relations.findIndex(t => t.IsMarkForDeletion);
            firstIdxOfDeleted = firstIdxOfDeleted > 0 ? firstIdxOfDeleted : this.selected.Relations.length;
            console.log(firstIdxOfDeleted);
            this.selected.Relations.splice(firstIdxOfDeleted, 0, tmp);
        }
    }
    addDashboard() {
        this.showDashboardAddMode = true;
    }
    getResponseFromNewDashboard($event) {
        this.showDashboardAddMode = false;
        //console.log($event)
        if ($event != undefined) {
            let tmp = new Dashboard(null, this.shared.tmpCreatingUser(), $event, false, this.allDashboards.length, []);
            tmp.IsDirty = true;
            let firstIdxOfDeleted = this.allDashboards.findIndex(t => t.IsMarkForDeletion);
            firstIdxOfDeleted = firstIdxOfDeleted > 0 ? firstIdxOfDeleted : this.allDashboards.length;
            console.log(firstIdxOfDeleted);
            this.allDashboards.splice(firstIdxOfDeleted, 0, tmp);
        }
    }
    delete(d, o) {
        //console.log(this.allDashboards)
        let boardIdx = this.allDashboards.indexOf(d);
        if (o == null) {
            if (this.dashboardIsUsed(d)) {
                this.infoMessage = new Message(MessageType.Warning, "Element jest używany. Najpierw usuń zależność.");
                this.showInfo = true;
            }
            else {
                if (d.Id != null) {
                    moveItemInArray(this.allDashboards, boardIdx, this.allDashboards.length - 1);
                    d.IsDirty = true;
                    d.IsMarkForDeletion = true;
                    d.Order = this.allDashboards.length - 1;
                }
                else {
                    let index = this.allDashboards.indexOf(d, 0);
                    if (index > -1) {
                        this.allDashboards.splice(index, 1);
                    }
                }
                this.showInfo = false;
            }
        }
        else {
            let rel = d.Relations.filter(f => f.Filter == o)[0];
            if (rel.Id != null) {
                moveItemInArray(this.allDashboards[boardIdx].Relations, this.allDashboards[boardIdx].Relations.indexOf(rel), this.allDashboards[boardIdx].Relations.length - 1);
                rel.IsDirty = true;
                rel.IsMarkForDeletion = true;
                d.Order = this.allDashboards[boardIdx].Relations.length - 1;
            }
            else {
                let index = d.Relations.indexOf(rel, 0);
                if (index > -1) {
                    d.Relations.splice(index, 1);
                }
            }
            this.showInfo = false;
        }
        //console.log(this.allDashboards)
    }
    save() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                let tmp = this.sort(this.allDashboards);
                //console.log(tmp)
                yield this.shared.sendDashboards(tmp).then((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    this.isLoaded = false;
                    yield this.reload();
                    this.isLoaded = true;
                }));
            }
        });
    }
    sort(dashboards) {
        //console.log("0:", dashboards)
        let result = [];
        for (let i = 0; i < dashboards.length; ++i) {
            let d = dashboards[i];
            if (d.Id == null && this.dashboardIsUsed(d)) {
                result.push(d);
                dashboards.splice(i, 1);
                --i;
            }
        }
        //console.log("1:", result)
        for (let i = 0; i < dashboards.length; ++i) {
            let d = dashboards[i];
            if (this.dashboardIsUsed(d)) {
                result.push(d);
                dashboards.splice(i, 1);
                --i;
            }
        }
        //console.log("2:", result)
        //console.log("2:", dashboards)
        for (let i = 0; i < dashboards.length; ++i) {
            let d = dashboards[i];
            result.push(d);
            dashboards.splice(i, 1);
            --i;
        }
        //console.log("3:",result)
        return result;
    }
    dashboardIsUsed(d) {
        let allUsed = [];
        for (let item of this.allDashboards.filter(f => !f.IsMarkForDeletion)) {
            allUsed = allUsed.concat(this.getNestedDashboards(item));
        }
        //console.log(allUsed)
        if (allUsed.includes(d)) {
            return true;
        }
        else {
            return false;
        }
    }
    findAllUsedDashboards(output, relations) {
        for (let relation of relations) {
            if (relation.Filter instanceof Dashboard) {
                output.push(relation.Filter);
                this.findAllUsedDashboards(output, relation.Filter.Relations);
            }
        }
    }
    getNestedDashboards(dashboard) {
        let result = [];
        this.findAllUsedDashboards(result, dashboard.Relations);
        return result;
    }
    reload() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, 3000));
            this.ngOnInit();
        });
    }
    showMessage() {
        return this.showInfo == true;
    }
    messageIsWarning() {
        return Message.messageIsWarning(this.infoMessage);
    }
    messageIsSuccess() {
        return Message.messageIsSuccess(this.infoMessage);
    }
    messageIsError() {
        return Message.messageIsError(this.infoMessage);
    }
};
DashboardsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboards',
        templateUrl: './dashboards.component.html',
        styleUrls: ['./dashboards.component.css']
    })
], DashboardsComponent);
export { DashboardsComponent };
//# sourceMappingURL=dashboards.component.js.map