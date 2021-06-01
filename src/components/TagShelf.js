import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TagList from './TagList'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));


export default function TagShelf({booksArticles}) {
    const classes = useStyles();

    const mediumWithNotes = booksArticles.filter( (medium) => medium.notes );

    const mediumTags = [];
    mediumWithNotes.forEach(fav => {
        const favoriteNotes = fav.notes;
        favoriteNotes.forEach(note => {
            const NoteTags = note.tags;
            NoteTags.forEach(tag => {
              mediumTags.push(tag);
            })
        })
    });
    const uniqueTags = mediumTags.filter((item, index) => 
      mediumTags.indexOf(item) === index)
    
    const [activeT, setActiveT] = React.useState('');
    function navigateToNotes(newValue){
        setActiveT(newValue);
    };
  

    const mediumNotes = [];
    mediumWithNotes.forEach(fav => {
        const favoriteNotes2 = fav.notes;
        favoriteNotes2.forEach(note => {
            mediumNotes.push(note);
        })
    });


    const [tagNotes, setTagNotes] = React.useState([]);

    const activeNotes = [];
    const renderNotes = () => {
      mediumNotes.forEach(note => {
        const noteTags = note.tags;

        noteTags.forEach(tag =>{
  
          if(tag == activeT){
            activeNotes.push(note);
          }
        })
      })
      setTagNotes(activeNotes);  
    }

    




  return (
      <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-red-50 to-red-100 pb-14 mb-5">
        <div className="m-3 bg-gradient-to-r from-green-200 to-red-200 rounded">
          <h1 className="text-xl font-semibold pr-7 pt-7 pl-7 text-gray-900">Welches Thema interessiert dich gerade?</h1>
          <p className="text-sm pt-4 pb-7 pr-7 pl-7 text-gray-500">Wähle ein Stichwort <strong>PER DOPPELKLICK</strong> aus und lasse dir alle Notizen anzeigen, die du mit diesem Stichwort getaggt hast.</p>
        </div>
        
            <div className={`mt-3 ${classes.root}`}>
              {uniqueTags.map( tag => {
                const activeTag = tag;
                  return(  
                  <div onClick={() => {navigateToNotes(activeTag); renderNotes()}} style={{zIndex: '999'}}>
                    <Chip
                      icon={<LocalOfferIcon/>}
                      label={tag}
                      clickable
                      variant="outlined"
                    />;
                  </div>)
              })}
            </div>
            <TagList tagNotes={tagNotes}/>
        </div>
      </>
  );
}

