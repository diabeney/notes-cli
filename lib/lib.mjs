/* eslint-disable import/prefer-default-export */
export function shortCut(text) {
    const regex = /^add\s+-t\s+['"]([^'"]+)['"]\s+-b\s+['"]([^'"]+)['"]$/;
    const [validInput, noteTitle, noteBody]  = text.match(regex);
    if(validInput) {
        return {title: noteTitle, body: noteBody};
    }
    return 'Invalid input';
}



