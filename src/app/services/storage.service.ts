import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    // private _storage: Storage | null = null;

    constructor(private storage: Storage) {
        this.storage.create()
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        // const storage = await this.storage.create();
        
        // this._storage = storage;
    }

    // Create and expose methods that users of this service can
    // call, for example:
    public set(key: string, value: any) {
        this.storage.set(key, value);
    }

    public get(key: string) {
        return this.storage.get(key)
    }

    public clear() {
        this.storage.clear();
    }
}
