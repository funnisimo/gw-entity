import * as GWM from 'gw-map';
import { ItemKind, ItemActionBase } from './kind';

export class Item extends GWM.item.Item {
    kind!: ItemKind;

    constructor(kind: ItemKind) {
        super(kind);
    }

    getAction(name: string): ItemActionBase | undefined {
        const action = this.kind.actions[name];
        return action;
    }
}
