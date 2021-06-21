import React from 'react';
import Note from './Note';
import Fab from '@material-ui/core/Fab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { useRecoilValue } from 'recoil';
import { clickedArticle } from './Articleshelf'


export default function Articlenotes({notes}) {
    const reading = useRecoilValue(clickedArticle)
    const selectedArticles = notes.filter((medium) => (medium.title === reading))
     if(selectedArticles.length != 0){
        var selectedArticleNotes = selectedArticles[0].notes    
    }

    
  return (
      <>
        <div className="pt-14 min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 pb-14 mb-5">
            <Fab variant="extended" style={{margin: '1.5em 1em 1em 1em', backgroundColor:'#5BA3ED'}} >
                <ImportContactsIcon/>
                <h1 style={{padding: '1em', fontSize: '1rem'}}>{reading}</h1>
            </Fab>
            {(() => {
               switch (selectedArticleNotes.length) {
                  case 0:
                      return (
                        <>
                            <div className="m-3 bg-gray-200	">
                                <h2 className="p-5 align-center ">Für diese Lektüre sind noch keine Notizen vorhanden! Gehe auf das +, um neue Notizen hinzuzufügen</h2>
                            </div>
                        </>
                      )
                      
                  default:
                        return (
                            <>
                            {
                                selectedArticleNotes.map((note) => {
                                    return(
                                        <Note note={note}/>
                                    )
                                })
                            }
                        </>
                        )
               }
           
            })()}      
        </div>
      </>
  );
}