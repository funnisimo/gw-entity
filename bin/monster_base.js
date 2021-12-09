const GWU = require('gw-utils');
const term = require('terminal-kit').terminal;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

function processMonsterBase(dir) {
    const name = dir + 'monster_base.txt';
    let outname = name.replace('.txt', '.js');

    const gd = outname.indexOf('/gamedata');
    if (gd < 0) {
        if (outname !== './monster_base.js') {
            term.red('Cannot figure out directory structure.\n');
            process.exit(1);
        }
        outname = '../docs/gamedata/monster_base.js';
    } else {
        const prefix = outname.substring(0, gd);
        if (prefix == '.') {
            outname = './docs/gamedata/monster_base.js';
        } else {
            outname = prefix + '/docs' + outname.substring(gd);
        }
    }

    term.green('Processing... ' + name + ' >> ' + outname + '\n');

    // term.blue('writing to : ' + outname + '\n');

    const stream = fs.createReadStream(name);
    const rl = readline.createInterface({ input: stream });

    const output = fs.createWriteStream(outname);

    let current = null;
    const defaults = {};
    let started = false;

    const all_flags = {};
    const all_glyphs = {};
    const all_ids = {};

    rl.on('line', function (line) {
        if (line.startsWith('#')) {
            output.write('// ' + line + '\n');
        } else if (line.length == 0) {
            output.write('\n');
        } else {
            if (line.startsWith('name:')) {
                if (current) {
                    output.write(
                        current.id + ' : ' + JSON.stringify(current) + ',\n\n'
                    );
                } else if (!started) {
                    output.write('var monster_base = {\n');
                    started = true;
                }
                current = Object.assign({}, defaults);

                const name = line.substring(5);
                current.id = name.replace(/[ ]+/g, '_').toUpperCase();
                current.name = name;
                all_ids[current.id] = true;
            } else if (line.startsWith('flags')) {
                parts = line.split(':');
                let flags = parts[1];

                flags
                    .split('|')
                    .map((f) => f.trim())
                    .forEach((f) => {
                        all_flags[f] = true;
                    });

                const existing = current.flags || '';
                if (existing.length) {
                    flags = ' | ' + flags;
                }

                current.flags = existing + flags;
            } else if (line.startsWith('glyph:')) {
                const glyph = line[6];
                all_glyphs[glyph] = true;
                current.ch = glyph;
            } else if (line.startsWith('pain:')) {
                current.pain = line.substring(5);
            } else {
                parts = line.split(':');
                current[parts[0]] = parts[1];
            }
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
        term.green('monster_base.js\n');
        term.green('==========================\n');

        term.white('All Base Types: ');
        term.cyan(Object.keys(all_ids).sort().join(', '));
        term.white('\n');

        term.white('All Flags: ');
        term.cyan(Object.keys(all_flags).sort().join(', '));
        term.white('\n');

        term.white('All Glyphs: ');
        term.green(Object.keys(all_glyphs).sort().join(' '));
        term.white('\n');

        _done();
    });

    return new Promise((resolve) => {
        _done = resolve;
    });
}

module.exports = processMonsterBase;
