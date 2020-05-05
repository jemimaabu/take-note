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
    noteTitle.className = "note-title";
    noteTitle.innerHTML = title;

    var noteEdit = document.createElement("span");
    noteEdit.className = "note-edit";
    noteEdit.innerHTML = "Edit";
    noteEdit.setAttribute("onclick", `editNote(${document.getElementsByClassName("note").length})`);

    var noteSave = document.createElement("span");
    noteSave.className = "note-save";
    noteSave.innerHTML = "Save";
    noteSave.setAttribute("disabled", "true");
    noteSave.setAttribute("onclick", `saveNote(${document.getElementsByClassName("note").length})`);

    var noteExpand = document.createElement("span");
    noteExpand.className = "note-expand";
    noteExpand.innerHTML = "Expand";
    noteExpand.setAttribute("onclick", `expandNote(${document.getElementsByClassName("note").length})`);

    var noteDelete = document.createElement("span");
    noteDelete.className = "note-delete";
    noteDelete.innerHTML = "Delete";
    noteDelete.setAttribute("onclick", `deleteNote(${document.getElementsByClassName("note").length})`);

    var noteControls = document.createElement("div");
    noteControls.className = "note-controls";
    noteControls.append(noteExpand, noteEdit, noteSave, noteDelete)

    var noteText = document.createElement("div");
    noteText.className = "note-text";
    noteText.innerHTML = text;

    var noteDate = document.createElement("div");
    noteDate.className = "note-date";
    noteDate.innerHTML = date;

    var note = document.createElement("div");
    note.className = "note";
    note.append(noteTitle, noteControls, noteText, noteDate)
    note.id = "note" + document.getElementsByClassName("note").length;

    notesWrapper.insertBefore(note, notesWrapper.firstChild)
}

function addNote() {
    if (content.value.trim() === "") {
        error.innerHTML = "Note cannot be empty"
    } else {
        var options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        var noteContainer = {
            title: title.value,
            text: content.value,
            date: new Date().toLocaleString('en-US', options),
        };
        notesArray.push(noteContainer);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        createNote(noteContainer.title, noteContainer.text, noteContainer.date);
        error.innerHTML = "";
        content.value = "";
        title.value = "";
    }
}

function deleteNote(index) {
    var note = document.getElementById(`note${index}`);
    note.parentNode.removeChild(note);
    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    location.reload();
}

function editNote(index) {
    var note = document.getElementById(`note${index}`);
    var noteTitle = note.getElementsByClassName("note-title")[0];
    var noteText = note.getElementsByClassName("note-text")[0];
    var noteSave = note.getElementsByClassName("note-save")[0];
    noteTitle.contentEditable = "true";
    noteText.contentEditable = "true";
    noteSave.setAttribute("disabled", "false");
    noteTitle.focus();
    expandNote(index)
}

function saveNote(index) {
    var note = document.getElementById(`note${index}`);
    var noteTitle = note.getElementsByClassName("note-title")[0];
    var noteText = note.getElementsByClassName("note-text")[0];
    var noteSave = note.getElementsByClassName("note-save")[0];
    if (noteText.innerHTML.trim() === "") {
        error.innerHTML = "Cannot save empty note"
    } else {
        notesArray[index].title = noteTitle.innerHTML;
        notesArray[index].text = noteText.innerHTML;
        noteTitle.contentEditable = "false";
        noteText.contentEditable = "false";
        localStorage.setItem("notes", JSON.stringify(notesArray));
        error.innerHTML = "";
        noteSave.setAttribute("disabled", "true");
        shrinkNote(index)
    }
}

function expandNote(index) {
    var note = document.getElementById(`note${index}`);
    var noteText = note.getElementsByClassName("note-text")[0];
    var noteExpand = note.getElementsByClassName("note-expand")[0];
    noteText.style.maxHeight = "fit-content";
    noteExpand.innerHTML = "Minimize";
    noteExpand.setAttribute("onclick", `shrinkNote(${index})`)
}

function shrinkNote(index) {
    var note = document.getElementById(`note${index}`);
    var noteText = note.getElementsByClassName("note-text")[0];
    var noteExpand = note.getElementsByClassName("note-expand")[0];
    noteText.style.maxHeight = "10vh";
    noteExpand.innerHTML = "Expand";
    noteExpand.setAttribute("onclick", `expandNote(${index})`)
}