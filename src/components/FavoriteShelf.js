import React from 'react';
import Note from './Note';



export default function Booknotes({booksArticles}) {
    const mediumWithNotes = booksArticles.filter( (medium) => medium.notes );

    const mediumNotes = [];
    mediumWithNotes.forEach(fav => {
        const favoriteNotes = fav.notes;
        favoriteNotes.forEach(note => {
            mediumNotes.push(note);
        })
    });
    const favorites = mediumNotes.filter( (nt) => nt.isFavorite == true );
    
  return (
      <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-red-50 to-red-100 pb-14 mb-5">
            <div className="m-3 bg-gradient-to-r from-red-200 to-purple-200 rounded">
              <h1 className="text-xl font-semibold pt-7 pl-7 text-gray-900">Deine Favoriten</h1>
              <p className="text-sm pt-4 pb-7 pl-7 text-gray-500">Hier findest du deine Lieblongs-Notizen. Mit einem Klick auf das Herz kannst du Notizen zu deinen Favoriten hinzufügen, damit du die wichtigsten Erkentnisse immer auf einem Blick hast.</p>
            </div>
            {
                favorites.map((note) => {
                    return(
                        <Note note={note}/>
                    )
                })
            }
        </div>
      </>
  );
}

