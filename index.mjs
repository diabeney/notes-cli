/* eslint-disable node/no-missing-import */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
import * as readline from 'node:readline/promises';
import chalk from 'chalk';
import { shortCut } from './lib/lib.mjs';


const error = chalk.red;
const success = chalk.green;
const maintext = chalk.blue;
const info = chalk.hex('#ffa500');



let notes = [];
const isShortcut = (text) => /^add\s+-t\s+['"]([^'"]+)['"]\s+-b\s+['"]([^'"]+)['"]$/.test(text);
const prompt = maintext('>> ');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function resetConsole() {
    rl.setPrompt(prompt);
    rl.prompt();
}

resetConsole()

const COMMANDS = [
    {
        command: 'add', 
        description: 'add a new entry to the Notes'
    }, 
    {
        command: 'delete', 
        description: 'delete specified title from the Notes'
    }, 
    {
        command: 'list', 
        description: 'list all notes'
    }, 
    {
        command: 'leave', 
        description: 'exit the program'
    }, 
    {
        command: '--help', 
        description: 'provides a documentation on how to use the application'
    }, 
]

function saveNote(obj) {
    notes.push(obj)
};

async function addNote() {
    const noteTitle = await rl.question('Title: ');
    const noteBody = await rl.question('Body: ');
    if(!noteBody || !noteTitle) {
        console.log(error('Title or Body cannot be empty!'));
        console.log(`note save ${error('unsuccessful')}`);
    } else {
        const note = {title: noteTitle, body: noteBody};
        saveNote(note);
        console.log(success('Note saved successfully!'));
    }
    resetConsole()
}

function deleteNote(title) {
    if(!title) {
        console.log(error('Specify the title of the note to be deleted'));
        resetConsole();
        return;
    }
    const item = notes.find(note => note.title.toLowerCase() === title.toLowerCase());
    if(item) {
        notes = notes.filter(note => note.title !== item.title);
        console.log(`Note Title ${maintext(`'${item.title}'`)} has been deleted ${success('successfully!')}`);
    } else {
        console.log(error(`Note with title "${title}" does not exist.`))
    }
    resetConsole()
};
function listNotes() {
    console.log(info('----All notes----\n'))
    notes.forEach((note, i) => {
        const format = `${i + 1}. Title: "${note.title}"\tBody: "${note.body}"\n`;
        console.log(format);
    })
    resetConsole();
};

function closeInterface() {
    console.log(info('Leaving notes...'))
    rl.close();
}

function usage() {
    console.log(info('------Usage-------\n'));
    console.log(`***Enter any of the following commands to start using Notes**\n\n ${info('add, delete [title], list, leave')}\n`);
    COMMANDS.forEach(cmd => {
    let format;
    if(cmd.command === 'delete') {
        format = `${maintext(cmd.command)} ${maintext('[title]')}, ${info(`--${cmd.description}`)}\n`
    } else {
        format = `${maintext(cmd.command)}, ${info(`--${cmd.description}`)}\n`;
    }
    console.log(format);
})
resetConsole();
}

function invalidCommand() {
    const msg = `${error('Invalid Command')}\n\ntype ${maintext('--help')} to see how to use this application.`
    console.log(msg);
    resetConsole();
}

rl.on('line', (ans) => {
    if(isShortcut(ans)) {
        const note = shortCut(ans);
        saveNote(note);
        console.log(success('Note saved successfully!'));
        resetConsole();
        return;
    };
    const input = ans.trim().split(' ');
    const cmd = input[0];
    const args = input.splice(1).join(' ');

    switch(cmd) {
        case COMMANDS[0].command:
            addNote();
            return;
        case COMMANDS[1].command:
            deleteNote(args);
            return;
        case COMMANDS[2].command:
            listNotes();
            return;
        case COMMANDS[3].command:
            closeInterface();
            return;
        case '--help':
            usage();
            return;
        default:
            invalidCommand();
    }
})

rl.on('close', () => {
    closeInterface();
})