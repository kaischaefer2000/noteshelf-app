import React from 'react'
import Articlenotes from "../components/ArticleNotes"


function SingleArticle({booknotes}) {
  document.title = "Thought Collector -  Meine Notizen"
  return (
    <div>
        <Articlenotes booknotes={booknotes}/>
    </div>
  );
}

export default SingleArticle;