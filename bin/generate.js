const GWU = require('gw-utils');
const term = require('terminal-kit').terminal;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const processObjectBase = require('./object_base');
const processObject = require('./object');
const processPain = require('./pain');
const processMonsterBase = require('./monster_base');

function exists(filePath) {
    return fs.existsSync(filePath);
}

if (exists('./object_base.txt')) {
    term.green('Using current directory.\n');
    processDir('./');
} else if (exists('./gamedata/object_base.txt')) {
    term.green('Using ./gamedata directory.\n');
    processDir('./gamedata/');
} else {
    term.red(
        'Failed to find gamedata.  Please run from a different directory.'
    );
    process.exit(1);
}

async function processDir(dir) {
    await processObjectBase(dir);
    await processObject(dir);
    await processPain(dir);
    await processMonsterBase(dir);
}
