import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Frequency, Importance, Tag } from '../../entities/entities';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {
    public isLoaded: boolean = false

    public selectedFrequency = 0
    public selectedImportance = 0
    public selectedTag = 0
    public selectedTags = []

    constructor(private shared: SharedService) { }

    async ngOnInit() {
        await this.shared.loadAttributes()
        await this.shared.loadOperationsGroups()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    getFrequencies(): Frequency[] {
        //console.log(this.shared.frequencies)
        return this.shared.frequencies
    }

    getImportances(): Importance[] {
        //console.log(this.shared.importances)
        return this.shared.importances
    }

    getTags(): Tag[] {
        //console.log(this.shared.tags)
        return this.shared.tags
    }

    onTagChange(newValue) {
        console.log(newValue);
        if (!this.selectedTags.includes(newValue))
            this.selectedTags.push(newValue)
    }

    onTagClick(toRemove) {
        console.log(toRemove);
        this.selectedTags = this.selectedTags.filter(obj => obj !== toRemove)
    }

    onAdd() {
        console.log(this.selectedFrequency)
    }
}
