import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private _myData$ = new BehaviorSubject<string>(null);
    myData$ = this._myData$.asObservable();

    private get localStorage(): Storage {
        return localStorage;
    }

    setInfo(storageData: IlocalStorageData): void {
        const jsonData = JSON.stringify(storageData.value);
        this.localStorage.setItem(storageData.key, jsonData);
        this._myData$.next(jsonData);
    }

    loadInfo(key: string): string | null {
        try {

            const data = JSON.parse(this.localStorage.getItem(key));
            // this._myData$.next(data);
            return data;
        }
        catch (error) {
            return null;
        }
    }

    clearInfo(key: string) {
        this.localStorage.removeItem(key);
        this._myData$.next(null);
    }

}

interface IlocalStorageData {
    key: string,
    value: string
}