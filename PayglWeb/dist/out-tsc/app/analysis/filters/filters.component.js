import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Filter, Dashboard } from '../../entities/entities';
let FiltersComponent = class FiltersComponent {
    constructor(shared, state, router) {
        this.shared = shared;
        this.state = state;
        this.router = router;
        this.isLoaded = false;
        this.clicked = [];
        this.infoMessages = [];
        this.infoMessage = null;
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadFiltersAndDashboards();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
    }
    getFilters() {
        //console.log(this.shared.filters)
        return this.shared.filters;
    }
    getDashboards() {
        //console.log(this.shared.dashboards)
        return this.shared.dashboards;
    }
    onFilterClick(o) {
        if (!this.clicked.includes(o)) {
            this.clicked = [];
            this.clicked.push(o);
        }
        else {
            this.clicked = [];
        }
        this.infoMessage = null;
        this.infoMessages = [];
    }
    isClicked(o) {
        return this.clicked.includes(o);
    }
    delete(o) {
        if (this.filterIsUsed(o)) {
            this.infoMessage = new Message(MessageType.Warning, "filtr jest wciąż używany, usuń go najpierw z dashboardu");
            this.onFilterMessages(o);
        }
        else {
            if (confirm("Czy na pewno chcesz usunąć filtr " + o.Name + " ?")) {
                this.shared.deleteFilter(o);
                this.infoMessage = new Message(MessageType.Success, "filtr usunięty");
                this.onFilterMessages(o);
            }
        }
    }
    edit(o) {
        this.router.navigate(['/search'], {
            queryParams: {
                number: o.Id,
                query: o.Query,
                name: o.Name,
            }
        });
    }
    filterIsUsed(o) {
        let result = false;
        for (let d of this.getDashboards()) {
            result = result || this.dashboardContainFilter(o, d);
        }
        return result;
    }
    dashboardContainFilter(o, d) {
        let result = false;
        for (let r of d.Relations) {
            if (r.Filter instanceof Filter) {
                result = result || r.Filter.Id == o.Id;
            }
            else if (r.Filter instanceof Dashboard) {
                result = result || this.dashboardContainFilter(o, r.Filter);
            }
        }
        return result;
    }
    onFilterMessages(o) {
        if (!this.infoMessages.includes(o)) {
            this.infoMessages = [];
            this.infoMessages.push(o);
        }
    }
    shouldBeShown(o) {
        return this.infoMessages.includes(o);
    }
    messageIsWarning() {
        if (this.infoMessage == null) {
            return false;
        }
        if (this.infoMessage.type == MessageType.Warning) {
            return true;
        }
        return false;
    }
    messageIsSuccess() {
        if (this.infoMessage == null) {
            return false;
        }
        if (this.infoMessage.type == MessageType.Success) {
            return true;
        }
        return false;
    }
    messageIsError() {
        if (this.infoMessage == null) {
            return false;
        }
        if (this.infoMessage.type == MessageType.Error) {
            return true;
        }
        return false;
    }
};
FiltersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-filters',
        templateUrl: './filters.component.html',
        styleUrls: ['./filters.component.css']
    })
], FiltersComponent);
export { FiltersComponent };
class Message {
    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
}
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Success"] = 1] = "Success";
    MessageType[MessageType["Warning"] = 2] = "Warning";
    MessageType[MessageType["Error"] = 3] = "Error";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=filters.component.js.map