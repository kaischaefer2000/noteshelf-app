import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TagList from './TagList'
import { useRecoilValue } from 'recoil';
import { clickedTag } from './Note';


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

    const mediumWithNotes = booksArticles.filter( (medium) => medium.notes.length !== 0 );
   

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
    const [test, setTest] = React.useState(0);

    function navigateToNotes(newValue){
        setActiveT(newValue);
    };



    var currentTag = useRecoilValue(clickedTag)
  

    const mediumNotes = [];
    mediumWithNotes.forEach(fav => {
        const favoriteNotes2 = fav.notes;
        favoriteNotes2.forEach(note => {
            mediumNotes.push(note);
        })
    });

    const activeN = [];
    if(currentTag){
      mediumNotes.forEach(note => {
        const noteT = note.tags;

        noteT.forEach(tag =>{
  
          if(tag == currentTag){
            activeN.push(note);
          }
        })
      })
    }
    console.log(activeN)


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
      setTest(1)
    }

    
    

  return (
      <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-red-50 to-red-100 pb-14 mb-5">
        <div className="m-3 bg-gradient-to-r from-green-200 to-red-200 rounded">
          <h1 className="text-xl pr-7 pt-7 pl-7 text-gray-900">Welches Thema interessiert dich gerade?</h1>
          <p className="text-sm pt-4 pb-7 pr-7 pl-7 text-gray-500">Wähle ein Stichwort <strong>PER DOPPELKLICK</strong> aus und lasse dir alle Notizen anzeigen, die du mit diesem Stichwort getaggt hast.</p>
        </div>
        
            <div className={`mt-3 ${classes.root}`}>
              {uniqueTags.map( tag => {
                  return(  
                  <div id={tag} onClick={(e) => {navigateToNotes(e.currentTarget.id); renderNotes();}} style={{zIndex: '40'}}>
                    <Chip
                      icon={<LocalOfferIcon/>}
                      label={tag}
                      clickable
                      variant="outlined"
                    />
                  </div>
                  )
              })}
            </div>

            {(() => {
               if((currentTag != 0) && (test == 0)) {
                      return (
                        <>
                            <TagList tagNotes={activeN}/>
                            {console.log('tagNotest', tagNotes)}
                            {console.log(currentTag)}
                        </>
                      )}
                      
                  else{
                        return (
                            <>
                            <TagList tagNotes={tagNotes}/>
                        </>
                        )
                    }
               }
           
            )()}
        </div>
      </>
  );
}

