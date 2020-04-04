import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { User, Frequency, Importance, Tag, TransactionType, TransferType, Filter, Dashboard, Language, Details } from '../entities/entities';
import { OperationsGroup } from "../entities/OperationsGroup";
import { Operation } from "../entities/Operation";
import { DashboardOutput } from '../entities/DashboardOutput';
import { DashboardOutputLeaf } from '../entities/DashboardOutputLeaf';
import { Schematic, SchematicType } from '../entities/Schematic';
let SharedService = class SharedService {
    constructor(data) {
        this.data = data;
        this.isInitialize = false;
        this.frequencies = [];
        this.importances = [];
        this.tags = [];
        this.transactionTypes = [];
        this.transferType = [];
        this.filters = [];
        this.dashboards = [];
        this.operations = [];
        this.operationsGroups = [];
        this.dashboardsOutputs = [];
        this.importedOperations = [];
        this.schematics = [];
    }
    loadAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                this.isInitialize = true;
                let tmp;
                this.frequencies = [];
                tmp = yield this.data.loadFrequencies();
                tmp.forEach(a => this.frequencies.push(Frequency.createFromJson(a)));
                //console.log(this.frequencies);
                this.importances = [];
                tmp = yield this.data.loadImportances();
                tmp.forEach(a => this.importances.push(Importance.createFromJson(a)));
                //console.log(this.importances);
                this.tags = [];
                tmp = yield this.data.loadTags();
                tmp.forEach(a => this.tags.push(Tag.createFromJson(a)));
                //console.log(this.tags);
                this.transactionTypes = [];
                tmp = yield this.data.loadTransactionTypes();
                tmp.forEach(a => this.transactionTypes.push(TransactionType.createFromJson(a)));
                //console.log(this.transactionTypes);
                this.transferType = [];
                tmp = yield this.data.loadTransferTypes();
                tmp.forEach(a => this.transferType.push(TransferType.createFromJson(a)));
                //console.log(this.transferType);
            }
        });
    }
    loadFiltersAndDashboards() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                yield this.loadAttributes();
            }
            let tmp;
            this.filters = [];
            tmp = yield this.data.loadFilters();
            tmp.forEach(a => this.filters.push(Filter.createFromJson(a)));
            this.dashboards = [];
            tmp = yield this.data.loadDashboards();
            tmp.forEach(a => this.dashboards.push(Dashboard.createFromJson(a)));
        });
    }
    loadSchematics() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                yield this.loadAttributes();
            }
            let tmp;
            this.schematics = [];
            tmp = yield this.data.loadSchematics();
            //console.log(tmp)
            tmp.forEach(a => this.schematics.push(Schematic.createFromJson(a, this.frequencies, this.importances, this.tags)));
        });
    }
    loadOperationsGroups(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                yield this.loadAttributes();
            }
            let tmp;
            if (from != null && to != null) {
                tmp = yield this.data.loadOperationsGroups(from, to);
            }
            else {
                tmp = yield this.data.loadOperationsGroups();
            }
            this.operationsGroups = [];
            for (let group of tmp.reverse()) {
                this.operationsGroups.push(OperationsGroup.createFromJson(group, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType));
            }
        });
    }
    loadOperations(withoutParent, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                yield this.loadAttributes();
            }
            let tmp;
            if (from != null && to != null) {
                tmp = yield this.data.loadOperations(withoutParent, from, to);
            }
            else if (withoutParent != null) {
                tmp = yield this.data.loadOperations(withoutParent);
            }
            else {
                tmp = yield this.data.loadOperations();
            }
            this.operations = [];
            for (let operation of tmp.reverse()) {
                this.operations.push(Operation.createFromJson(operation, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType));
            }
        });
    }
    loadDashboardOutput(query, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                yield this.loadAttributes();
            }
            let tmp;
            if (from != null && to != null) {
                tmp = yield this.data.loadDashboardOutput(query, from, to);
            }
            else {
                tmp = yield this.data.loadDashboardOutput(query);
            }
            if (tmp.Children === undefined) {
                this.dashboardOutput = DashboardOutputLeaf.createFromJson(tmp, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType);
            }
            else {
                this.dashboardOutput = DashboardOutput.createFromJson(tmp, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType);
            }
        });
    }
    loadDashboardsOutputs(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                yield this.loadAttributes();
            }
            let tmp;
            if (from != null && to != null) {
                tmp = yield this.data.loadDashboardsOutputs(from, to);
            }
            else {
                tmp = yield this.data.loadDashboardsOutputs();
            }
            tmp.forEach(a => this.dashboardsOutputs.push(DashboardOutput.createFromJson(a, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType)));
        });
    }
    sendOperation(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data.sendOperation(operation);
        });
    }
    sendOperationsGroup(operationsGroup) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.sendOperationsGroup(operationsGroup);
        });
    }
    sendFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.sendFilter(filter);
        });
    }
    deleteFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.deleteFilter(filter);
        });
    }
    sendDashboards(boards) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.sendDashboards(boards);
        });
    }
    sendSchematics(schematics) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.sendSchematics(schematics);
        });
    }
    sendSchematic(schematic) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.sendSchematic(schematic);
        });
    }
    loadOperationsFromCsv(id, fileToUpload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                yield this.loadAttributes();
            }
            let tmp;
            tmp = yield this.data.postFile(id, fileToUpload);
            this.importedOperations = [];
            for (let operation of tmp) {
                this.importedOperations.push(Operation.createFromJson(operation, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType, true));
            }
        });
    }
    tmpCreatingUser() {
        let language = new Language(1, "pl-PL", "polski");
        let userDetails = new Details(1, "Taborski", "Radosław");
        let user = new User(1, "rado", language, userDetails);
        return user;
    }
    tmpSchematicType(id) {
        if (id == 1) {
            return new SchematicType(id, "ignored");
        }
        else if (id == 2) {
            return new SchematicType(id, "schematic");
        }
        return null;
    }
};
SharedService = __decorate([
    Injectable()
], SharedService);
export { SharedService };
//# sourceMappingURL=shared.service.js.map