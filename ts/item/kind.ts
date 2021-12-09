import * as GWM from 'gw-map';
import { Item } from './item';
import { Actor } from '../actor/actor';

export type ItemActionFn = (this: Item, actor: Actor) => Promise<boolean>;
export type ItemActionBase = boolean | ItemActionFn;

export interface KindOptions extends GWM.item.KindOptions {
    actions?: Record<string, ItemActionBase>;
}

export class ItemKind extends GWM.item.ItemKind {
    actions: Record<string, ItemActionBase> = {};
    constructor(config: KindOptions) {
        super(config);
        if (config.actions) {
            Object.entries(config.actions).forEach(([key, value]) => {
                this.actions[key] = value;
            });
        }
    }

    make(options?: Partial<GWM.item.MakeOptions>): Item {
        const item = new Item(this);
        this.init(item, options);
        return item;
    }
}
