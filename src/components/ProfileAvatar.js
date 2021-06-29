import React, { useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from "../Auth";


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
                            style={{margin: '2em 0px 0px 0px ', padding: 0,  boxShadow: '0 10px 10px -5px', width: '100px', height: '100px'}}
                        />
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
            </>
            )
        }
           
      })()}
      </>
  );
}

export default ProfileAvatar;