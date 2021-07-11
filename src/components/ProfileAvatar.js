import React, { useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from "../Auth";
import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../Firebase'
import { LoopCircleLoading	 } from 'react-loadingg';


function ProfileAvatar({booksArticles, books, articles, userImage, userName}) {
    const [currentUser, setCurrentUser] = React.useState(useContext(AuthContext));
    console.log(currentUser);
    const mediumWithNotes = booksArticles.filter( (medium) => medium.notes );

    const mediumNotes = [];
    mediumWithNotes.forEach(fav => {
        const favoriteNotes = fav.notes;
        favoriteNotes.forEach(note => {
            mediumNotes.push(note);
        })
    });
    console.log(mediumNotes.length);



    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const [test, setTest] = React.useState("none")
    const [fileUrl, setFileUrl] = React.useState(userImage)
    const [name, setName] = React.useState(userName)


    const onFileChange = async (e) => {
      setTest('inherit')
      const file = e.target.files[0]
      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(file.name)
      await fileRef.put(file)
      setFileUrl(await fileRef.getDownloadURL())
      setTest('none')
      console.log("onFileChange ausgeführt", fileUrl, fileRef)
    }

    const onCreate = () => {
        const db = firebase.firestore()
        let userMail = firebase.auth().currentUser;
        db.collection("user").doc(userMail.email).set({
            name: name,
            image: fileUrl,
            email: userMail.email,
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }


    return (
        <>
            {(() => {
                switch (currentUser) {
                   case null:
                       setCurrentUser("")
                   default: return(
            <>
                <div className="flex flex-row content-center justify-center pt-10">
                    <div className="flex flex-col">
                        <Avatar 
                            alt={userName} 
                            src={userImage} 
                            className="self-center"
                            style={{margin: '2em 0px 0px 0px ', padding: 0,  boxShadow: '0 10px 10px -5px', width: '100px', height: '100px', zIndex: '20'}}
                        />

                        <EditIcon onClick={handleClickOpen} className="cursor-pointer absolute top-20 bg-blue-200 rounded"/>

                        <h1 className="text-xl pt-6 font-semibold text-center">{userName}</h1>
                        <h2 className="text-md pt-2 text-center">{currentUser.currentUser.ac.email}</h2>
                    </div>
                </div>
                <div className="flex flex-row justify-around mt-12 bg-gradient-to-r from-blue-100 to-blue-200 py-4">
                    <div>
                        <h3 className="text-center text-lg">Bücher</h3>
                        <p className="text-center font-bold">{books.length}</p>
                    </div>
                    <div>
                        <h3 className="text-center text-lg">Artikel</h3>
                        <p className="text-center font-bold">{articles.length}</p>
                    </div>
                    <div>
                        <h3 className="text-center text-lg">Notizen</h3>
                        <p className="text-center font-bold">{mediumNotes.length}</p>
                    </div>
                </div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Ändere hier ganz einfach dein Profil.</DialogTitle>
                        <DialogContent>
                          <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />

                          <TextField
                            margin="dense"
                            id="avatar"
                            label="Profilbild"
                            type="file"
                            fullWidth
                            onChange={onFileChange}
                          />
                          
                        </DialogContent>
                        
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Abbrechen
                            </Button>
                            <Button  onClick={() => {handleClose(); onCreate()}} color="primary">
                              Speichern
                            </Button>
                            <LoopCircleLoading style={{display: test, right: "50%", bottom: "15%", position: "absolute"}}/>
                        </DialogActions>
                </Dialog>
            </>
            )
        }
           
      })()}
      </>
  );
}

export default ProfileAvatar;