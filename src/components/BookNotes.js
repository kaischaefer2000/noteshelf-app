import React from 'react';
import Note from './Note';
import Fab from '@material-ui/core/Fab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';


export default function Booknotes({notes}) {
    console.log(notes);
    const BookNotesArray = [];
    const gewinnerNotes = notes.map((oneNote) => {
        BookNotesArray.push = oneNote.notes;
    })
    const ActualNotes = BookNotesArray.push;
    
  return (
      <>
        <div className="pt-10 min-h-screen bg-gray-100 pb-14 mb-5">
            <Fab variant="extended" style={{margin: '1.5em 1em 1em 1em', backgroundColor:'#5BA3ED'}} >
                <ImportContactsIcon/>
                <h1 style={{padding: '1em', fontSize: '1.15rem'}}>{notes[0].title}</h1>
            </Fab>
            {
                ActualNotes.map((note) => {
                    return(
                        <Note note={note}/>
                    )
                })
            }
        </div>
      </>
  );
}