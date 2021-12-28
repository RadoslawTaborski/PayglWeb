import { __awaiter, __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Operation } from "../../entities/Operation";
import { Schematic, SchematicContext } from '../../entities/Schematic';
let ManualOperationComponent = class ManualOperationComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.isLoaded = false;
        this.editable = true;
        this.description = "";
        this.amount = null;
        this.date = null;
        this.selectedFrequency = "";
        this.selectedImportance = "";
        this.selectedTag = "";
        this.selectedTags = [];
        this.selectedTransactionType = "";
        this.selectedTransferType = "";
        this.selectedOperationGroup = null;
        this.editSchematic = false;
        this.editedSchematic = null;
        this.editGroup = false;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadAttributes();
            yield this.shared.loadOperationsGroups();
            this.title = "Dodaj operację";
            this.btnName = "Dodaj";
            this.setEditModIfPossible();
            this.setImportModIfPossible();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
    }
    ngOnChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(this.operation)
            this.isLoaded = false;
            yield this.shared.loadAttributes();
            yield this.shared.loadOperationsGroups();
            this.clear();
            this.setEditModIfPossible();
            this.setImportModIfPossible();
            this.isLoaded = true;
        });
    }
    emitOutput(result) {
        //console.log("emited: finished")
        this.finishedOutput.emit(result);
    }
    isAddMode() {
        //console.log(this.mode, this.mode == OperationMode.Add || this.mode == null)
        return this.mode == OperationMode.Add || this.mode == null;
    }
    setEditModIfPossible() {
        if (this.mode != OperationMode.Edit) {
            return;
        }
        this.title = "Edytuj operację";
        this.btnName = "Edytuj";
        this.description = this.operation.Description;
        this.amount = Number(this.operation.Amount.toFixed(2));
        this.date = this.operation.Date.substring(0, 10);
        this.selectedFrequency = this.getFrequencies().filter(t => t.Id == this.operation.Frequency.Id)[0];
        this.selectedImportance = this.getImportances().filter(t => t.Id == this.operation.Importance.Id)[0];
        this.selectedTransactionType = this.getTransactionTypes().filter(t => t.Id == this.operation.TransactionType.Id)[0];
        this.selectedTransferType = this.getTransferTypes().filter(t => t.Id == this.operation.TransferType.Id)[0];
        this.selectedTags = [];
        for (let tag of this.operation.Tags) {
            this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Tag.Id)[0]);
        }
        if (this.selectedTags.length != 0) {
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1];
        }
        if (this.operation.GroupId != null) {
            this.selectedOperationGroup = this.getOperationsGroups().filter(t => t.Id == this.operation.GroupId)[0];
            this.editable = false;
        }
        else {
            this.editable = true;
        }
    }
    setImportModIfPossible() {
        if (this.mode != OperationMode.Import) {
            return;
        }
        this.title = "Importuj operację";
        this.btnName = "Importuj";
        this.description = this.operation.Description;
        this.amount = Number(this.operation.Amount.toFixed(2));
        this.date = this.operation.Date.substring(0, 10);
        if (this.operation.Frequency != null)
            this.selectedFrequency = this.getFrequencies().filter(t => t.Id == this.operation.Frequency.Id)[0];
        if (this.operation.Importance != null)
            this.selectedImportance = this.getImportances().filter(t => t.Id == this.operation.Importance.Id)[0];
        if (this.operation.TransactionType != null)
            this.selectedTransactionType = this.getTransactionTypes().filter(t => t.Id == this.operation.TransactionType.Id)[0];
        if (this.operation.TransferType != null)
            this.selectedTransferType = this.getTransferTypes().filter(t => t.Id == this.operation.TransferType.Id)[0];
        this.selectedTags = [];
        for (let tag of this.operation.Tags) {
            this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Tag.Id)[0]);
        }
        if (this.selectedTags.length != 0) {
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1];
        }
        if (this.operation.GroupId != null) {
            this.selectedOperationGroup = this.getOperationsGroups().filter(t => t.Id == this.operation.GroupId)[0];
            this.editable = false;
        }
        else {
            this.editable = true;
        }
    }
    getFrequencies() {
        //console.log(this.shared.frequencies)
        return this.shared.frequencies;
    }
    getImportances() {
        //console.log(this.shared.importances)
        return this.shared.importances;
    }
    getTags() {
        //console.log(this.shared.tags)
        return this.shared.tags;
    }
    getTransactionTypes() {
        //console.log(this.shared.transactionTypes)
        return this.shared.transactionTypes;
    }
    getTransferTypes() {
        //console.log(this.shared.transferType)
        return this.shared.transferType;
    }
    getOperationsGroups() {
        //console.log(this.shared.operationsGroups)
        return this.shared.operationsGroups.reverse();
    }
    onTagChange(newValue) {
        //console.log(newValue);
        if (!this.selectedTags.includes(newValue))
            this.selectedTags.push(newValue);
    }
    onTagClick(toRemove) {
        //console.log(toRemove);
        this.selectedTags = this.selectedTags.filter(obj => obj !== toRemove);
    }
    onGroupChange(selectedOperationGroup) {
        //console.log(selectedOperationGroup, null)
        //console.log(selectedOperationGroup != null)
        //debugger;
        if (selectedOperationGroup != null) {
            //console.log("here")
            this.editable = false;
            this.selectedFrequency = selectedOperationGroup.Frequency;
            this.selectedImportance = selectedOperationGroup.Importance;
            this.selectedTags = selectedOperationGroup.Tags.map(x => x.Tag);
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1];
        }
        else {
            this.editable = true;
        }
    }
    onAdd() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.selectedTags.length > 0) {
                if (this.operation != undefined && this.operation != null) {
                    this.update(this.operation);
                }
                else {
                    let operation = new Operation();
                    this.update(operation);
                }
                let tmp = document.getElementById("form");
                this.clear();
                tmp.reset();
                yield this.emitOutput(true);
            }
        });
    }
    update(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            operation.Description = this.description;
            operation.Amount = this.amount;
            operation.User = this.shared.tmpCreatingUser();
            operation.GroupId = this.selectedOperationGroup != null ? this.selectedOperationGroup.Id : null;
            operation.TransactionType = this.selectedTransactionType;
            operation.TransferType = this.selectedTransferType;
            operation.Frequency = this.selectedFrequency;
            operation.Importance = this.selectedImportance;
            operation.Date = this.date.toLocaleString();
            operation.ReceiptPath = "";
            //console.log(this.selectedTags)
            operation.setTags(this.selectedTags);
            operation.DetailsList = [];
            operation.IsDirty = true;
            yield this.shared.sendOperation(operation);
        });
    }
    clear() {
        this.description = "";
        this.amount = null;
        this.date = null;
        this.selectedFrequency = "";
        this.selectedImportance = "";
        this.selectedTag = "";
        this.selectedTags = [];
        this.selectedTransactionType = "";
        this.selectedTransferType = "";
        this.selectedOperationGroup = null;
        this.editable = true;
    }
    createGroup() {
        //console.log("group")
        this.editGroup = true;
    }
    createSchematic() {
        //console.log("add")
        if (this.description.indexOf('; ') > -1) {
            const splited = this.description.split('; ');
            const contractor = splited[0].replace(/[\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const title = splited[1].replace(/[\/\\^$*+?.()|[\]{}]/g, '\\$&');
            this.editedSchematic = new Schematic(null, this.shared.tmpSchematicType(2), new SchematicContext(contractor, title, this.description, null, null, []), this.shared.tmpCreatingUser());
        }
        else {
            const title = this.description.replace(/[\/\\^$*+?.()|[\]{}]/g, '\\$&');
            this.editedSchematic = new Schematic(null, this.shared.tmpSchematicType(2), new SchematicContext("", title, this.description, null, null, []), this.shared.tmpCreatingUser());
        }
        this.editSchematic = true;
    }
    getResponseSchematic($event) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("event", $event)
            if ($event != null) {
                yield this.save($event);
                this.updateOperation($event);
            }
            this.editSchematic = false;
            this.editedSchematic = null;
        });
    }
    getResponseGroup($event) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("event", $event)
            this.editGroup = false;
            if ($event != null) {
                yield this.shared.loadOperationsGroups();
                //console.log(this.getOperationsGroups())
                this.selectedOperationGroup = this.getOperationsGroups().filter(t => t.Description == $event.Description && t.Date.substr(0, 10) == $event.Date)[0];
                this.onGroupChange(this.selectedOperationGroup);
            }
        });
    }
    updateOperation(event) {
        //console.log(event)
        this.description = event.Context.Description;
        if (!this.selectedOperationGroup) {
            if (event.Context.Frequency != null)
                this.selectedFrequency = this.getFrequencies().filter(t => t.Id == event.Context.Frequency.Id)[0];
            if (event.Context.Importance != null)
                this.selectedImportance = this.getImportances().filter(t => t.Id == event.Context.Importance.Id)[0];
            this.selectedTags = [];
            for (let tag of event.Context.Tags) {
                //console.log(tag)
                this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Id)[0]);
            }
            if (this.selectedTags.length != 0) {
                this.selectedTag = this.selectedTags[this.selectedTags.length - 1];
            }
        }
    }
    save(schematic) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("save")
            yield this.shared.sendSchematic(schematic);
        });
    }
};
__decorate([
    Input()
], ManualOperationComponent.prototype, "operation", void 0);
__decorate([
    Input()
], ManualOperationComponent.prototype, "mode", void 0);
__decorate([
    Output()
], ManualOperationComponent.prototype, "finishedOutput", void 0);
ManualOperationComponent = __decorate([
    Component({
        selector: 'app-manual-operation',
        templateUrl: './manual-operation.component.html',
        styleUrls: ['./manual-operation.component.css']
    })
], ManualOperationComponent);
export { ManualOperationComponent };
export var OperationMode;
(function (OperationMode) {
    OperationMode[OperationMode["Add"] = 0] = "Add";
    OperationMode[OperationMode["Edit"] = 1] = "Edit";
    OperationMode[OperationMode["Import"] = 2] = "Import";
})(OperationMode || (OperationMode = {}));
//# sourceMappingURL=manual-operation.component.js.map