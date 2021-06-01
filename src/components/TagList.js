import React from 'react';
import Note from './Note'

export default function TagShelf({tagNotes}) {
  
  return (
    <>
      {
        tagNotes.map(note => {
          return(
            <Note note={note}/>
          )
        })
      }
    </>
  );
}

