/* eslint-disable no-console */
// eslint-disable-next-line node/no-missing-require, import/no-unresolved
const readline = require('node:readline/promises')

// TODO: IMPLEMENT EXIT COMMAND
// TODO: FORMAT LIST VIEW
// TODO: IMPLEMENT USAGE FUNCTION
// TODO: ORGANISE CODE
// TODO: TRY STORING DATA AS JSON
// TODO: BEAUTIFY WITH CHALK


const prompt = '>> ';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function resetConsole() {
    rl.setPrompt(prompt);
    rl.prompt();
}

resetConsole();

const CMDS = {
    ADD: {
        command: 'add',
        description: 'Add a new entry to the Notes'
    },
    DELETE: {
        command: 'delete',
        description: 'Deletes an entry from the Notes'
    },
    LIST: {
        command: 'list',
        description: 'Lists all notes'
    },
    CLEAR: {
        command: '.clear',
        description: 'Exit the program'
    }
}

let notes = [];


function saveNote(obj) {
    notes.push(obj)
};

async function addNote() {
    const noteTitle = await rl.question('Title: ');
    const noteBody = await rl.question('Body: ')
    const note = {title: noteTitle, body: noteBody};
    saveNote(note);
    console.log('Note saved successfully!');
    resetConsole()
}


function deleteNote(title) {
    const item = notes.find(note => note.title === title);
    if(item) {
        notes = notes.filter(note => note.title !== title);
        console.log(`Note Title '${item.title}' has been deleted successfully!`);
    } else {
        console.error('Specify the title of the note to be deleted');
    }
    resetConsole()
};
function listNotes() {
    console.log(notes);
    resetConsole();
};

function closeInterface() {
    console.log('Exiting notes...')
    rl.close();
}
// function usage() {
//     return  `Usage: `
// }

rl.on('line', (ans) => {
    const input = ans.split(' ');
    const cmd = input[0];
    const args = input.splice(1).join(' ');
    switch(cmd) {
        case CMDS.ADD.command:
            addNote(args);
            break;
        case CMDS.DELETE.command:
            deleteNote(args);
            break;
        case CMDS.LIST.command:
            listNotes();
            break;
        case CMDS.CLEAR.command:
            closeInterface();
            break;
        default:
    }
})

rl.on('close', () => {
    closeInterface();
})