import React from 'react';
import Note from './Note';
import Fab from '@material-ui/core/Fab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { useRecoilValue } from 'recoil';
import { clickedBook } from './Bookshelf';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../Firebase'
import { useHistory } from 'react-router-dom';



export default function Booknotes({notes, userName, booksArticles}) {
    const reading = useRecoilValue(clickedBook)
    console.log(reading)

    let history = useHistory();

    const onDelete = () => {
        const db = firebase.firestore()
        var bookRef = db.collection("user").doc(userName)
        bookRef.update({
            readings: booksArticles.filter(read => read.title !== reading)
        })
        .catch(function(error) {
            console.error("Error removing document: ", error);
        });
        history.push('/')
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

      const handleClose = () => {
      setOpen(false);
    //   setRerender(value => value + 1)
    };
    
    const selectedBooks = notes.filter((medium) => (medium.title === reading))
    console.log(selectedBooks)
    if(selectedBooks.length != 0){
        var selectedBookNotes = selectedBooks[0].notes    
        console.log(selectedBookNotes, 'nicht 0')
    }

    // console.log(selectedBookNotes.length)

    
    
  return (
      <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 pb-14 mb-5">
            <Fab variant="extended" style={{margin: '1.5em 1em 1em 1em', backgroundColor:'#5BA3ED'}} >
                <ImportContactsIcon/>
                <h1 style={{padding: '1em', fontSize: '1rem'}}>{reading}</h1>
            </Fab>
            <p className="absolute text-red-500 right-5 top-20 cursor-pointer" onClick={handleClickOpen}><u>Buch löschen</u></p>
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
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Möchstest du das Buch "{reading}" wirklich löschen?</DialogTitle>
                <DialogActions>
                    <Button  onClick={() => {handleClose(); onDelete()}} color="primary">
                      JA!
                    </Button>
                  </DialogActions>
            </Dialog>
                                
        </div>
      </>
  );
}