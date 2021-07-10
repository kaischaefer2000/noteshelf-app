import React from 'react';
import { useRecoilValue } from 'recoil';
import { clickedNote } from './Note';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CommentIcon from '@material-ui/icons/Comment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../Firebase'
import { useHistory } from 'react-router-dom';

export default function NoteView({booksArticles, userMail}) {

  const currentNote = useRecoilValue(clickedNote)
  const [note, setNote] = React.useState({});

  let history = useHistory();

  const [open, setOpen] = React.useState(false);

  const mediumWithNotes = booksArticles.filter( (medium) => medium.notes );

    

    let mediumNotes = [];
    mediumWithNotes.forEach(fav => {
        const favoriteNotes = fav.notes;
        favoriteNotes.forEach(note => {
            mediumNotes.push(note);
        })
    });
    
    React.useEffect(()=>{
        const usedNote = mediumNotes.find( (nt) => nt.title == currentNote );

        if(usedNote !== undefined){
            setNote(usedNote)
        }
    }, [currentNote])


    const handleClickOpen = () => {
      setOpen(true);
    };


    const handleClose = () => {
      setOpen(false);
    //   setRerender(value => value + 1)
    };
    
    const onDelete = () => {
        const db = firebase.firestore()
        console.log(userMail)
        const noteRef = db.collection("user").doc(userMail).collection("readings").doc(note.book)
        noteRef.update({
        //   notes: firebase.firestore.FieldValue.arrayRemove(currentNote)
        })
        console.log(note.book)
        history.push('/')
    };

     const favoritedtotrue = () => {
         setNote({
           ...note,
           isFavorite: true
         })
     };

     const favoritedtofalse = () => {
         setNote({
           ...note,
           isFavorite: false
         })
     };

    
     const useStylesTwo = makeStyles((theme) => ({
      root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: '1em',
      },
      chip: {
        margin: theme.spacing(0.7),
        backgroundColor: 'rgba(82, 209, 234, 0.5)',
      },
    }));

    const classesTwo = useStylesTwo();

  
  return (
    <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 pb-14 mb-5">
            <div className="flex flex-row w-full">
                <Fab variant="extended" style={{margin: '1.5em 1em 0em 1em', backgroundColor:'#A7F3D0'}} >
                    <CommentIcon/>
                    <h1 className="tracking-wider font-medium text-lg px-3">{note && note.title}</h1>
                </Fab>
            </div>
            <DeleteIcon onClick={handleClickOpen} className="cursor-pointer z-10 absolute mt-9 right-5"/>
            <EditIcon className="cursor-pointer z-10 absolute mt-9 right-12"/>
            {(note && note.isFavorite == true ? <a  onClick={( () => {favoritedtofalse();})}><FavoriteIcon className="z-10 absolute mt-9 right-20 cursor-pointer"/></a> 
            : <a  onClick={( () => {favoritedtotrue();})}><FavoriteBorderIcon className="cursor-pointer z-10 absolute mt-9 right-20"/></a>)}

            <div className="bg-white m-3 p-5">
                <p className="text-l text-gray-600">{note && note.book} (S. {note && note.pages})</p>
                <br></br>
                <p>{note && note.text}</p>
                
            </div>

            <Paper component="ul" className={classesTwo.root}>
              { note && note.tags && note.tags.map((data) => {
              
                return (
                  <li>
                    <Chip
                      label={data}
                      className={classesTwo.chip}
                    />
                  </li>
                );
              })}
            </Paper>
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Möchstest du die Notiz "{currentNote}" wirklich löschen?</DialogTitle>
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