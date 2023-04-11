/* eslint-disable no-console */
// eslint-disable-next-line node/no-unsupported-features/es-syntax

// import assert from 'assert';
// const {strictEqual} = require('assert')

function format(text) {
    const regex = /^add\s+-t\s+['"]([^'"]+)['"]\s+-b\s+['"]([^'"]+)['"]$/;
    const match = regex.exec(text);
    console.log(match);
    // return regex.test(text) ? 'passed' : 'not passed';
}

// strictEqual(format('add -t "title goes here" -b "body goes here"'), 'passed');
format(`add -t "some text here" -b "some text here"`);


