const apiBaseUrl = "http://localhost:3001/app";

document.getElementById("addNoteBtn").addEventListener("click", async () => {
  const noteContent = document.getElementById("newNote").value;

  if (noteContent) {
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: noteContent }),
    });

    const newNote = await response.json();
    displayNote(newNote);
    document.getElementById("newNote").value = "";
  }
});

async function fetchNotes() {
  const response = await fetch(apiBaseUrl);
  const notes = await response.json();
  notes.forEach((note) => displayNote(note));
}

function displayNote(note) {
  const noteItem = document.createElement("li");
  noteItem.textContent = note.content;
  noteItem.id = `note-${note.id}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteNote(note.id);
  noteItem.appendChild(deleteBtn);

  document.getElementById("notesList").appendChild(noteItem);
}

async function deleteNote(id) {
  await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });
  document.getElementById(`note-${id}`).remove();
}

fetchNotes();
