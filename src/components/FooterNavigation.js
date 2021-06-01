import React from 'react'
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





const FooterNavigation = ({booksArticles}) => {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(value);
    };

    const [seite, setSeite] = React.useState(0);

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

    console.log(seite)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [title, setTitle] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [pages, setPages] = React.useState(0)
    const [genre, setGenre] = React.useState("")

    const onCreate = () => {
        const db = firebase.firestore()
        db.collection("books").add({title: title, author: author, pages: pages, genre: genre, isBook: true, image: "/static/media/default-book.1642792d.jpg", notes: []})
    }

    const [Atitle, setATitle] = React.useState("")
    const [Aauthor, setAAuthor] = React.useState("")
    const [Apages, setAPages] = React.useState(0)
    const [Alink, setALink] = React.useState("")

    const onACreate = () => {
        const db = firebase.firestore()
        db.collection("books").add({title: Atitle, author: Aauthor, pages: Apages, link: Alink, isBook: false, notes: []})
    }



    return (
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
               switch (seite) {
                  case 0:
                      return (
                        <>
                            <DialogTitle id="form-dialog-title">Hier kannst du ganz einfach ein neues Buch hinzuüfigen</DialogTitle>
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
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                  Abbrechen
                                </Button>
                                <Button  onClick={() => {handleClose(); onCreate()}} color="primary">
                                  Speichern
                                </Button>
                              </DialogActions>
                            </>
                      )
                  case 1:
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
                            <DialogTitle id="form-dialog-title">Hier kannst du ganz einfach ein neues Buch hinzuüfigen</DialogTitle>
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
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                  Abbrechen
                                </Button>
                                <Button  onClick={() => {handleClose(); onCreate()}} color="primary">
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

export default FooterNavigation
