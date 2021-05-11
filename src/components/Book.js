import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BuchCover from '../assets/der_alchimist.jpg'
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'full',
  },
  media: {
    height: 150,
  },
}));

export default function MediaCard(title, author, pages, genre) {
  const classes = useStyles();

  return (
    <Card className={`ml-4 mr-4 mt-4 ${classes.root}`}>
      <CardActionArea style={{  display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}>
        <CardMedia

          style={{ width: '100px' }}
          className={`${classes.media}`}
          image={BuchCover}
          title="Contemplative Reptile"
        />
        
        <CardContent>
          <Badge 
            badgeContent={4} 
            classes={{ badge: "badge" }}
            style={{right: 30, top: 30, position: 'absolute'}}
          >  
          </Badge>
            <Typography gutterBottom variant="h5" component="h2">
              title
            </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Author: author
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Seiten: pages
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Genre: genre
          </Typography>
        
        </CardContent>
      </CardActionArea>
    </Card>
    
  );
}