(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('gw-map'), require('gw-utils')) :
    typeof define === 'function' && define.amd ? define(['exports', 'gw-map', 'gw-utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.GWE = {}, global.GWM, global.GWU));
}(this, (function (exports, GWM, GWU) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var GWM__namespace = /*#__PURE__*/_interopNamespace(GWM);
    var GWU__namespace = /*#__PURE__*/_interopNamespace(GWU);

    class Item extends GWM__namespace.item.Item {
        constructor(kind) {
            super(kind);
        }
        getAction(name) {
            const action = this.kind.actions[name];
            return action;
        }
    }

    class ItemKind extends GWM__namespace.item.ItemKind {
        constructor(config) {
            super(config);
            this.actions = {};
            if (config.actions) {
                Object.entries(config.actions).forEach(([key, value]) => {
                    this.actions[key] = value;
                });
            }
        }
        make(options) {
            const item = new Item(this);
            this.init(item, options);
            return item;
        }
    }

    var index$4 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ItemKind: ItemKind,
        Item: Item
    });

    class PainMessages {
        constructor(msgs = []) {
            this._msgs = [];
            msgs.forEach((m) => this.add(m));
        }
        add(msg) {
            this._msgs.push(msg);
            return this;
        }
        get(pct, singular = true) {
            const index = GWU__namespace.clamp(Math.floor(pct * this._msgs.length), 0, this._msgs.length - 1);
            const msg = this._msgs[index];
            return this._format(msg, singular);
        }
        _format(msg, singular = true) {
            return msg.replace(/\[(\w+)\|?(\w*)\]/g, singular ? '$1' : '$2');
        }
    }
    const painMessages = {};
    function installPain(id, pain) {
        if (Array.isArray(pain)) {
            pain = new PainMessages(pain);
        }
        painMessages[id] = pain;
    }
    function getPain(id) {
        const m = painMessages[id];
        if (!m)
            throw new Error('No such pain message index: ' + id);
        return m;
    }

    class Stats {
        constructor(opts = {}) {
            this._max = {};
            this._rate = {};
            this._value = {};
            this.init(opts);
        }
        get(name) {
            return this._value[name];
        }
        max(name) {
            return this._max[name] || 0;
        }
        regen(name) {
            return this._rate[name] || null;
        }
        init(opts) {
            for (let name in opts) {
                this.set(name, opts[name]);
            }
        }
        set(name, v, max) {
            if (typeof v !== 'number') {
                const r = GWU__namespace.range.make(v);
                v = r.value();
            }
            this._value[name] = v;
            this._max[name] = max || v;
        }
        gain(name, amount, allowOver = false) {
            if (typeof amount !== 'number') {
                amount = GWU__namespace.range.value(amount);
            }
            let v = this._value[name] + amount;
            if (!allowOver) {
                v = Math.min(v, this._max[name]);
            }
            this._value[name] = v;
        }
        drain(name, amount) {
            if (typeof amount !== 'number') {
                amount = GWU__namespace.range.value(amount);
            }
            this._value[name] = Math.max(0, this._value[name] - amount);
        }
        raiseMax(name, amount, raiseValue = true) {
            if (typeof amount !== 'number') {
                amount = GWU__namespace.range.value(amount);
            }
            this._max[name] += amount;
            if (raiseValue) {
                this.gain(name, amount);
            }
        }
        reduceMax(name, amount, lowerValue = false) {
            if (typeof amount !== 'number') {
                amount = GWU__namespace.range.value(amount);
            }
            this._max[name] = Math.max(0, this._max[name] - amount);
            if (lowerValue) {
                this.drain(name, amount);
            }
        }
        setRegen(name, turns, count = 1) {
            const r = (this._rate[name] = this._rate[name] || { elapsed: 0 });
            r.turns = turns;
            r.count = count;
        }
        regenAll() {
            for (let name in this._max) {
                const r = this._rate[name];
                r.elapsed += 1;
                if (r.elapsed >= r.turns) {
                    this.gain(name, r.count);
                    r.elapsed -= r.turns;
                }
            }
        }
        restore(name, value) {
            if (value === undefined)
                value = this._max[name];
            this._value[name] = value;
        }
        adjust(name, type, amount) {
            amount = GWU__namespace.range.from(amount);
            const v = amount.value();
            const c = this.get(name);
            if (type === 'inc') {
                this.gain(name, amount);
            }
            else if (type === 'dec') {
                this.drain(name, amount);
            }
            else if (type === 'set') {
                this.set(name, amount);
            }
            else if (type === 'min') {
                const v = amount.value();
                if (this.get(name) < v) {
                    this.set(name, v);
                }
            }
            else if (type === 'max') {
                if (this.get(name) > v) {
                    this.set(name, v);
                }
            }
            else {
                throw new Error('Invalid stat adjust type: ' + type);
            }
            return c !== this.get(name);
        }
    }

    class Status {
        constructor() {
            this._set = {};
            this._time = {};
            this._count = {};
            this._done = {};
            this._value = {};
            this.changed = null;
        }
        clear(name) {
            this.clearTime(name);
            this.clearCount(name);
            this.setOff(name);
            return this._update(name);
        }
        get(name) {
            return this._value[name] || false;
        }
        has(name) {
            return this._value[name] || false;
        }
        _addDone(name, done) {
            if (done) {
                if (!this._done[name]) {
                    this._done[name] = done;
                }
            }
        }
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
        setCount(name, count, done) {
            const status = this;
            status._count[name] = Math.max(count, status._count[name] || 0);
            this._addDone(name, done);
            return this._update(name);
        }
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
        increment(name, count = 1, done) {
            if (typeof count == 'function') {
                done = count;
                count = 1;
            }
            const status = this;
            status._count[name] = (status._count[name] || 0) + count;
            this._addDone(name, done);
            return this._update(name);
        }
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
        decrement(name, count = 1) {
            const status = this;
            status._count[name] = Math.max(0, (status._count[name] || 0) - count);
            return this._update(name);
        }
        /**
         * Clears all counts from the given status.
         * If clearing the count turns off the status (it was on),
         * then this function returns true.  Otherwise, false.
         * Also, if the status is turned off, and a done function was set, then it
         * is called.
         * @param {string} name The name of the status to adjust.
         * @returns {boolean} Whether or not decrementing the count turned the status off.
         */
        clearCount(name) {
            const status = this;
            status._count[name] = 0;
            return this._update(name);
        }
        /**
         * Turns on the given status.
         * @param {string} name The status to adjust.
         * @param {function} [done] The function to call when the status is turned off.
         * @returns {boolean} True if this turns on the status. (It could be on because of a time or count).
         */
        setOn(name, done) {
            const status = this;
            status._set[name] = true;
            this._addDone(name, done);
            return this._update(name);
        }
        /**
         * Turns off the given status.
         *
         * @param {string} name The status to adjust.
         * @returns {boolean} True if this turns off the status. (It could be on because of a time or count).
         */
        setOff(name) {
            const status = this;
            status._set[name] = false;
            return this._update(name);
        }
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
        setTime(name, value, done) {
            const status = this;
            // if (value === true) {
            //   return RUT.Status.setOn(source, name, done);
            // }
            value = GWU__namespace.range.make(value).value();
            const current = status._time[name] || 0;
            status._time[name] = Math.max(value, current);
            this._addDone(name, done);
            return this._update(name);
        }
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
        addTime(name, value = 1, done) {
            if (typeof value == 'function') {
                done = value;
                value = 1;
            }
            const status = this;
            // if (value === true) {
            //   return RUT.Status.setOn(source, name, done);
            // }
            value = GWU__namespace.range.make(value).value();
            status._time[name] = (status._time[name] || 0) + value;
            this._addDone(name, done);
            return this._update(name);
        }
        /**
         * Removes time for a status variable.
         * If removing to the time turns off the status (it was on),
         * then this function returns true.  Otherwise, false.
         * @param {string} name The name of the status to set.
         * @param {GWU.range.RangeBase} time The time value to remove.
         * @returns {boolean} Whether or not removing the time turned the status off.
         */
        removeTime(name, value = 1) {
            const status = this;
            value = GWU__namespace.range.make(value).value();
            status._time[name] = Math.max(0, (status._time[name] || 0) - value);
            return this._update(name);
        }
        /**
         * Removes all time for a status variable.
         * If removing to the time turns off the status (it was on),
         * then this function returns true.  Otherwise, false.
         * @param {string} name The name of the status to set.
         * @returns {boolean} Whether or not removing the time turned the status off.
         */
        clearTime(name) {
            const status = this;
            status._time[name] = 0;
            return this._update(name);
        }
        /**
         * Removes time for all status variables that have time.
         * If removing the time turns off any status (it was on),
         * then this function returns an object with all of those statuses as keys and false as the values.  Otherwise, false.
         * @param {Status|object} source The object to set the status on.  If object.status is set then that is where the values are updated.
         * @param {string} name The name of the status to set.
         * @returns {boolean|object} false or an object with the names of the statuses that were cleared as keys and false as the values.
         */
        decayAllTimes(delta = 1) {
            const status = this;
            const cleared = {};
            let noticed = false;
            for (let name in status._time) {
                if (this.removeTime(name, delta)) {
                    noticed = true;
                    cleared[name] = false;
                }
            }
            return noticed ? cleared : false;
        }
        /**
         * Updates the value of the status and returns whether or not this change
         * turned the status on or off (true = change, false = no change)
         * @param {string} name The name of the status to update
         * @returns {boolean} True if the value was turned on or off, False otherwise.
         */
        _update(name) {
            const status = this;
            const rec = this._value;
            let was = rec[name];
            let value = (rec[name] =
                status._set[name] ||
                    status._time[name] > 0 ||
                    status._count[name] > 0 ||
                    false);
            const doneFn = this._done[name];
            if (!value && doneFn) {
                doneFn(this, name);
                status._done[name] = null;
            }
            if (was && !value) {
                if (this.changed)
                    this.changed(this, name);
                // console.log('called changed: false');
                return true;
            }
            else if (!was && value) {
                if (this.changed)
                    this.changed(this, name);
                // console.log('called changed: true');
                return true;
            }
            return false;
        }
    }

    class Actor extends GWM__namespace.actor.Actor {
        constructor(kind) {
            super(kind);
            this.stats = new Stats();
            this.status = new Status();
        }
        avoidsItem(_item) {
            return false;
        }
        canAddItem(_item) {
            return false;
        }
        addItem(_item) { }
        async act() {
            return true;
        }
    }

    class ActorKind extends GWM__namespace.actor.ActorKind {
        constructor(opts) {
            super(opts);
            this.stats = opts.stats || {};
        }
        make(options) {
            const actor = new Actor(this);
            this.init(actor, options);
            return actor;
        }
        init(actor, options = {}) {
            super.init(actor, options);
            actor.stats.init(this.stats);
        }
    }

    var index$3 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        PainMessages: PainMessages,
        painMessages: painMessages,
        installPain: installPain,
        getPain: getPain,
        Stats: Stats,
        Status: Status,
        ActorKind: ActorKind,
        Actor: Actor
    });

    /*
        Attributes
        ========================

        To configure attributes, set the defaults:

        Attribute.install(')

        const attr = new Attributes(10);

        attr.set('str', 10);
        attr.set('dex', 10);
        ...
        attr.set('chr', 10);

        // to get the current value
        attr.get('str');

        // To raise an attribute permanently
        attr.gain('chr', 1);

        // To raise an attribute temporarily
        attr.gain('chr', 1, false);

        // To lower an attribute permanently
        attr.drain('chr', 1, true);

        // to lower an attribute temporarily
        attr.drain('chr', 1);

        // to restore (remove) all temporary changes
        attr.restore();

        // to add a temporary change that can be removed by itself
        attr.addBonus('str', 1);

        // to remove the bonus
        attr.clearBonus('str', 1);

        // adjustments (bonuses) are also possible via:
        attr.adjust('str', { bonus: 1 });

        // But adjustments can also set the
        attr.adjust('str', { fixed: 14 });      // temporarily sets base
        attr.adjust('str', { base: 21 });       // resets the base
        attr.adjust('str', { restore: true });  // removes all bonuses/penalties
        attr.adjust('str', { min: 10 });        // limits value
        attr.adjust('str', { max: 30 });        // limits value
        attr.adjust('str', { sustain: true });  // turns off lowering values
    */
    class Attributes {
        constructor(baseValues) {
            this._base = {};
            this._max = {};
            this._bonus = {};
            this._sustain = {};
            this._value = {};
            this.changed = null;
            this.init(baseValues);
        }
        init(baseValues) {
            for (let k in attributes) {
                const v = typeof baseValues === 'number' ? baseValues : attributes[k];
                this.set(k, v);
            }
            if (typeof baseValues !== 'number') {
                for (let k in baseValues) {
                    this.set(k, baseValues[k]);
                }
            }
        }
        forEach(fn) {
            Object.keys(attributes).forEach((k) => fn(this.get(k)));
        }
        // modifier(name: string) {
        //     return Math.floor((this.get(name) - 10) / 2);
        // }
        get(name) {
            return this._value[name] || 0;
        }
        set(name, value = 0) {
            this._value[name] = value;
            this._base[name] = value;
            this._max[name] = value;
            this._bonus[name] = [];
            return value;
        }
        base(name) {
            return this._base[name] || 0;
        }
        max(name) {
            return this._max[name] || 0;
        }
        sustain(name) {
            return this._sustain[name] || false;
        }
        gain(name, delta, raiseMax = true) {
            if (delta < 0 && this._sustain[name])
                return 0;
            this._base[name] += delta;
            if (raiseMax && this._base[name] > this._max[name]) {
                this._max[name] = this._base[name];
            }
            let old = this.get(name);
            return this._calcValue(name) - old;
        }
        drain(name, loss, lowerMax = false) {
            if (loss < 0)
                loss = -loss;
            const changed = this.gain(name, -loss, false);
            if (changed && lowerMax) {
                this._max[name] = this._base[name];
            }
            return changed;
        }
        restore(name) {
            this._base[name] = this._max[name];
            let old = this.get(name);
            return this._calcValue(name) - old;
        }
        addBonus(name, bonus) {
            return this._addBonus(name, { bonus });
        }
        _addBonus(name, bonus) {
            if (typeof bonus === 'number')
                bonus = { bonus };
            if (this._value[name] === undefined) {
                this.set(name, 0);
            }
            this._bonus[name].push(bonus);
            let old = this.get(name);
            return this._calcValue(name) - old;
        }
        clearBonus(name, bonus) {
            return this._clearBonus(name, { bonus });
        }
        _clearBonus(name, bonus) {
            if (typeof bonus === 'number')
                bonus = { bonus };
            let arr = this._bonus[name] || [];
            let key = JSON.stringify(bonus);
            let index = arr.findIndex((o) => {
                return JSON.stringify(o) == key;
            });
            if (index > -1) {
                arr.splice(index, 1);
                let old = this.get(name);
                return this._calcValue(name) - old;
            }
            return 0;
        }
        _calcValue(name) {
            let allAdjustments = {};
            this._bonus[name].forEach((adj) => this._applyAdjustment(allAdjustments, adj));
            this._sustain[name] = allAdjustments.sustain || false;
            let value = this._base[name] || 0;
            if (allAdjustments.fixed !== undefined) {
                value = allAdjustments.fixed;
            }
            else {
                value += allAdjustments.bonus || 0;
                if (allAdjustments.min !== undefined) {
                    value = Math.max(allAdjustments.min, value);
                }
                if (allAdjustments.max !== undefined) {
                    value = Math.min(allAdjustments.max, value);
                }
            }
            return (this._value[name] = value);
        }
        adjust(name, adj) {
            let delta = undefined;
            if (typeof adj === 'number') {
                adj = { bonus: adj };
            }
            if (adj.base) {
                delta = this.gain(name, adj.base);
            }
            else if (adj.restore) {
                delta = this.restore(name);
                if (delta == 0)
                    delta = undefined;
            }
            else {
                delta = this._addBonus(name, adj);
            }
            if (this.changed && delta !== undefined)
                this.changed(this, name);
            return delta;
        }
        clearAdjustment(name, adj) {
            let delta = undefined;
            if (typeof adj === 'number') {
                adj = { bonus: adj };
            }
            if (adj.base) {
                delta = this.drain(name, adj.base, true);
            }
            else if (adj.restore) ;
            else {
                delta = this._clearBonus(name, adj);
            }
            if (this.changed && delta !== undefined)
                this.changed(this, name);
            return delta;
        }
        _applyAdjustment(total, opts) {
            if (opts.bonus) {
                total.bonus = (total.bonus || 0) + opts.bonus;
            }
            if (opts.fixed !== undefined) {
                total.fixed = Math.max(total.fixed || 0, opts.fixed);
            }
            if (opts.min !== undefined) {
                total.min = Math.max(total.min || 0, opts.min);
            }
            if (opts.max !== undefined) {
                total.max = Math.max(total.max || 0, opts.max);
            }
            if (opts.sustain !== undefined) {
                total.sustain = opts.sustain;
            }
        }
    }
    const attributes = {};
    function installAttribute(attr) {
        if (typeof attr === 'string') {
            attributes[attr] = 0;
            return;
        }
        // clear existing
        Object.keys(attributes).forEach((k) => {
            delete attributes[k];
        });
        Object.assign(attributes, attr);
    }
    function makeAttributes(defaults) {
        return new Attributes(defaults);
    }
    /*
    function adjust(being, ...args) {
        let adj;
        if (args.length == 1 && typeof args[0] == 'number') {
            adj = RUT.Attributes.map((key) => {
                return { name: key, bonus: args[0] };
            });
        } else {
            adj = normalize_adjustment(args);
        }

        let results = adj.reduce((out, a) => {
            let delta = undefined;
            if (a.base) {
                delta = being.attributes.addBase(a.name, a.base);
            } else if (a.restore) {
                delta = being.attributes.restoreBase(a.name);
                if (delta == 0) delta = undefined;
            } else {
                delta = being.attributes.addBonus(a.name, a);
            }
            if (delta !== undefined) {
                out[a.name] = delta;
            }
            return out;
        }, {});
        being.changed({ attributes: results });

        return results;
    };

     function clearAdjustment(being, ...args) {
        let adj;
        if (args.length == 1 && typeof args[0] == 'number') {
            adj = RUT.Attributes.map((key) => {
                return { name: key, bonus: args[0] };
            });
        } else {
            adj = normalize_adjustment(args);
        }

        let results = adj.reduce((out, a) => {
            let delta = 0;
            delta += being.attributes.clearBonus(a.name, a);

            out[a.name] = delta;
            return out;
        }, {});
        being.changed({ attributes: results });
        return results;
    };

    RUT.Attribute.rollAttributes = function (opts = {}) {
        let dice = [];
        let total = 0;

        if (RUT.Calc.isValue(opts)) opts = { value: opts };
        Object.defaults(opts, RUT.Config.Attribute.rollAttributes);

        let attributes = RUT.Config.Attributes;

        let min_average = Math.max(opts.min_average - 5, 0);
        let max_average = Math.min(opts.max_average - 5, RUT.Config.ATTRIBUTE_MAX);

        let min_total = min_average * attributes.length;
        let max_total = max_average * attributes.length;

        do {
            total = 0;
            dice = [];
            for (let i = 0; i < 18; ++i) {
                dice.push(RUT.RNG.rollDie(3 + (i % 3)));
                total += dice[i];
            }
        } while (total <= min_total || total > max_total);

        let values = attributes.reduce((out, name, i) => {
            let index = 3 * i;
            let value = 5 + dice[index] + dice[index + 1] + dice[index + 2];
            if (opts.value) {
                value = RUT.Calc.calc(opts.value);
            } else if (opts[name]) {
                value = RUT.Calc.calc(opts[name]);
            }
            out[name] = value;
            return out;
        }, {});
        return values;
    };
    RUT.Config.Attribute.rollAttributes = { min_average: 11, max_average: 14 };
    */
    /*
    export function normalize_adjustment(args: ) {
        if (args.length == 3) {
            let opts = args[2];
            if (RUT.Calc.isValue(opts)) {
                opts = { bonus: opts };
            }
            let name = `${args[0]}.${args[1]}`;
            return [Object.assign({ name }, opts)];
        }
        if (args.length == 2) {
            let opts = args[1];
            if (opts === true || opts === false) {
                opts = { has: opts };
            } else if (RUT.Calc.isValue(opts)) {
                opts = { bonus: opts };
            }
            return [Object.assign({ name: args[0] }, opts)];
        }

        let opts = args[0];
        if (opts.name) {
            return [opts];
        }
        if (opts.attribute) {
            opts.name = opts.attribute;
            return [opts];
        }
        if (opts.restore) {
            if (opts.restore == 'all') {
                return RUT.Attributes.map((a) => {
                    return { name: a, restore: true };
                });
            }
            return [{ name: opts.restore, restore: true }];
        }
        if (opts.skill) {
            opts.name = opts.skill;
            return [opts];
        }
        if (opts.stat) {
            opts.name = opts.stat;
            return [opts];
        }
        if (opts.save) {
            opts.name = opts.save;
            return [opts];
        }
        // if (opts.saves) {
        //   opts.name = opts.saves;
        //   return [opts];
        // }
        if (opts.ability) {
            opts.name = opts.ability;
            return [opts];
        }

        // now we assume that each key is for a separate skill...
        return Object.keys(opts).reduce((out, key) => {
            let opt = opts[key];
            if (key == 'reset' || key == 'restore') {
                if (typeof opt == 'string') opt = [opt];
                opt.forEach((a) => {
                    out.push({ name: a, restore: true });
                });
            } else {
                if (typeof opt == 'number' || Array.isArray(opt)) {
                    opt = { bonus: opt };
                } else if (opt === true || opt === false) {
                    opt = { has: opt };
                } else if (opt == 'reset' || opt == 'restore') {
                    opt = { restore: true };
                } else if (opt == 'sustain') {
                    opt = { sustain: true };
                }
                out.push(Object.assign({ name: key }, opt));
            }
            return out;
        }, []);
    }
    */

    /*
    Skills

    Skills generally fall into 2 categories - binary and progressive.


    // Create a skills object
    const skills = new Skills();

    // set skills
    skills.set('diving', true); // = { has: true, level: 0 }
    skills.set('diving', 10); // = { has: true, level: 10 }

    skills.remove('diving'); // {}

    // adjustments
    skills.adjust('diving', { bonus: 1 });
    skills.adjust('diving', { disadvantage: true });
    skills.adjust('diving', { advantage: 3 });
    skills.adjust('diving', { fixed: 10 });
    skills.adjust('diving', { critical: 5 });





    */
    class Skill {
        constructor(name) {
            this.name = name;
        }
        get has() {
            return this._bool('_has');
        }
        get level() {
            return this._int('_level');
        }
        get disadvantage() {
            return this._bool('_disadvantage');
        }
        get advantage() {
            return this._bool('_advantage');
        }
        get fixed() {
            return this._int('_fixed');
        }
        get bonus() {
            const b = this._int('_bonus') || 0;
            if (!this._parent)
                return b;
            return b + this._parent.bonus;
        }
        get succeed() {
            return this._bool('_succeed');
        }
        get fail() {
            return this._bool('_fail');
        }
        set(value) {
            if (value === false) {
                this._has = false;
                this._level = 0;
            }
            else {
                this._has = true;
                this._level = value === true ? 0 : value;
            }
        }
        _value(name) {
            if (this[name] !== undefined) {
                // @ts-ignore
                return this[name];
            }
            if (this._parent) {
                // @ts-ignore
                return this._parent._value(name);
            }
            return undefined;
        }
        _bool(name) {
            return !!this._value(name);
        }
        _int(name) {
            return this._value(name);
        }
        adjust(adj) {
            Object.entries(adj).forEach(([key, value]) => {
                key = '_' + key;
                if (value === undefined)
                    return;
                if (key === '_fixed') {
                    if (typeof value !== 'number') {
                        throw new Error('fixed skill adjustment must be a number.');
                    }
                    value = Math.max(value, this._fixed || 0);
                }
                else if (key === '_bonus') {
                    if (typeof value !== 'number') {
                        throw new Error('fixed skill adjustment must be a number.');
                    }
                    value = value + (this._bonus || 0);
                }
                // @ts-ignore
                this[key] = value;
            });
        }
        clear(adj) {
            Object.keys(adj).forEach((key) => {
                key = '_' + key;
                // @ts-ignore
                if (this[key] !== undefined) {
                    // @ts-ignore
                    this[key] = undefined;
                }
            });
        }
    }
    class Skills {
        constructor(vals = {}) {
            this._skills = {};
            Object.entries(vals).forEach(([key, value]) => {
                this.set(key, value);
            });
        }
        set(name, value) {
            const s = this.get(name);
            s.set(value);
            return s;
        }
        get(name) {
            let s = this._skills[name];
            if (s)
                return s;
            s = this._skills[name] = new Skill(name);
            const index = name.lastIndexOf('.');
            if (index > 0) {
                s._parent = this.get(name.substring(0, index));
            }
            else {
                s.set(false);
            }
            return s;
        }
        adjust(name, adj) {
            if (typeof adj === 'number') {
                adj = { bonus: adj };
            }
            let s = this.get(name);
            s.adjust(adj);
            return s;
        }
    }

    // import * as GWM from 'gw-map';
    class Player extends Actor {
        constructor(kind) {
            super(kind);
        }
    }
    Player.default = {
        ch: '@',
        fg: 'white',
        name: 'You',
    };
    function make(options = {}) {
        const kind = new PlayerKind(options);
        return new Player(kind);
    }

    class PlayerKind extends ActorKind {
        constructor(opts = {}) {
            super((() => {
                if (!opts.sprite) {
                    opts.ch = opts.ch || Player.default.ch;
                    opts.fg = opts.fg || Player.default.fg;
                }
                if (!opts.name) {
                    opts.name = Player.default.name;
                }
                return opts;
            })());
            this.flags.actor |= GWM__namespace.flags.Actor.IS_PLAYER;
            this.attributes = new Attributes(opts.attributes || {});
            this.skills = new Skills(opts.skills || {});
        }
        make(options) {
            const actor = new Player(this);
            this.init(actor, options);
            return actor;
        }
    }

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Attributes: Attributes,
        attributes: attributes,
        installAttribute: installAttribute,
        makeAttributes: makeAttributes,
        Skills: Skills,
        PlayerKind: PlayerKind,
        Player: Player,
        make: make
    });

    const actions = {};
    function install(name, fn) {
        actions[name] = fn;
    }
    function get(name) {
        return actions[name];
    }

    // COMMANDS
    // this === GAME
    async function moveDir(actor, e) {
        const dir = e.dir;
        if (!actor.map || !dir)
            return false;
        const newPos = GWU__namespace.xy.add(actor, dir);
        const cell = actor.map.cell(newPos.x, newPos.y);
        if (!cell)
            return false;
        if (actor.avoidsCell(cell)) {
            GWM__namespace.fx.hit(actor.map, newPos, 'hit', 100, this.layer);
            // todo - should this cost a turn?  Or part of one?
            return false;
        }
        actor.map.removeActor(actor);
        actor.map.addActor(newPos.x, newPos.y, actor);
        return true;
    }
    install('moveDir', moveDir);

    async function pickup(actor, _ev) {
        if (!actor.map)
            return false;
        const item = actor.map.itemAt(actor.x, actor.y);
        if (!item) {
            GWU__namespace.message.addAt(actor.x, actor.y, 'Nothing to pickup.');
            return false;
        }
        const myItem = item;
        if (actor.avoidsItem(myItem))
            return false;
        let action = myItem.getAction('pickup');
        if (action === false) {
            GWU__namespace.message.addAt(actor.x, actor.y, 'You cannot pickup %{the.item}.', {
                item,
            });
            return false;
        }
        else if (typeof action === 'function') {
            // You have to do everything
            return action.call(myItem, actor);
        }
        // logs error messages
        if (!actor.canAddItem(myItem)) {
            return false;
        }
        if (!actor.map.removeItem(myItem)) {
            return false;
        }
        actor.addItem(myItem);
        return true;
    }
    install('pickup', pickup);

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        actions: actions,
        install: install,
        get: get,
        moveDir: moveDir,
        pickup: pickup
    });

    class Game {
        constructor(opts) {
            this.running = false;
            this.keymap = {};
            this.ui = new GWU__namespace.ui.UI(opts);
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
            const actors = this.map.actors.slice();
            for (let actor of actors) {
                this.draw();
                if (actor === this.player) {
                    await this.playerTurn(this.player);
                }
                else {
                    await actor.act();
                }
                await this.animate();
            }
            this.map.tick(50); // turn time
        }
        async animate() {
            if (!this.layer._tweens.length)
                return;
            const timer = setInterval(() => {
                const tick = GWU__namespace.io.makeTickEvent(16);
                this.ui.loop.pushEvent(tick);
            }, 16);
            while (this.layer._tweens.length) {
                const ev = await this.ui.loop.nextTick();
                if (ev && ev.dt) {
                    this.layer._tweens.forEach((a) => a && a.tick(ev.dt));
                    this.layer._tweens = this.layer._tweens.filter((a) => a && a.isRunning());
                }
                this.draw();
            }
            clearInterval(timer);
        }
        async playerTurn(player) {
            let done = false;
            const timer = setInterval(() => {
                const tick = GWU__namespace.io.makeTickEvent(16);
                this.ui.loop.pushEvent(tick);
            }, 16);
            while (!done) {
                const ev = await this.ui.loop.nextEvent(-1);
                if (ev) {
                    if (ev.type === GWU__namespace.io.KEYPRESS) {
                        const handler = GWU__namespace.io.handlerFor(ev, this.keymap);
                        if (handler) {
                            if (typeof handler === 'string') {
                                const action = get(handler);
                                if (action) {
                                    action.call(this, player, ev);
                                    done = true;
                                }
                            }
                            else if (typeof handler === 'function') {
                                handler.call(this, player, ev);
                                done = true;
                            }
                        }
                    }
                    else if (ev.type === GWU__namespace.io.TICK) {
                        this.layer.tick(ev); // timeouts
                    }
                }
            }
            clearInterval(timer);
        }
    }

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Game: Game
    });

    exports.action = index$1;
    exports.actor = index$3;
    exports.game = index;
    exports.item = index$4;
    exports.player = index$2;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gw-entity.js.map
