const form = document.querySelector('form')
form.addEventListener('submit', submitNewNote)

function submitNewNote(e) {
  e.preventDefault()

  const formData = new FormData(form)
  const json = {}
  formData.forEach((value, key) => json[key] = value)
  clearInputs()
  console.log(json)
  appendNote(json)
}

function clearInputs() {
  const name = document.querySelector('input[name="name"]')
  const message = document.querySelector('input[name="message"]')
  name.value = ''
  message.value = ''
}

function appendNote(note) {
  const notes = document.querySelector('ul')
  const newNote = document.createElement('li')
  newNote.classList.add('note')

  const name = document.createElement('h3')
  name.innerText = note.name

  const message = document.createElement('p')
  message.innerText = note.message

  newNote.append(name, message);
  notes.append(newNote);
}
