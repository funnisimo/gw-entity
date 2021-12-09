import * as GWU from 'gw-utils';
import * as GWM from 'gw-map';
// import { Stats } from './stat';
import { Actor } from './actor';

export interface KindOptions extends GWM.actor.KindOptions {
    stats?: Record<string, GWU.range.RangeBase>;
}

export class ActorKind extends GWM.actor.ActorKind {
    stats: Record<string, GWU.range.RangeBase>;

    constructor(opts: KindOptions) {
        super(opts);
        this.stats = opts.stats || {};
    }

    make(options?: GWM.actor.MakeOptions): GWM.actor.Actor {
        const actor = new Actor(this);
        this.init(actor, options);
        return actor;
    }

    init(actor: Actor, options: GWM.actor.MakeOptions = {}) {
        super.init(actor, options);
        actor.stats.init(this.stats);
    }
}
