const GWU = require('gw-utils');
const GWE = require('../dist/gw-entity');

const term = require('terminal-kit').terminal;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// type:1
// message:shrug[s] off the attack.
// message:grunt[s] with pain.
// message:cr[ies|y] out in pain.
// message:scream[s] in pain.
// message:scream[s] in agony.
// message:writhe[s] in agony.
// message:cr[ies|y] out feebly.

function processPain(dir) {
    const name = dir + 'pain.txt';
    let outname = name.replace('.txt', '.js');

    term.green('Processing... ' + name + ' >> ' + outname + '\n');

    const gd = outname.indexOf('/gamedata');
    if (gd < 0) {
        if (outname !== './pain.js') {
            term.red('Cannot figure out directory structure.\n');
            process.exit(1);
        }
        outname = '../docs/gamedata/pain.js';
    } else {
        const prefix = outname.substring(0, gd);
        if (prefix == '.') {
            outname = './docs/gamedata/pain.js';
        } else {
            outname = prefix + '/docs' + outname.substring(gd);
        }
    }

    // term.blue('writing to : ' + outname + '\n');

    const stream = fs.createReadStream(name);
    const rl = readline.createInterface({ input: stream });

    const output = fs.createWriteStream(outname);

    let current = null;
    let id = '';
    let count = 0;

    output.write('// const GWE = require("../dist/gw-entity");\n\n');

    rl.on('line', function (line) {
        if (line.startsWith('#')) {
            output.write('// ' + line + '\n');
        } else if (line.length == 0) {
            output.write('\n');
        } else {
            if (line.startsWith('type:')) {
                ++count;
                id = line.substring(5);
                if (current && current.length) {
                    output.write(
                        'GWE.actor.installPain( "' +
                            id +
                            '", ' +
                            JSON.stringify(current) +
                            ');\n'
                    );
                }
                current = [];
            } else if (line.startsWith('message:')) {
                current.push(line.substring(8));
            }
        }
    });

    rl.on('close', () => {
        if (current && current.length) {
            output.write(
                'GWE.actor.installPain( "' +
                    id +
                    '", ' +
                    JSON.stringify(current) +
                    ');\n'
            );
        }
        // term.green('read done\n');
        output.end();
    });

    let _done;

    output.on('finish', () => {
        // term.green('write done.\n');

        term.green('==========================\n');
        term.green('pain.js\n');
        term.green('==========================\n');
        term.white('Count: ').green('' + count + '\n');

        _done();
    });

    return new Promise((resolve) => {
        _done = resolve;
    });
}

module.exports = processPain;
