/* Event listeners */
const form = document.querySelector('form')
form.addEventListener('submit', submitNewNote)

handleHashRouteChange() // Handle someone following a link with a hash
window.addEventListener('hashchange', handleHashRouteChange)

function handleHashRouteChange(e) {
  let prevLocation = '';

  if (e) {
    prevLocation = e.oldURL.split('#')[1]
  }

  if (prevLocation) {
    hideComponent(prevLocation)
  }

  const location = window.location.hash.slice(1)
  console.log(window.location)
  switch (location) {
    case 'ilearned':
      showComponent(location)
      break;

    case 'iwanttodo':
      showComponent(location)
      break;

    default:
      console.log('default', location)
  }
}

function hideComponent(location) {
  let component = document.querySelector('#' + location)
  component.hidden = true
}

function showComponent(location) {
  let component = document.querySelector('#' + location)
  component.hidden = false
}

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
