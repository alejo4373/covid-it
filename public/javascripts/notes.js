const styleScrollableNotes = () => {
  let notes = document.querySelectorAll('.note')

  notes.forEach(note => {
    let textarea = note.firstElementChild
    if (textarea.scrollHeight > textarea.clientHeight + 4) { // ~4px difference does not need to make it scrollable
      textarea.classList.add('scrollable-note')
    }
  })
}

/*
  styleScrollable notes was giving me "weird" results due to fact that with default
  font the note have a scrollHeight that much greater than the clientHeight but when
  the font styling arrives from Google Fonts the notes would be resized and their height
  reduced due to font properties.

  Listening for the load event on the window object allowed me to make sure that
  the styleScrollableNotes was called after all resources in the page were loaded
  including external stylesheets.
*/
window.addEventListener('load', styleScrollableNotes)

