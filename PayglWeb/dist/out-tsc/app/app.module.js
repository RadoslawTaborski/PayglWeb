import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddingModule } from './adding/adding.module';
import { AnalysisModule } from './analysis/analysis.module';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SettingsModule } from './settings/settings.module';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
        ],
        imports: [
            BrowserModule,
            AddingModule,
            AnalysisModule,
            SettingsModule,
            AppRoutingModule,
            HttpClientModule
        ],
        providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map