const form = document.querySelector('form')
form.addEventListener('submit', submitNewNote)

function submitNewNote(e) {
  e.preventDefault()

  const formData = new FormData(form)
  const json = {}
  formData.forEach((value, key) => json[key] = value)
  clearInputs()
  console.log(json)
}

function clearInputs() {
  const name = document.querySelector('input[name="name"]')
  const message = document.querySelector('input[name="message"]')
  name.value = ''
  message.value = ''
}

