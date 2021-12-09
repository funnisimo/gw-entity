import * as GWM from 'gw-map';
import { Stats } from './stat';
import { ActorKind } from './kind';
import { Item } from '../item';
import { Status } from './status';

export class Actor extends GWM.actor.Actor {
    stats: Stats;
    status: Status;

    constructor(kind: ActorKind) {
        super(kind);
        this.stats = new Stats();
        this.status = new Status();
    }

    avoidsItem(_item: Item): boolean {
        return false;
    }

    canAddItem(_item: Item): boolean {
        return false;
    }

    addItem(_item: Item): void {}

    async act(): Promise<boolean> {
        return true;
    }
}
