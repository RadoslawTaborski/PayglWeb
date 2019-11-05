import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
    public isLoaded: boolean = false

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadAttributes()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }
}
