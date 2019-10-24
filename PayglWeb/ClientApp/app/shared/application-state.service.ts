import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationStateService {

    private _isMobileResolution: boolean;

    constructor() {
        if (window.innerWidth < 768) {
            console.log(window.innerWidth)
            this._isMobileResolution = true;
        } else {
            this._isMobileResolution = false;
        }
    }

    public isMobileResolution(): boolean {
        return this._isMobileResolution;
    }
}