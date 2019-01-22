var notesWrapper = document.getElementById("notes-wrapper");
var title = document.getElementById("title")
var content = document.getElementById("content");
var error = document.getElementById("form-error");

let notesArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

localStorage.setItem('notes', JSON.stringify(notesArray));
const data = JSON.parse(localStorage.getItem('notes'));

data.forEach(note => {
    createNote(note.title, note.text, note.date);
});

function createNote(title, text, date) {
    var noteTitle = document.createElement("div");
    noteTitle.className="note-title";
    noteTitle.innerHTML = title;

    var noteText = document.createElement("div");
    noteText.className = "note-text";
    noteText.innerHTML = text;

    var noteDate = document.createElement("div");
    noteDate.className="note-date";
    noteDate.innerHTML = date;

    var note = document.createElement("div");
    note.className = "note";
    note.append(noteTitle, noteText, noteDate)
    note.id = "note"+document.getElementsByClassName("note").length;

    notesWrapper.insertBefore(note, notesWrapper.firstChild)
}

function addNote() {
    if (content.value === "") {
        error.innerHTML = "Form cannot be empty"
    } else {
        var noteContainer = {
            title: title.value,
            text: content.value,
            date: new Date().toLocaleString()
        }
        notesArray.push(noteContainer);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        createNote(noteContainer.title, noteContainer.text, noteContainer.date);
        error.innerHTML = "";
        content.value = "";
        title.value = "";
    }
}

function deleteAll() {
    localStorage.clear();
    notesWrapper.innerHTML = "";
    notes = [{}];
}