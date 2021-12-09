const GWU = require('gw-utils');
const term = require('terminal-kit').terminal;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// // function getCurrentDirectoryBase() {
// //     return path.basename(process.cwd());
// // }

// function exists(filePath) {
//     return fs.existsSync(filePath);
// }

// if (exists('./object_base.txt')) {
//     term.green('In current directory.\n');
//     processObjectBase('./object_base.txt');
// } else if (exists('./gamedata/object_base.txt')) {
//     term.green('In <gamedata> directory.\n');
//     processObjectBase('./gamedata/object_base.txt');
// } else {
//     term('Choose a file: ');

//     term.fileInput({ baseDir: './' }, function (error, input) {
//         if (error) {
//             term.red.bold('\nAn error occurs: ' + error + '\n');
//             process.exit(1);
//         } else if (!input.endsWith('/object_base.txt')) {
//             term.red.bold('\nYou must select the "object_base.txt" file.\n');
//             process.exit(1);
//         }
//         processObjectBase(input);
//     });
// }

function processObjectBase(dir) {
    const name = dir + 'object_base.txt';
    let outname = name.replace('.txt', '.js');

    term.green('Processing... ' + name + ' >> ' + outname + '\n');

    const gd = outname.indexOf('/gamedata');
    if (gd < 0) {
        if (outname !== './object_base.js') {
            term.red('Cannot figure out directory structure.\n');
            process.exit(1);
        }
        outname = '../docs/gamedata/object_base.js';
    } else {
        const prefix = outname.substring(0, gd);
        if (prefix == '.') {
            outname = './docs/gamedata/object_base.js';
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

    const all_flags = {};
    const all_colors = {};
    const all_tvals = {};

    rl.on('line', function (line) {
        if (line.startsWith('#')) {
            output.write('// ' + line + '\n');
        } else if (line.length == 0) {
            output.write('\n');
        } else {
            if (line.startsWith('default:')) {
                const parts = line.split(':');
                if (parts[1] === 'break-chance') {
                    parts[1] = 'break';
                }
                defaults[parts[1]] = parts[2];
            } else if (line.startsWith('name')) {
                if (current) {
                    output.write(
                        current.id + ' : ' + JSON.stringify(current) + ',\n\n'
                    );
                } else if (!started) {
                    output.write('var object_base = {\n');
                    started = true;
                }
                const parts = line.split(':');
                current = Object.assign({}, defaults);
                current.id = parts[1].replace(' ', '_');
                current.name = parts[2] || parts[1];
                all_tvals[current.id] = true;
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
            } else {
                parts = line.split(':');
                if (line.startsWith('graphics')) {
                    parts[1] = parts[1].replace(' ', '_');
                    all_colors[parts[1]] = true;
                }
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
        term.green('===========================\n');
        term.green('object_base.js\n');
        term.green('==========================\n');

        term.white('All Base Types: ');
        term.cyan(Object.keys(all_tvals).sort().join(', '));
        term.white('\n');

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

        _done();
    });

    return new Promise((resolve) => {
        _done = resolve;
    });
}

module.exports = processObjectBase;
