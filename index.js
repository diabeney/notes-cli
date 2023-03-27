
const readline = require('readline');
// const fs = require('fs');
/**
 * Create a Todo 
 * Delete a todo
 * list all todos
 */
const prompt = '>>';
const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt(prompt);
rl.prompt();

const CMDS = {
    ADD: {
        command: 'add',
        flag: '-a',
        description: 'Add a new entry to the Notes'
    },
    DELETE: {
        command: 'delete',
        flag: '-d',
        description: 'Deletes an entry from the Notes'
    },
    LIST: {
        command: 'list',
        flag: '-l',
        description: 'Lists all notes'
    },
}

const notes = [];


function saveNote(obj) {
    notes.push(obj)
};

function addNote(noteTitle) {
    let noteBody;
    if(!noteTitle) throw new Error('Please provide a title');
    rl.question(`What's the body of the note: `, (ans) => {
        noteBody = ans;
        rl.setPrompt(prompt);
        rl.prompt();
    })
    saveNote({title: noteTitle, body: noteBody});
    console.log('note added successfully!');
}



function deleteNote() {};
function listNotes() {};
// function usage() {
//     return  `Usage: `
// }

rl.on('line', (input) => {
    const args = input.split(' ');
    const cmd = args[0];
    const body = args.splice(1).join(' ');
    switch(cmd) {
        case CMDS.ADD.command:
            addNote(body);
            break;
        case CMDS.DELETE:
            deleteNote();
            break;
        case CMDS.LIST:
            listNotes();
            break
        default:
    }
})
