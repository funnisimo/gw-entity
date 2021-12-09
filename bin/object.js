const GWU = require('gw-utils');
const term = require('terminal-kit').terminal;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// function getCurrentDirectoryBase() {
//     return path.basename(process.cwd());
// }

const colors = {
    D: 'dark_gray',
    w: 'white',
    s: 'gray',
    o: 'orange',
    r: 'red',
    g: 'green',
    b: 'blue',
    u: 'umber',
    W: 'light_gray',
    P: 'light_purple',
    y: 'yellow',
    R: 'light_red',
    G: 'light_green',
    B: 'light_blue',
    U: 'light_umber',
    p: 'purple',
    v: 'violet',
    t: 'teal',
    m: 'mud',
    Y: 'light_yellow',
    i: 'pink',
    T: 'light_teal',
    V: 'light_violet',
    I: 'light_pink',
    M: 'mustard',
    z: 'blue_slate',
    Z: 'deep_light_blue',
    d: 'flavoured',
};

function processObject(dir) {
    const name = dir + 'object.txt';
    let outname = name.replace('.txt', '.js');

    term.green('Processing... ' + name + ' >> ' + outname + '\n');

    const gd = outname.indexOf('/gamedata');
    if (gd < 0) {
        if (outname !== './object.js') {
            term.red('Cannot figure out directory structure.\n');
            process.exit(1);
        }
        outname = '../docs/gamedata/object.js';
    } else {
        const prefix = outname.substring(0, gd);
        if (prefix == '.') {
            outname = './docs/gamedata/object.js';
        } else {
            outname = prefix + '/docs' + outname.substring(gd);
        }
    }

    // term.blue('writing to : ' + outname + '\n');

    const stream = fs.createReadStream(name);
    const rl = readline.createInterface({ input: stream });

    const output = fs.createWriteStream(outname);

    let current = null;
    const defaults = {};
    let started = false;

    const todo = {};
    const all_flags = {};
    const all_colors = {};
    const all_effects = {};
    const all_effect_targets = {};
    const all_slay = {};

    let last_line = '';

    rl.on('line', function (line) {
        if (line.startsWith('#')) {
            output.write('// ' + line + '\n');
        } else if (line.length == 0) {
            output.write('\n');
        } else {
            const parts = line.split(':');
            if (line.startsWith('name:')) {
                if (current) {
                    output.write(
                        current.id + ' : ' + JSON.stringify(current) + ',\n\n'
                    );
                } else if (!started) {
                    output.write('var objects = {\n');
                    started = true;
                }
                current = Object.assign({}, defaults);
                current.id = parts[1]
                    .replace('&', '')
                    .replace('~', '')
                    .trim()
                    .replace(/-/g, '_')
                    .replace(/'/g, '')
                    .replace(/ +/g, '_')
                    .replace(/\*/g, '_')
                    .replace(/[<>]/g, '')
                    .toUpperCase();
                current.name = parts[1];
            } else if (line.startsWith('type:')) {
                current.base = parts[1];
            } else if (line.startsWith('alloc:')) {
                const fromTo = parts[2].split(' to ');
                current.frequency = current.frequency || {};
                key = fromTo[0] + '-' + fromTo[1];
                current.frequency[key] = Number.parseInt(parts[1]);
            } else if (line.startsWith('attack:')) {
                current.combat = current.combat || {};
                current.combat.damage = parts[1];
                current.combat.toHit = parts[2];
                current.combat.toDamage = parts[3];
            } else if (line.startsWith('armor:')) {
                current.combat = current.combat || {};
                current.combat.armor = parts[1];
                current.combat.toArmor = parts[2];
            } else if (line.startsWith('charges:')) {
                current.charges = parts[1];
            } else if (line.startsWith('cost:')) {
                current.cost = parts[1];
            } else if (line.startsWith('curse:')) {
                current.curse = current.curse || {};
                current.curse[parts[1]] = parts[2];
            } else if (line.startsWith('desc:')) {
                current.desc = current.desc || '';
                current.desc += line.substring(5);
            } else if (line.startsWith('dice:')) {
                if (last_line !== 'effect') {
                    term.red('DICE without effect!\n');
                } else {
                    current.effects[current.effects.length - 1] +=
                        line.substring(4);
                }
            } else if (line.startsWith('effect:')) {
                if (!current.effects) {
                    current.effects = [];
                }
                current.effects.push(line.substring(7));
                all_effects[parts[1]] = true;
                if (
                    [
                        'ALTER',
                        'ARC',
                        'BREATH',
                        'BOLT_OR_BEAM',
                        'BEAM',
                        'BOLT',
                        'BALL',
                        'BOLT_AWARE',
                        'BOLT_STATUS_DAM',
                        'CURE',
                        'DRAIN_STAT',
                        'LINE',
                        'BOLT_STATUS',
                        'PROJECT_LOS',
                        'PROJECT_LOS_AWARE',
                        'RESTORE_STAT',
                        'SPOT',
                        'TIMED_DEC',
                        'TIMED_INC',
                        'TIMED_INC_NO_RES',
                    ].includes(parts[1])
                ) {
                    all_effect_targets[parts[2]] = true;
                }
            } else if (line.startsWith('effect-yx:')) {
                if (last_line !== 'effect') {
                    term.red('EFFECT-YX without effect!\n');
                } else {
                    current.effects[current.effects.length - 1] +=
                        ':' + parts[2] + ':' + parts[1];
                }
            } else if (line.startsWith('expr')) {
                if (last_line !== 'dice') {
                    term.red('EXPR without dice!');
                } else {
                    const last_effect =
                        current.effects[current.effects.length - 1];
                    if (!last_effect.includes('$' + parts[1])) {
                        term.red('EXPR - not found in effect dice!!!');
                    } else {
                        const expr = `/$${parts[1]}=${parts[2]} ${parts[3]}`;
                        current.effects[current.effects.length - 1] += expr;
                    }
                }
            } else if (line.startsWith('flags:')) {
                let flags = parts[1];

                flags
                    .split('|')
                    .map((f) => f.trim())
                    .filter((f) => f.length > 0)
                    .forEach((f) => {
                        all_flags[f] = true;
                    });

                const existing = current.flags || '';
                if (existing.length) {
                    flags = ' | ' + flags;
                }

                current.flags = existing + flags;
            } else if (line.startsWith('graphics:')) {
                const color = colors[parts[2]] || parts[2].replace(' ', '_');
                all_colors[color] = true;
                current.sprite = { ch: parts[1], fg: color };
            } else if (line.startsWith('level:')) {
                current.level = parts[1];
            } else if (line.startsWith('msg:')) {
                current.msg = parts[1];
            } else if (line.startsWith('pile:')) {
                current.pile = { chance: parts[1], qty: parts[2] };
            } else if (line.startsWith('power:')) {
                current.power = parts[1];
            } else if (line.startsWith('pval:')) {
                current.pval = parts[1];
            } else if (line.startsWith('slay:')) {
                current.slay = parts[1];
                all_slay[parts[1]] = true;
            } else if (line.startsWith('time:')) {
                current.recharge_time = parts[1];
            } else if (line.startsWith('vis-msg:')) {
                current.msgVis = line.substring(8);
            } else if (line.startsWith('weight:')) {
                current.weight = parts[1];
            } else if (line.startsWith('values:')) {
                const values = (current.values = current.values || {});

                parts[1]
                    .split('|')
                    .map((f) => f.trim())
                    .filter((f) => f.length > 0)
                    .forEach((f) => {
                        const div = f.indexOf('[');
                        const type = f.substring(0, div);
                        const amt = Number.parseInt(f.substring(div + 1));

                        values[type] = amt;
                        all_effect_targets[type] = true;
                    });
            } else {
                key = parts.shift();
                current[key] = parts.join(' | ');
                todo[key] = true;
            }
            last_line = parts[0];
        }
    });

    rl.on('close', () => {
        if (current) {
            output.write(
                current.id + ' : ' + JSON.stringify(current) + ',\n\n'
            );
        }
        if (started) {
            output.write('}\n');
        }
        // term.green('read done\n');
        output.end();
    });

    let _done;

    output.on('finish', () => {
        // term.green('write done.\n');
        term.green('===========================\n');
        term.green('object.js\n');
        term.green('==========================\n');
        term.white('All Flags: ');
        term.cyan(Object.keys(all_flags).sort().join(', '));
        term.white('\n');

        term.white('All Colors: ');
        Object.keys(all_colors)
            .sort()
            .forEach((c) => {
                if (GWU.color.colors[c]) {
                    term.green(c + ', ');
                } else {
                    term.red(c + ', ');
                }
            });
        term.white('\n');

        term.white('All effects: ');
        Object.keys(all_effects)
            .sort()
            .forEach((c) => {
                term.red(c + ', ');
            });
        term.white('\n');

        term.white('All effect Targets: ');
        Object.keys(all_effect_targets)
            .sort()
            .forEach((c) => {
                term.red(c + ', ');
            });
        term.white('\n');

        term.white('All Slay Targets: ');
        Object.keys(all_slay)
            .sort()
            .forEach((c) => {
                term.red(c + ', ');
            });
        term.white('\n');

        const tf = Object.keys(todo);

        if (tf.length) {
            term.white('Unknown Fields: ');
            tf.sort().forEach((c) => {
                term.red(c + ', ');
            });
            term.white('\n');
        }

        _done();
    });

    return new Promise((resolve) => {
        _done = resolve;
    });
}

module.exports = processObject;
