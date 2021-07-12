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
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function NoteView({booksArticles, userMail}) {

  const currentNote = useRecoilValue(clickedNote)
  const [note, setNote] = React.useState({});

  let history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const mediumWithNotes = booksArticles.filter( (medium) => medium.notes );

    

    let mediumNotes = [];
    mediumWithNotes.forEach(fav => {
        const favoriteNotes = fav.notes;
        favoriteNotes.forEach(note => {
            mediumNotes.push(note);
        })
    });

    const readingNotes = mediumNotes.filter(n => n.book == note.book)
    
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


    const handleClickEditOpen = () => {
      setOpenEdit(true);
    };


    const handleEditClose = () => {
      setOpenEdit(false);
    };


    console.log(readingNotes)
    const onDelete = () => {
        const db = firebase.firestore()
        const uMail = firebase.auth().currentUser;
        const noteRef = db.collection("user").doc(uMail.email).collection("readings").doc(note.book)
        noteRef.update({
          notes: readingNotes.filter(read => read.title !== note.title)
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

    React.useEffect(() => {
      const db = firebase.firestore()
      const uMail = firebase.auth().currentUser;
      const favRef = db.collection("user").doc(uMail.email).collection("readings").doc(note.book)
      favRef.update({
        notes: readingNotes.filter(read => read.title !== note.title)
      })
      favRef.update({
        notes: firebase.firestore.FieldValue.arrayUnion(note)
      })  
      setNoteHeading(note.title)
      setNoteText(note.text)
      setNotePages(note.pages)
      setBookRef(note.book)
      setIsFavorite(note.isFavorite)
      setNoteTags(note.tags)
    }, [note])
    
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




    const [noteHeading, setNoteHeading] = React.useState("")
    const [noteText, setNoteText] = React.useState("")
    const [notePages, setNotePages] = React.useState("")
    const [bookRef, setBookRef] = React.useState("")
    const [isFavorite, setIsFavorite] = React.useState(false)
    const [noteTags, setNoteTags] = React.useState([])


    const onCreateNote = () => {
        const db = firebase.firestore()
        const uMail = firebase.auth().currentUser;
        var noteRef = db.collection("user").doc(uMail.email).collection("readings").doc(note.book)
        noteRef.update({
          notes: readingNotes.filter(read => read.title !== note.title)
        })
        noteRef.update({
          notes: firebase.firestore.FieldValue.arrayUnion({title: noteHeading, book: bookRef, text: noteText, pages: notePages, isFavorite: isFavorite, tags: noteTags})
        })
        setNote({
           ...note,
           title: noteHeading, 
           book: bookRef, 
           text: noteText, 
           pages: notePages, 
           isFavorite: isFavorite, 
           tags: noteTags
         })
    }

  
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
            <EditIcon onClick={handleClickEditOpen} className="cursor-pointer z-10 absolute mt-9 right-12"/>
            {console.log('Ausgabe:', note.isFavorite)}
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



              <Dialog open={openEdit} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Hier kannst du ganz einfach deine Notiz bearbeiten</DialogTitle>
                  <DialogContent>
  
                    <InputLabel id="book-ref-label">Lektüre</InputLabel>
                    <Select
                      margin="dense"
                      labelId="book-ref-label"
                      id="bookRef"
                      fullWidth
                      value={bookRef}
                      // onChange={((e) => {setBookRef(e.target.value)})}
                    >
                      {booksArticles.map( (book) => {
                        return(
                          <MenuItem value={book.title}>{book.title}</MenuItem>
                        )
                      })}
                    </Select>
                    
                    
                    <TextField
                      autoFocus
                      autoComplete
                      margin="dense"
                      id="heading"
                      label={note.title}
                      type="text"
                      fullWidth
                      value={noteHeading}
                      onChange={(e) => setNoteHeading(e.target.value)}
                    />
                    <TextField
                      margin="dense"
                      id="noteText"
                      label="Text"
                      type="text"
                      fullWidth
                      multiline={true}
                      placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tatio"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                    />
                     <TextField
                      margin="dense"
                      id="notePages"
                      label="Seiten"
                      type="number"
                      fullWidth
                      value={notePages}
                      onChange={(e) => setNotePages(e.target.value)}
                    />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isFavorite}
                            onChange={() => setIsFavorite(!isFavorite)}
                            name="isFavorite"
                            color="primary"
                          />
                        }
                        label="Favorit"
                      />
                      <TextField
                        margin="dense"
                        id="noteTags"
                        label="Stichwort"
                        type="text"
                        fullWidth
                        value={noteTags}
                        onChange={(e) => setNoteTags([e.target.value])}
                      />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                      Abbrechen
                    </Button>
                    <Button  onClick={() => {handleEditClose(); onCreateNote()}} color="primary">
                      Speichern
                    </Button>
                  </DialogActions>
                </Dialog>
        </div>
    </>

  );
}