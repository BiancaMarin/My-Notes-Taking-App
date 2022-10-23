const form = document.querySelector('[data-form]');
const inputTitle = form.elements.title;
const inputNote = form.elements.note;
const displaySection = document.querySelector('[data-display]');
const inputTitleError = document.querySelector('[data-error-title]');
const inputNoteError = document.querySelector('[data-error-note]');

//getting notes from local storage//
let notes = JSON.parse(localStorage.getItem('notes') || '[]');

//keypress validation//
inputTitle.addEventListener('keydown', handleKeydownTitle);
function handleKeydownTitle() {
  inputTitleError.innerText = '';
}

inputNote.addEventListener('keydown', handleKeydownNote);
function handleKeydownNote() {
  inputNoteError.innerText = '';
}

//form validation//
form.addEventListener('submit', handleClick);

function handleClick(e) {
  e.preventDefault();

  if (!inputTitle.value.trim() && !inputNote.value.trim()) {
    inputTitleError.innerText = 'Please enter a note title.';
    inputNoteError.innerText = 'Please add a description to the note.';
    inputTitleError.classList.add('error');
    inputNoteError.classList.add('error');
  } else {
    let noteObj = {
      title: inputTitle.value,
      desc: inputNote.value,
    };

    //adding and saving notes to local storage//
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));

    inputTitle.value = '';
    inputNote.value = '';

    displayNotes();
  }
}

//display notes//
function displayNotes() {
  document.querySelectorAll('article').forEach((note) => note.remove());
  notes.forEach((note) => {
    const card = document.createElement('article');
    card.classList.add('card');
    const title = document.createElement('h1');
    title.innerText = note.title;
    const noteDescription = document.createElement('p');
    noteDescription.innerText = note.desc;
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete note';
    deleteButton.classList.add('delete-btn');
    card.append(title, noteDescription, deleteButton);
    displaySection.append(card);

    deleteButton.addEventListener('click', handleDeleteNote);
  });
}

displayNotes();

//delete notes//
function handleDeleteNote(noteId) {
  notes.splice(noteId, 1);

  //update local storage//
  localStorage.setItem('notes', JSON.stringify(notes));

  displayNotes();
}
