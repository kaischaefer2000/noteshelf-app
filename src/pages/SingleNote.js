import React from 'react'
import NoteView from '../components/NoteView'

function SingleNote() {
  document.title = "Noteshelf -  Meine Notizen"

  return (
    <>
      <NoteView/>
    </>
  );
}

export default SingleNote;