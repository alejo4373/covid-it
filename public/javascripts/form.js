/* Event listeners */
const form = document.querySelector('form')
form.addEventListener('submit', submitNewNote)

async function submitNewNote(e) {
  e.preventDefault()

  const formData = new FormData(form)
  const noteData = {}
  formData.forEach((value, key) => noteData[key] = value)
  const newNote = await postNote(noteData)
  appendNote(newNote)
  clearInputs()
}

async function postNote(note) {
  try {
    const res = await fetch('/api/v1/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

    const data = await res.json()
    return data.payload;
  } catch (err) {
    window.alert('Ooops there was an error. Please check back later')
    console.log('err')
  }
}

function clearInputs() {
  const name = document.querySelector('input[name="username"]')
  const message = document.querySelector('textarea[name="message"]')
  name.value = ''
  message.value = ''
}

function appendNote(note) {
  // To eliminate duplicate same notes being appended due to the fact that 
  // they can be appended as the result of the fetch call or the websocket handler
  const noteAlreadyAppended = document.querySelector(`#note-${note.id}`)
  if (noteAlreadyAppended) return;

  const notes = document.querySelector('ul')
  const newNote = document.createElement('li')
  newNote.id = `note-${note.id}`
  newNote.classList.add('note')

  const name = document.createElement('h5')
  name.innerText = note.username

  const message = document.createElement('p')
  message.innerText = note.message

  newNote.append(message, name);
  notes.insertBefore(newNote, notes.childNodes[1]);
  styleScrollableNotes()
}


const ws = new WebSocket(`ws://${location.host}`)

ws.addEventListener('message', (e) => {
  const { type, payload } = JSON.parse(e.data)
  switch (type) {
    case "NEW_NOTE_ADDED":
      appendNote(payload)
      break;
    case "SUCCESSFULLY_CONNECTED":
      console.log('Websocket connected')
      break;
    default:
      alert('There was an error')
  }
})

ws.addEventListener('close', (e) => {
  //Reconnect to the websocket server in case the connection is lost
  let reload = window.confirm('Connection lost. App will reload')
  if (reload) {
    location.reload()
  }
})
