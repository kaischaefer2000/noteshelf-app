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

export default function NoteView({booksArticles}) {

const currentNote = useRecoilValue(clickedNote)

    const mediumWithNotes = booksArticles.filter( (medium) => medium.notes );

    

    const mediumNotes = [];
    mediumWithNotes.forEach(fav => {
        const favoriteNotes = fav.notes;
        favoriteNotes.forEach(note => {
            mediumNotes.push(note);
        })
    });
    
    console.log(currentNote)
    console.log(booksArticles)
    const noteArray = mediumNotes.filter( (nt) => nt.title == currentNote );
    console.log(noteArray)
    const note = noteArray[0]

    console.log(note)

    const [favorited, setFavorited] = React.useState(note.isFavorite);

     const favoritedtotrue = () => {
         setFavorited(true);
     };

     const favoritedtofalse = () => {
         setFavorited(false);
     };

     const tags = note.tags
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

    window.onbeforeunload = function() {
        return "Das Neu Laden dieser Seite fuhrt zu einem Fehler! Bitte Abbrechen.";
    }
  
  return (
    <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 pb-14 mb-5">
            <div className="flex flex-row w-full">
                <Fab variant="extended" style={{margin: '1.5em 1em 0em 1em', backgroundColor:'#A7F3D0'}} >
                    <CommentIcon/>
                    <h1 className="tracking-wider font-medium text-lg px-3">{note.title}</h1>
                </Fab>
            </div>
            <DeleteIcon className="cursor-pointer z-10 absolute mt-9 right-5"/>
            <EditIcon className="cursor-pointer z-10 absolute mt-9 right-12"/>
            {(favorited == true ? <a  onClick={( () => {favoritedtofalse();})}><FavoriteIcon className="z-10 absolute mt-9 right-20 cursor-pointer"/></a> 
            : <a  onClick={( () => {favoritedtotrue();})}><FavoriteBorderIcon className="cursor-pointer z-10 absolute mt-9 right-20"/></a>)}

            <div className="bg-white m-3 p-5">
                <p className="text-l text-gray-600">{note.book} (S. {note.pages})</p>
                <br></br>
                <p>{note.text}</p>
                
            </div>

            <Paper component="ul" className={classesTwo.root}>
              {tags.map((data) => {
              
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
            
        </div>
    </>

  );
}