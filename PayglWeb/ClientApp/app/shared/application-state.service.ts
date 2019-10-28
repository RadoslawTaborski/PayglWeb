﻿import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationStateService {

    private _type: ScreenSize;

    constructor() {
        if (window.innerWidth < 768) {
            console.log(window.innerWidth)
            this._type = ScreenSize.Mobile;
        } else {
            this._type = ScreenSize.Normal;
        }
    }

    public isScreenMobile(): boolean {
        console.log(this._type)
        return ScreenSize.Mobile == this._type
    }

    public isScreenNormal(): boolean {
        console.log(this._type)
        return ScreenSize.Normal == this._type
    }
}

enum ScreenSize {
    Mobile = 1,
    Normal,
}

