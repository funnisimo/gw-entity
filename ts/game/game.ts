import * as GWU from 'gw-utils';
import * as GWM from 'gw-map';
import { Player } from '../player/player';
import { Actor } from '../actor/actor';
import * as Action from '../action';

export interface GameOptions extends GWU.ui.UIOptions {
    makeMap: MakeMapFn;
    makePlayer: MakePlayerFn;
    startMap: StartMapFn;

    keymap: Record<string, string | Action.ActionFn>;
}

export type MakeMapFn = (id: number) => GWM.map.Map;
export type MakePlayerFn = () => Player;
export type StartMapFn = (map: GWM.map.Map, player: Player) => void;

export class Game {
    ui: GWU.ui.UI;
    layer!: GWU.ui.Layer;
    buffer!: GWU.canvas.Buffer;

    player!: Player;
    map!: GWM.map.Map;

    makeMap: MakeMapFn;
    makePlayer: MakePlayerFn;
    startMap: StartMapFn;

    running = false;
    keymap: Record<string, string | Action.ActionFn> = {};

    constructor(opts: GameOptions) {
        this.ui = new GWU.ui.UI(opts);

        this.makeMap = opts.makeMap;
        this.makePlayer = opts.makePlayer;
        this.startMap = opts.startMap;

        if (opts.keymap) {
            Object.assign(this.keymap, opts.keymap);
        }
    }

    async start() {
        this.layer = this.ui.startNewLayer();
        this.buffer = this.layer.buffer;

        this.player = this.makePlayer();
        this.map = this.makeMap(0);
        this.startMap(this.map, this.player);

        this.running = true;

        while (this.running) {
            await this.runTurn();
        }
    }

    draw() {
        if (this.map.needsRedraw) {
            this.map.drawInto(this.buffer);
            this.buffer.render();
        }
    }

    finish() {
        this.running = false;
        this.layer.finish();
    }

    async runTurn() {
        const actors = this.map.actors.slice() as Actor[];
        for (let actor of actors) {
            this.draw();

            if (actor === this.player) {
                await this.playerTurn(this.player);
            } else {
                await actor.act();
            }

            await this.animate();
        }

        this.map.tick(50); // turn time
    }

    async animate() {
        if (!this.layer._tweens.length) return;

        const timer = setInterval(() => {
            const tick = GWU.io.makeTickEvent(16);
            this.ui.loop.pushEvent(tick);
        }, 16);

        while (this.layer._tweens.length) {
            const ev = await this.ui.loop.nextTick();
            if (ev && ev.dt) {
                this.layer._tweens.forEach((a) => a && a.tick(ev.dt));
                this.layer._tweens = this.layer._tweens.filter(
                    (a) => a && a.isRunning()
                );
            }

            this.draw();
        }

        clearInterval(timer);
    }

    async playerTurn(player: Player) {
        let done = false;

        const timer = setInterval(() => {
            const tick = GWU.io.makeTickEvent(16);
            this.ui.loop.pushEvent(tick);
        }, 16);

        while (!done) {
            const ev = await this.ui.loop.nextEvent(-1);

            if (ev) {
                if (ev.type === GWU.io.KEYPRESS) {
                    const handler = GWU.io.handlerFor(ev, this.keymap);
                    if (handler) {
                        if (typeof handler === 'string') {
                            const action = Action.get(handler);
                            if (action) {
                                action.call(this, player, ev);
                                done = true;
                            }
                        } else if (typeof handler === 'function') {
                            handler.call(this, player, ev);
                            done = true;
                        }
                    }
                } else if (ev.type === GWU.io.TICK) {
                    this.layer.tick(ev); // timeouts
                }
            }
        }

        clearInterval(timer);
    }
}
