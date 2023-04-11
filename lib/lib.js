/* eslint-disable no-console */
// eslint-disable-next-line node/no-unsupported-features/es-syntax

// import assert from 'assert';
const {strictEqual} = require('assert')

function format(text) {
    const reg = /[add] [-t]/;
    return reg.test(text) ? text : 'not passed';
}

strictEqual(format('add'), 'add');

