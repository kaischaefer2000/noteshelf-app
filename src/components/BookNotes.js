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


export default function Booknotes({userMail, books}) {
    var reading = useRecoilValue(clickedBook)

    let history = useHistory();

    const onDelete = () => {
        const db = firebase.firestore()
        console.log(reading, userMail)
        db.collection("user").doc(userMail).collection("readings").doc(reading).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        history.push('/')
    };

    const [open, setOpen] = React.useState(false);
    const [selectedBookNotes, setSelectedBookNotes] = React.useState([]);


    const handleClickOpen = () => {
      setOpen(true);
    };

      const handleClose = () => {
      setOpen(false);
    //   setRerender(value => value + 1)
    };


    React.useEffect(()=>{
        const selectedBook = books.find((medium) => (medium.title === reading))
        if(selectedBook !== undefined){
            setSelectedBookNotes(selectedBook.notes)
        }
    }, [reading])
            
        
    
    
  return (
      <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 pb-14 mb-5">
            <Fab variant="extended" style={{margin: '1.5em 1em 1em 1em', backgroundColor:'#5BA3ED'}} >
                <ImportContactsIcon/>
                <h1 style={{padding: '1em', fontSize: '1rem'}}>{reading}</h1>
            </Fab>
            <p className="absolute text-red-500 right-5 top-20 cursor-pointer" onClick={handleClickOpen}><u>Buch löschen</u></p>
                {console.log(reading)}

            {
                selectedBookNotes && selectedBookNotes.map((note) => {
                        return(
                            <Note note={note}/>
                        )
                    })
            }
              
            
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