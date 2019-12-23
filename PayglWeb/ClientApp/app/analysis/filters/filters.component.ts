import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Filter, Dashboard } from '../../entities/entities';
import { Router } from '@angular/router';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: Filter[] = [];
    public infoMessages: Filter[] = [];
    public infoMessage: Message = null

    constructor(private shared: SharedService, private state: ApplicationStateService, private router: Router) { }

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    getFilters(): Filter[] {
        //console.log(this.shared.filters)
        return this.shared.filters
    }

    getDashboards(): Dashboard[] {
        //console.log(this.shared.dashboards)
        return this.shared.dashboards
    }

    onFilterClick(o: Filter) {
        if (!this.clicked.includes(o)) {
            this.clicked = []
            this.clicked.push(o);
        } else {
            this.clicked = []
        }
        this.infoMessage = null
        this.infoMessages=[]
    }

    isClicked(o: Filter): boolean {
        return this.clicked.includes(o);
    }

    delete(o: Filter) {
        if (this.filterIsUsed(o)) {
            this.infoMessage = new Message(MessageType.Warning, "filtr jest wciąż używany, usuń go najpierw z dashboardu")
            this.onFilterMessages(o)
        } else {
            if (confirm("Czy na pewno chcesz usunąć filtr " + o.Name + " ?")) {
                this.shared.deleteFilter(o)
                this.infoMessage = new Message(MessageType.Success, "filtr usunięty")
                this.onFilterMessages(o)
            }
        }
    }

    edit(o: Filter) {
        this.router.navigate(['/search'], {
            queryParams:
            {
                number: o.Id,
                query: o.Query,
                name: o.Name,
            }
        })
    }

    filterIsUsed(o: Filter): boolean {
        let result = false;
        for (let d of this.getDashboards()) {
            result = result || this.dashboardContainFilter(o,d)
        }

        return result;
    }

    dashboardContainFilter(o: Filter, d: Dashboard): boolean {
        let result = false;
        for (let r of d.Relations) {
            if (r.Filter instanceof Filter) {
                result = result || r.Filter.Id == o.Id
            } else if (r.Filter instanceof Dashboard) {
                result = result || this.dashboardContainFilter(o, r.Filter as Dashboard);
            }
        }

        return result;
    }

    onFilterMessages(o: Filter) {
        if (!this.infoMessages.includes(o)) {
            this.infoMessages = []
            this.infoMessages.push(o);
        }
    }

    shouldBeShown(o: Filter): boolean {
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
}

class Message {
    public type: MessageType
    public message: string

    constructor(type: MessageType, message: string) {
        this.type = type
        this.message = message
    }
}

enum MessageType {
    Success = 1,
    Warning = 2,
    Error = 3
}
