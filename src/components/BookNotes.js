import React from 'react';
import Note from './Note';
import Fab from '@material-ui/core/Fab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { useRecoilValue } from 'recoil';
import { clickedBook } from './Bookshelf'


export default function Booknotes({notes}) {
    const reading = useRecoilValue(clickedBook)
    console.log(reading)
    
    const selectedBooks = notes.filter((medium) => (medium.title === reading))
    console.log(selectedBooks)
    if(selectedBooks.length != 0){
        var selectedBookNotes = selectedBooks[0].notes    
        console.log(selectedBookNotes, 'nicht 0')
    }

    console.log(selectedBookNotes.length)

    window.onbeforeunload = function() {
        return "Das Neu Laden dieser Seite fuhrt zu einem Fehler! Bitte Abbrechen.";
    }
    
    
    
  return (
      <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 pb-14 mb-5">
            <Fab variant="extended" style={{margin: '1.5em 1em 1em 1em', backgroundColor:'#5BA3ED'}} >
                <ImportContactsIcon/>
                <h1 style={{padding: '1em', fontSize: '1rem'}}>{reading}</h1>
            </Fab>
            {(() => {
               if(selectedBookNotes.length > 0) {
                  
                      return (
                        <>
                            {
                                selectedBookNotes.map((note) => {
                                    return(
                                        <Note note={note}/>
                                    )
                                })
                            }
                        </>
                      )}
                      
                  else{
                        return (
                            <>
                            <div className="m-3 bg-gray-200	">
                                <h2 className="p-5 align-center ">Für diese Lektüre sind noch keine Notizen vorhanden! Gehe auf das +, um neue Notizen hinzuzufügen</h2>
                            </div>
                        </>
                        )
                    }
               }
           
            )()}      
        </div>
      </>
  );
}