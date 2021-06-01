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

export default function Note({note}) {
   const classes = useStyles();
   const classesTwo = useStylesTwo();
   const tags = note.tags;

  const [favorited, setFavorited] = useState(false);

  const favoritedtotrue = (favorited) => {
      setFavorited(true);
  };

  const favoritedtofalse = (favorited) => {
      setFavorited(false);
  };

  
  return (
  
    <Card className={`ml-4 mr-4 mt-4 ${classes.root}`}>
      <CardActionArea style={{  display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}>
        <CardContent style={{width: "100%"}}>
            {(favorited == true ? <a  onClick={favoritedtofalse}><FavoriteIcon className="z-50 absolute right-5"/></a> : <a  onClick={favoritedtotrue}><FavoriteBorderIcon className="absolute right-5"/></a>)}

            <Typography gutterBottom variant="h5" component="h2">
              {note.title}
            </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            S. {note.pages}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {note.text}
          </Typography>
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
        
        </CardContent>
      </CardActionArea>
    </Card>

  );
}