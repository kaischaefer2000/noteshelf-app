import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'full',
  },
  media: {
    height: 150,
  },
}));

export default function Book({book, active}) {
  const classes = useStyles();

  return (
    <Card className={`ml-4 mr-4 mt-4 ${classes.root}`}>
      <CardActionArea style={{  display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}>
        <CardMedia

          style={{ width: '100px' }}
          className={`${classes.media}`}
          image={book.image}
          title="Contemplative Reptile"
        />
        
        <CardContent style={{width: "70%"}}>
          <Badge 
            badgeContent={book.notes.length} 
            classes={{ badge: "badge" }}
            style={{right: 30, top: 30, position: 'absolute'}}
          >  
          </Badge>
            <Typography gutterBottom variant="h5" component="h2">
              {book.title}
            </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Author: {book.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Seiten: {book.pages}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Genre: {book.genre}
          </Typography>
        
        </CardContent>
      </CardActionArea>
    </Card>
    
  );
}