import React, { useContext } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { SvgIcon } from "@material-ui/core";
import {Link} from 'react-router-dom';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../Firebase'
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../Auth";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useLocation} from 'react-router-dom';
import { LoopCircleLoading	 } from 'react-loadingg';



const FooterNavigation = ({booksArticles}) => {

    const { currentUser } = useContext(AuthContext);

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(value);
    };

    const [seite, setSeite] = React.useState(0);
    const [fileUrl, setFileUrl] = React.useState(null)


    const changeToBuecher = () => {
        setSeite(0)
    }

    const changeToArtikel = () => {
        setSeite(1)
    }

    const changeToFavoriten = () => {
        setSeite(2)
    }

    const changeToTags = () => {
        setSeite(3)
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [test, setTest] = React.useState("none")


    const onFileChange = async (e) => {
      setTest('inherit')
      const file = e.target.files[0]
      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(file.name)
      await fileRef.put(file)
      setFileUrl(await fileRef.getDownloadURL())
      setTest('none')
      console.log("onFileChange ausgeführt", fileUrl, fileRef)
    }

    const [title, setTitle] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [pages, setPages] = React.useState(0)
    const [genre, setGenre] = React.useState("")


    const onCreate = () => {
        const db = firebase.firestore()
        let userMail = firebase.auth().currentUser;
        // db.collection("books").add()
         var book = db.collection("user").doc(userMail.email).collection("readings").doc(title)
        book.set({
            title: title,
            author: author, 
            pages: pages, 
            genre: genre, 
            isBook: true, 
            image: fileUrl, 
            notes: []
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        setTitle(null)
        setAuthor(null)
        setPages(null)
        setGenre(null)
    }



    const [Atitle, setATitle] = React.useState("")
    const [Aauthor, setAAuthor] = React.useState("")
    const [Apages, setAPages] = React.useState(0)
    const [Alink, setALink] = React.useState("")

    const onACreate = () => {
        const db = firebase.firestore()
        let userEmail = firebase.auth().currentUser;
        var book = db.collection("user").doc(userEmail.email).collection("readings").doc(Atitle)
        book.set({
            title: Atitle, 
            author: Aauthor, 
            pages: Apages, 
            link: Alink, 
            isBook: false, 
            notes: []
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        setATitle(null)
        setAAuthor(null)
        setAPages(null)
        setALink(null)

    }



    const [noteHeading, setNoteHeading] = React.useState("")
    const [noteText, setNoteText] = React.useState("")
    const [notePages, setNotePages] = React.useState(0)
    const [bookRef, setBookRef] = React.useState("")
    const [isFavorite, setIsFavorite] = React.useState(false)
    const [noteTags, setNoteTags] = React.useState([])


    const onCreateNote = () => {
        const db = firebase.firestore()
        let userEmailAdress = firebase.auth().currentUser;
        var noteRef = db.collection("user").doc(userEmailAdress.email).collection("readings").doc(bookRef)
        noteRef.update({
         notes: firebase.firestore.FieldValue.arrayUnion({title: noteHeading, book: bookRef, text: noteText, pages: notePages, isFavorite: isFavorite, tags: noteTags})
        })
        console.log(noteRef)
        
        
        console.log(noteHeading, bookRef, noteText, noteTags, notePages, isFavorite)
        setNoteHeading(null)
        setNoteText(null)
        setNotePages(0)
        setBookRef(null)
        setIsFavorite(false)
        setNoteTags([])
    }

    const [path, setPath] = React.useState('/')

    const usePathname = () => {
      const location = useLocation();
      const pathName = location.pathname
      if(path != pathName){
        setPath(pathName)
      }
    }


    

    
    usePathname()

    return (
        <>
        {(() => {
               switch (currentUser) {
                  case null:
                      return (null)
                  default: return(
        <>
        <BottomNavigation
          value={value}
          className="z-50 bg-gradient-to-r from-indigo-600 to-indigo-500 fixed min-w-full bottom-0 pt-1"
          style={{height: '65px'}}
          onChange={handleChange} 
          classes={{children: ''}}
          
        >

            <BottomNavigationAction 
                className="shadow-md"
                classes={{ label: 'text-white', icon: 'bg-white' }}
                label="Bücher"
                onClick={changeToBuecher}
                icon={
                    <Link to="/">
                        <SvgIcon viewBox="0 0 30 27" className="text-white">
                            <MenuBookIcon />
                        </SvgIcon>
                    </Link>
                } 
            />
            <BottomNavigationAction
                classes={{ label: 'text-white', icon: 'bg-white' }} 
                label="Artikel"
                onClick={changeToArtikel}  
                icon={
                    <Link to="/artikel">
                        <SvgIcon viewBox="0 0 30 27" className="text-white">
                            <DescriptionIcon />
                        </SvgIcon>
                    </Link>
                } 
            />
            <BottomNavigationAction
                classes={{ label: 'text-white', icon: 'bg-white' }} 
                onClick={handleClickOpen}
                icon={
                        // <SvgIcon 
                        //     className="text-green-300"
                        //     style={{width: '3rem', height: '3rem', pointerEvents: 'none'}}
                        // >
                            <Fab aria-label="add" style={{width: '3rem', height: '3rem', color: 'white', backgroundColor: '#ED5BA3',cursor: 'pointer'}}>
                              <AddIcon/>
                            </Fab>
                        // </SvgIcon>
                } 
            />

            <BottomNavigationAction 
                classes={{ label: 'text-white', icon: 'bg-white'}} 
                label="Favoriten"  
                onClick={changeToFavoriten} 
                icon={
                    <Link to="/favoriten">
                        <SvgIcon  
                            viewBox="0 0 30 27" 
                            className="text-white"
                        >

                            <FavoriteIcon />
                        </SvgIcon>
                    </Link>
                } 
            />
            <BottomNavigationAction 
                classes={{ label: 'text-white', icon: 'bg-white' }} 
                label="Stichwörter"   
                onClick={changeToTags}
                icon={
                    <Link to="/stichwort">
                        <SvgIcon viewBox="0 0 30 27" className="text-white">
                            <LocalOfferIcon/>
                        </SvgIcon>
                    </Link>
                } 
            />
        </BottomNavigation>

        
 
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            
            {(() => {
               switch (path) {
                  case '/':
                      return (
                        <>
                            <DialogTitle id="form-dialog-title">Hier kannst du ganz einfach ein neues Buch hinzufügen</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Gebe die Informationen über dein neues Buch an.
                                </DialogContentText>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="title"
                                  label="Titel"
                                  type="text"
                                  fullWidth
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                                <TextField
                                  margin="dense"
                                  id="author"
                                  label="Author"
                                  type="text"
                                  fullWidth
                                  value={author}
                                  onChange={(e) => setAuthor(e.target.value)}
                                />
                                <TextField
                                  margin="dense"
                                  id="pages"
                                  label="Seitenzahl"
                                  type="number"
                                  fullWidth
                                  value={pages}
                                  onChange={(e) => setPages(e.target.value)}
                                />
                                <TextField
                                  margin="dense"
                                  id="genre"
                                  label="Genre"
                                  type="text"
                                  fullWidth
                                  value={genre}
                                  onChange={(e) => setGenre(e.target.value)}
                                />
                                <TextField
                                  margin="dense"
                                  id="cover"
                                  label="Cover"
                                  type="file"
                                  fullWidth
                                  onChange={onFileChange}
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                  Abbrechen
                                </Button>
                                <Button  onClick={() => {handleClose(); onCreate()}} color="primary">
                                  Speichern
                                </Button>
                                <LoopCircleLoading style={{display: test, right: "50%", bottom: "15%", position: "absolute"}}/>
                              </DialogActions>
                            </>
                      )
                  case '/artikel':
                      return (
                        <>
                            <DialogTitle id="form-dialog-title">Hier kannst du ganz einfach einen neuen Artikel hinzuüfigen</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Gebe die Informationen über deinen Artikel an.
                                </DialogContentText>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="Atitle"
                                  label="Titel"
                                  type="text"
                                  fullWidth
                                  value={Atitle}
                                  onChange={(e) => setATitle(e.target.value)}
                                />
                                <TextField
                                  margin="dense"
                                  id="Aauthor"
                                  label="Author"
                                  type="text"
                                  fullWidth
                                  value={Aauthor}
                                  onChange={(e) => setAAuthor(e.target.value)}
                                />
                                <TextField
                                  margin="dense"
                                  id="Apages"
                                  label="Seitenzahl"
                                  type="number"
                                  fullWidth
                                  value={Apages}
                                  onChange={(e) => setAPages(e.target.value)}
                                />
                                <TextField
                                  margin="dense"
                                  id="Alink"
                                  label="Link"
                                  type="text"
                                  fullWidth
                                  value={Alink}
                                  onChange={(e) => setALink(e.target.value)}
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                  Abbrechen
                                </Button>
                                <Button  onClick={() => {handleClose(); onACreate()}} color="primary">
                                  Speichern
                                </Button>
                              </DialogActions>
                            </>
                      )
                  default:
                      return (
                        <>
                            <DialogTitle id="form-dialog-title">Hier kannst du ganz einfach eine neue Notiz hinzufügen</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Halte deine Gedanken fest!
                                </DialogContentText>
                                
                                
                                <InputLabel id="book-ref-label">Lektüre</InputLabel>
                                <Select
                                  margin="dense"
                                  labelId="book-ref-label"
                                  id="bookRef"
                                  fullWidth
                                  value={bookRef}
                                  onChange={((e) => {setBookRef(e.target.value)})}
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
                                  label="Überschrift"
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
                                <Button onClick={handleClose} color="primary">
                                  Abbrechen
                                </Button>
                                <Button  onClick={() => {handleClose(); onCreateNote()}} color="primary">
                                  Speichern
                                </Button>
                              </DialogActions>
                            </>
                      )
               }
           
            })()}      
        </Dialog>
        </>
        )
        }
           
      })()} 
    </>
    )
}

export default FooterNavigation
