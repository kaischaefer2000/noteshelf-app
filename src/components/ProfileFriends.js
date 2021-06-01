import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Friend1 from '../assets/friend1.jpg'
import Friend2 from '../assets/friend2.jpg'
import Friend3 from '../assets/friend3.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '1em',
  },
  inline: {
    display: 'inline',
    paddingRight: '1em',
  },
}));

export default function ProfileFriends() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={Friend1} />
        </ListItemAvatar>
        <ListItemText
          primary="Mustafa Tasci"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                @mustafa_tasci
              </Typography>
              {"Bücher: 20 | Artikel: 10 | Notizen: 130"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Timo Jüptner"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                @TimosNotes
              </Typography>
              {"Bücher: 60 | Artikel: 40 | Notizen: 730"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={Friend2} />
        </ListItemAvatar>
        <ListItemText
          primary="Jenny Endres"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                @goBaskets
              </Typography>
              {'Bücher: 40 | Artikel: 60 | Notizen: 430'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={Friend3} />
        </ListItemAvatar>
        <ListItemText
          primary="Daniel Kohler"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                @millondollardaniel
              </Typography>
              {'Bücher: 10 | Artikel: 5 | Notizen: 30'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}