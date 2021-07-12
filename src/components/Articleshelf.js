import React from 'react';
import Article from './Article';
import { atom, useRecoilState } from 'recoil';

export const clickedArticle = atom({
    key: "clickedArticle",
    default: "Der Alchimist",
  })


export default function Articleshelf({articles}) {
  
    const [activeA, setActiveA] = React.useState('default');
    function navigateToANotes(newAValue){
      setActiveA(newAValue);
      setActiveArticle(newAValue);
  };

  const [activeArticle, setActiveArticle] = useRecoilState(clickedArticle);


  return (
    <div className="pt-14 min-h-screen bg-gradient-to-r from-green-50 to-green-100 pb-14 mb-5">
    <div className="m-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded">
      <h1 className="text-xl pt-7 pl-7 pr-7 text-gray-900">Welchen Artikel liest du gerade?</h1>
      <p className="text-sm pt-4 pb-7 pl-7 pr-7 text-gray-500">Wähle einen Artikel aus, um dir alle dazugehörigen Notizen anzeigen zu lassen. Auf dem + kannst du einen neuen Artikel hinzufügen.</p>
    </div>
        {
            articles.map((article) => {
                const activeAArticle = article.title;
                return(
                    <div onClick={() => navigateToANotes(activeAArticle)} style={{zIndex: '999'}}>
                      <Article article={article}/>
                    </div>
                )
            })
        }
    </div>
  );
}