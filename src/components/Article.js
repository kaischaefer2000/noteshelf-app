import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'full',
  },
  media: {
    height: 150,
  },
}));


export default function Article({article}) {
  const classes = useStyles();

  return (
    <Card className={`ml-4 mr-4 mt-4 ${classes.root}`} >
      <CardActionArea style={{  display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}>
        
        <CardContent style={{width: "93%"}}>
          <Badge 
            badgeContent={article.notes.length} 
            classes={{ badge: "badge" }}
            style={{right: 30, top: 30, position: 'absolute'}}
          >  
          </Badge>
            <Typography gutterBottom variant="h5" component="h2">
              {article.title}
            </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Author: {article.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Seiten: {article.pages}
          </Typography>
          <Button variant="contained" href={article.link} style={{marginTop: '1em', fontSize: '0.6rem', backgroundColor: 'rgba(82, 154, 234, 0.8)'}}>
              Zum online Artikel
          </Button>          
    
        </CardContent>
      </CardActionArea>
    </Card>
    
  );
}