import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import firebase from '../Firebase'
import {Link} from 'react-router-dom';
import { atom, useRecoilState} from 'recoil';

  export const clickedNote = atom({
    key: "clickedNote",
    default: "Alchimist 1",
  })

  export const clickedTag = atom({
    key: "clickedTag",
    default: "Zeitmanagement",
  })

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'full',
  },
  media: {
    height: 150,
  },
}));

const useStylesTwo = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    marginTop: '1.5em',
  },
  chip: {
    margin: theme.spacing(0.7),
    backgroundColor: 'rgba(82, 209, 234, 0.5)',
  },
}));

export default function Note({note, book}) {

  function navigateToNote(){
      setActiveNote(note.title);
      console.log(activeNote)
  };

  const [activeNote, setActiveNote] = useRecoilState(clickedNote);
  const [activeTag, setActiveTag] = useRecoilState(clickedTag);


   const classes = useStyles();
   const classesTwo = useStylesTwo();
   const tags = note.tags;

  const [favorited, setFavorited] = useState(note.isFavorite);

  const favoritedtotrue = () => {
      setFavorited(true);
  };

  const favoritedtofalse = () => {
      setFavorited(false);
  };

  const onUpdate = () => {
    // const db = firebase.firestore()
    // db.collection('books').doc(book.title).doc(note.title).set({...note, isFavorite: !favorited})
  }
  
  return (
    <Link to="/notiz">
    <Card className={`ml-4 mr-4 mt-4 ${classes.root}`} onClick={() => navigateToNote()}>
      <CardActionArea style={{  display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}>
        <CardContent style={{width: "100%"}}>
            {(favorited == true ? <a  onClick={( () => {favoritedtofalse(); onUpdate()})}><FavoriteIcon className="z-20 absolute right-5"/></a> : <a  onClick={( () => {favoritedtotrue(); onUpdate()})}><FavoriteBorderIcon className="z-20 absolute right-5"/></a>)}

            <Typography gutterBottom variant="h5" component="h2">
              {note.title}
            </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            S. {note.pages}
          </Typography>
          <div className="h-10">
          <Typography style={{ overflow: "hidden", maxHeight: '2.5rem'}} variant="body2" color="textSecondary" component="p">
            {note.text}
          </Typography>
          </div>
          <Paper component="ul" className={classesTwo.root}>
              {tags.map((data) => {
            
                return (
                  <li>
                    <Link to="stichwort">
                      <Chip
                        label={data}
                        className={` ${classesTwo.chip}`}
                        style={{cursor: 'pointer'}}
                        onClick={() => setActiveTag(data)}
                      />
                    </Link>
                  </li>
                );
              })}
            </Paper>
        
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>

  );
}