import * as GWM from 'gw-map';
import * as GWU from 'gw-utils';

declare class Item extends GWM.item.Item {
    kind: ItemKind;
    constructor(kind: ItemKind);
    getAction(name: string): ItemActionBase | undefined;
}

declare type AdjustType = 'inc' | 'set' | 'dec' | 'min' | 'max';
interface StatOptions {
    value?: number;
    max?: number;
    rate?: number;
}
interface StatAdjustment {
    over?: number;
    bonus?: number;
    value?: GWU.range.RangeBase | boolean;
    max?: number | boolean;
    rate?: number;
    reset?: boolean;
    name?: string;
    stat?: string;
}
interface RegenInfo {
    turns: number;
    count: number;
    elapsed: number;
}
declare class Stats {
    _max: Record<string, number>;
    _rate: Record<string, RegenInfo>;
    _value: Record<string, number>;
    constructor(opts?: Record<string, GWU.range.RangeBase>);
    get(name: string): number;
    max(name: string): number;
    regen(name: string): RegenInfo | null;
    init(opts: Record<string, GWU.range.RangeBase>): void;
    set(name: string, v: GWU.range.RangeBase, max?: number): void;
    gain(name: string, amount: GWU.range.RangeBase, allowOver?: boolean): void;
    drain(name: string, amount: GWU.range.RangeBase): void;
    raiseMax(name: string, amount: GWU.range.RangeBase, raiseValue?: boolean): void;
    reduceMax(name: string, amount: GWU.range.RangeBase, lowerValue?: boolean): void;
    setRegen(name: string, turns: number, count?: number): void;
    regenAll(): void;
    restore(name: string, value?: number): void;
    adjust(name: string, type: AdjustType, amount: GWU.range.RangeBase): boolean;
}

interface KindOptions$2 extends GWM.actor.KindOptions {
    stats?: Record<string, GWU.range.RangeBase>;
}
declare class ActorKind extends GWM.actor.ActorKind {
    stats: Record<string, GWU.range.RangeBase>;
    constructor(opts: KindOptions$2);
    make(options?: GWM.actor.MakeOptions): GWM.actor.Actor;
    init(actor: Actor, options?: GWM.actor.MakeOptions): void;
}

declare type StatusCallback = (status: Status, name: string) => any;
declare class Status {
    _set: Record<string, boolean>;
    _time: Record<string, number>;
    _count: Record<string, number>;
    _done: Record<string, StatusCallback | null>;
    _value: Record<string, boolean>;
    changed: StatusCallback | null;
    clear(name: string): boolean;
    get(name: string): boolean;
    has(name: string): boolean;
    _addDone(name: string, done?: StatusCallback): void;
    /**
     * Sets the count for a status variable.
     * If setting the count turns on the status (it was off),
     * then this function returns true.  Otherwise, false.
     * The done variable is only set if there is no other done function
     * already for this status.
     * @param {string} name The name of the status to set.
     * @param {number} count The count to set.
     * @param {function} [done] The function to call whenever the count goes to 0.
     * @returns {boolean} Whether or not setting the count turned the status on.
     */
    setCount(name: string, count: number, done: StatusCallback): boolean;
    /**
     * Increments the count for the status by the given amount (1=default)
     * If incrementing the count turns on the status (it was off),
     * then this function returns true.  Otherwise, false.
     * The done variable is only set if there is no other done function
     * already for this status.
     * @param {string} name The name of the status to set.
     * @param {number} [count=1] The count to incrmeent.
     * @param {function} [done] The function to call whenever the count goes to 0.
     * @returns {boolean} Whether or not incrementing the count turned the status on.
     */
    increment(name: string, count?: number, done?: StatusCallback): boolean;
    /**
     * Decrements the count for the status by the given amount (1=default)
     * If decrementing the count turns off the status (it was on),
     * then this function returns true.  Otherwise, false.
     * Also, if the status is turned off, and a done function was set, then it
     * is called.
     * @param {string} name The name of the status to adjust.
     * @param {number} [count=1] The count to decrement.
     * @returns {boolean} Whether or not decrementing the count turned the status off.
     */
    decrement(name: string, count?: number): boolean;
    /**
     * Clears all counts from the given status.
     * If clearing the count turns off the status (it was on),
     * then this function returns true.  Otherwise, false.
     * Also, if the status is turned off, and a done function was set, then it
     * is called.
     * @param {string} name The name of the status to adjust.
     * @returns {boolean} Whether or not decrementing the count turned the status off.
     */
    clearCount(name: string): boolean;
    /**
     * Turns on the given status.
     * @param {string} name The status to adjust.
     * @param {function} [done] The function to call when the status is turned off.
     * @returns {boolean} True if this turns on the status. (It could be on because of a time or count).
     */
    setOn(name: string, done?: StatusCallback): boolean;
    /**
     * Turns off the given status.
     *
     * @param {string} name The status to adjust.
     * @returns {boolean} True if this turns off the status. (It could be on because of a time or count).
     */
    setOff(name: string): boolean;
    /**
     * Sets the time for a status variable.
     * If setting the time turns on the status (it was off),
     * then this function returns true.  Otherwise, false.
     * The done variable is only set if there is no other done function
     * already for this status.
     * @param {string} name The name of the status to set.
     * @param {GWU.range.RangeBase} time The time value to set.
     * @param {function} [done] The function to call whenever the status goes false.
     * @returns {boolean} Whether or not setting the time turned the status on.
     */
    setTime(name: string, value: GWU.range.RangeBase, done?: StatusCallback): boolean;
    /**
     * Adds to the time for a status variable.
     * If adding to the time turns on the status (it was off),
     * then this function returns true.  Otherwise, false.
     * The done variable is only set if there is no other done function
     * already for this status.
     * @param {string} name The name of the status to set.
     * @param {GWU.range.RangeBase} time The time value to add.
     * @param {function} [done] The function to call whenever the status goes false.
     * @returns {boolean} Whether or not adding the time turned the status on.
     */
    addTime(name: string, value?: GWU.range.RangeBase, done?: StatusCallback): boolean;
    /**
     * Removes time for a status variable.
     * If removing to the time turns off the status (it was on),
     * then this function returns true.  Otherwise, false.
     * @param {string} name The name of the status to set.
     * @param {GWU.range.RangeBase} time The time value to remove.
     * @returns {boolean} Whether or not removing the time turned the status off.
     */
    removeTime(name: string, value?: GWU.range.RangeBase): boolean;
    /**
     * Removes all time for a status variable.
     * If removing to the time turns off the status (it was on),
     * then this function returns true.  Otherwise, false.
     * @param {string} name The name of the status to set.
     * @returns {boolean} Whether or not removing the time turned the status off.
     */
    clearTime(name: string): boolean;
    /**
     * Removes time for all status variables that have time.
     * If removing the time turns off any status (it was on),
     * then this function returns an object with all of those statuses as keys and false as the values.  Otherwise, false.
     * @param {Status|object} source The object to set the status on.  If object.status is set then that is where the values are updated.
     * @param {string} name The name of the status to set.
     * @returns {boolean|object} false or an object with the names of the statuses that were cleared as keys and false as the values.
     */
    decayAllTimes(delta?: number): false | Record<string, boolean>;
    /**
     * Updates the value of the status and returns whether or not this change
     * turned the status on or off (true = change, false = no change)
     * @param {string} name The name of the status to update
     * @returns {boolean} True if the value was turned on or off, False otherwise.
     */
    _update(name: string): boolean;
}

declare class Actor extends GWM.actor.Actor {
    stats: Stats;
    status: Status;
    constructor(kind: ActorKind);
    avoidsItem(_item: Item): boolean;
    canAddItem(_item: Item): boolean;
    addItem(_item: Item): void;
    act(): Promise<boolean>;
}

declare type ItemActionFn = (this: Item, actor: Actor) => Promise<boolean>;
declare type ItemActionBase = boolean | ItemActionFn;
interface KindOptions$1 extends GWM.item.KindOptions {
    actions?: Record<string, ItemActionBase>;
}
declare class ItemKind extends GWM.item.ItemKind {
    actions: Record<string, ItemActionBase>;
    constructor(config: KindOptions$1);
    make(options?: Partial<GWM.item.MakeOptions>): Item;
}

type index_d$4_ItemActionFn = ItemActionFn;
type index_d$4_ItemActionBase = ItemActionBase;
type index_d$4_ItemKind = ItemKind;
declare const index_d$4_ItemKind: typeof ItemKind;
type index_d$4_Item = Item;
declare const index_d$4_Item: typeof Item;
declare namespace index_d$4 {
  export {
    index_d$4_ItemActionFn as ItemActionFn,
    index_d$4_ItemActionBase as ItemActionBase,
    KindOptions$1 as KindOptions,
    index_d$4_ItemKind as ItemKind,
    index_d$4_Item as Item,
  };
}

declare class PainMessages {
    _msgs: string[];
    constructor(msgs?: string[]);
    add(msg: string): this;
    get(pct: number, singular?: boolean): string;
    _format(msg: string, singular?: boolean): string;
}
declare const painMessages: Record<string, PainMessages>;
declare function installPain(id: string, pain: PainMessages | string[]): void;
declare function getPain(id: string): PainMessages;

type index_d$3_PainMessages = PainMessages;
declare const index_d$3_PainMessages: typeof PainMessages;
declare const index_d$3_painMessages: typeof painMessages;
declare const index_d$3_installPain: typeof installPain;
declare const index_d$3_getPain: typeof getPain;
type index_d$3_AdjustType = AdjustType;
type index_d$3_StatOptions = StatOptions;
type index_d$3_StatAdjustment = StatAdjustment;
type index_d$3_RegenInfo = RegenInfo;
type index_d$3_Stats = Stats;
declare const index_d$3_Stats: typeof Stats;
type index_d$3_StatusCallback = StatusCallback;
type index_d$3_Status = Status;
declare const index_d$3_Status: typeof Status;
type index_d$3_ActorKind = ActorKind;
declare const index_d$3_ActorKind: typeof ActorKind;
type index_d$3_Actor = Actor;
declare const index_d$3_Actor: typeof Actor;
declare namespace index_d$3 {
  export {
    index_d$3_PainMessages as PainMessages,
    index_d$3_painMessages as painMessages,
    index_d$3_installPain as installPain,
    index_d$3_getPain as getPain,
    index_d$3_AdjustType as AdjustType,
    index_d$3_StatOptions as StatOptions,
    index_d$3_StatAdjustment as StatAdjustment,
    index_d$3_RegenInfo as RegenInfo,
    index_d$3_Stats as Stats,
    index_d$3_StatusCallback as StatusCallback,
    index_d$3_Status as Status,
    KindOptions$2 as KindOptions,
    index_d$3_ActorKind as ActorKind,
    index_d$3_Actor as Actor,
  };
}

interface Modifier {
    bonus?: number;
}
interface Adjustment extends Modifier {
    fixed?: number;
    min?: number;
    max?: number;
    sustain?: boolean;
    base?: number;
    restore?: boolean;
}
declare type ChangeCallback = (attributes: Attributes, name: string) => any;
declare class Attributes {
    _base: Record<string, number>;
    _max: Record<string, number>;
    _bonus: Record<string, Modifier[]>;
    _sustain: Record<string, boolean>;
    _value: Record<string, number>;
    changed: ChangeCallback | null;
    constructor(baseValues: Record<string, number> | number);
    init(baseValues: Record<string, number> | number): void;
    forEach(fn: (v: number) => any): void;
    get(name: string): number;
    set(name: string, value?: number): number;
    base(name: string): number;
    max(name: string): number;
    sustain(name: string): boolean;
    gain(name: string, delta: number, raiseMax?: boolean): number;
    drain(name: string, loss: number, lowerMax?: boolean): number;
    restore(name: string): number;
    addBonus(name: string, bonus: number): number;
    _addBonus(name: string, bonus: Adjustment): number;
    clearBonus(name: string, bonus: number): number;
    _clearBonus(name: string, bonus: number | Adjustment): number;
    _calcValue(name: string): number;
    adjust(name: string, adj: Adjustment | number): number | undefined;
    clearAdjustment(name: string, adj: Adjustment | number): number | undefined;
    _applyAdjustment(total: Adjustment, opts: Adjustment): void;
}
declare const attributes: Record<string, number>;
declare function installAttribute(attr: string | Record<string, number>): void;
declare function makeAttributes(defaults: Record<string, number>): Attributes;

interface SkillInfo {
    has: boolean;
    level: number;
    disadvantage?: boolean;
    advantage?: boolean;
    fixed?: number;
    bonus?: number;
    succeed?: boolean;
    fail?: boolean;
}
declare class Skill implements Readonly<SkillInfo> {
    name: string;
    _has?: boolean;
    _level?: number;
    _disadvantage?: boolean;
    _advantage?: boolean;
    _fixed?: number;
    _bonus?: number;
    _succeed?: boolean;
    _fail?: boolean;
    _parent?: Skill;
    constructor(name: string);
    get has(): boolean;
    get level(): number;
    get disadvantage(): boolean;
    get advantage(): boolean;
    get fixed(): number;
    get bonus(): number;
    get succeed(): boolean;
    get fail(): boolean;
    set(value: boolean | number): void;
    _value(name: keyof this): number | boolean | undefined;
    _bool(name: keyof this): boolean;
    _int(name: keyof this): number;
    adjust(adj: Partial<SkillInfo>): void;
    clear(adj: Partial<SkillInfo>): void;
}
declare class Skills {
    _skills: Record<string, Skill>;
    constructor(vals?: Record<string, number | boolean>);
    set(name: string, value: boolean | number): Skill;
    get(name: string): Skill;
    adjust(name: string, adj: Partial<SkillInfo> | number): Skill;
}

declare class Player extends Actor {
    static default: {
        ch: string;
        fg: string;
        name: string;
    };
    kind: PlayerKind;
    constructor(kind: PlayerKind);
}
declare function make(options?: Partial<KindOptions>): Player;

interface KindOptions extends KindOptions$2 {
    attributes?: Record<string, number>;
    skills?: Record<string, number | boolean>;
    stats?: Record<string, number>;
}
declare class PlayerKind extends ActorKind {
    attributes: Attributes;
    skills: Skills;
    constructor(opts?: Partial<KindOptions>);
    make(options?: GWM.actor.MakeOptions): Player;
}

type index_d$2_Modifier = Modifier;
type index_d$2_Adjustment = Adjustment;
type index_d$2_ChangeCallback = ChangeCallback;
type index_d$2_Attributes = Attributes;
declare const index_d$2_Attributes: typeof Attributes;
declare const index_d$2_attributes: typeof attributes;
declare const index_d$2_installAttribute: typeof installAttribute;
declare const index_d$2_makeAttributes: typeof makeAttributes;
type index_d$2_SkillInfo = SkillInfo;
type index_d$2_Skills = Skills;
declare const index_d$2_Skills: typeof Skills;
type index_d$2_KindOptions = KindOptions;
type index_d$2_PlayerKind = PlayerKind;
declare const index_d$2_PlayerKind: typeof PlayerKind;
type index_d$2_Player = Player;
declare const index_d$2_Player: typeof Player;
declare const index_d$2_make: typeof make;
declare namespace index_d$2 {
  export {
    index_d$2_Modifier as Modifier,
    index_d$2_Adjustment as Adjustment,
    index_d$2_ChangeCallback as ChangeCallback,
    index_d$2_Attributes as Attributes,
    index_d$2_attributes as attributes,
    index_d$2_installAttribute as installAttribute,
    index_d$2_makeAttributes as makeAttributes,
    index_d$2_SkillInfo as SkillInfo,
    index_d$2_Skills as Skills,
    index_d$2_KindOptions as KindOptions,
    index_d$2_PlayerKind as PlayerKind,
    index_d$2_Player as Player,
    index_d$2_make as make,
  };
}

interface GameOptions extends GWU.ui.UIOptions {
    makeMap: MakeMapFn;
    makePlayer: MakePlayerFn;
    startMap: StartMapFn;
    keymap: Record<string, string | ActionFn>;
}
declare type MakeMapFn = (id: number) => GWM.map.Map;
declare type MakePlayerFn = () => Player;
declare type StartMapFn = (map: GWM.map.Map, player: Player) => void;
declare class Game {
    ui: GWU.ui.UI;
    layer: GWU.ui.Layer;
    buffer: GWU.canvas.Buffer;
    player: Player;
    map: GWM.map.Map;
    makeMap: MakeMapFn;
    makePlayer: MakePlayerFn;
    startMap: StartMapFn;
    running: boolean;
    keymap: Record<string, string | ActionFn>;
    constructor(opts: GameOptions);
    start(): Promise<void>;
    draw(): void;
    finish(): void;
    runTurn(): Promise<void>;
    animate(): Promise<void>;
    playerTurn(player: Player): Promise<void>;
}

type index_d$1_GameOptions = GameOptions;
type index_d$1_MakeMapFn = MakeMapFn;
type index_d$1_MakePlayerFn = MakePlayerFn;
type index_d$1_StartMapFn = StartMapFn;
type index_d$1_Game = Game;
declare const index_d$1_Game: typeof Game;
declare namespace index_d$1 {
  export {
    index_d$1_GameOptions as GameOptions,
    index_d$1_MakeMapFn as MakeMapFn,
    index_d$1_MakePlayerFn as MakePlayerFn,
    index_d$1_StartMapFn as StartMapFn,
    index_d$1_Game as Game,
  };
}

declare type ActionFn = (this: Game, actor: Actor, ev: GWU.io.Event) => Promise<boolean>;
declare type ActionBase = boolean | ActionFn;
declare const actions: Record<string, ActionFn>;
declare function install(name: string, fn: ActionFn): void;
declare function get(name: string): ActionFn | undefined;

declare function moveDir(this: Game, actor: Actor, e: GWU.io.Event): Promise<boolean>;

declare function pickup(this: Game, actor: Actor, _ev: GWU.io.Event): Promise<boolean>;

type index_d_ActionFn = ActionFn;
type index_d_ActionBase = ActionBase;
declare const index_d_actions: typeof actions;
declare const index_d_install: typeof install;
declare const index_d_get: typeof get;
declare const index_d_moveDir: typeof moveDir;
declare const index_d_pickup: typeof pickup;
declare namespace index_d {
  export {
    index_d_ActionFn as ActionFn,
    index_d_ActionBase as ActionBase,
    index_d_actions as actions,
    index_d_install as install,
    index_d_get as get,
    index_d_moveDir as moveDir,
    index_d_pickup as pickup,
  };
}

export { index_d as action, index_d$3 as actor, index_d$1 as game, index_d$4 as item, index_d$2 as player };
