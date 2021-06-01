import React from 'react';
import Article from './Article';

export default function Articleshelf({articles}) {
  return (
    <div className="pt-14 min-h-screen bg-gradient-to-r from-green-50 to-green-100 pb-14 mb-5">
    <div className="m-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded">
      <h1 className="text-xl font-semibold pt-7 pl-7 pr-7 text-gray-900">Welchen Artikel liest du gerade?</h1>
      <p className="text-sm pt-4 pb-7 pl-7 pr-7 text-gray-500">Wähle einen Artikel aus, um dir alle dazugehörigen Notizen anzeigen zu lassen. Auf dem + kannst du einen neuen Artikel hinzufügen.</p>
    </div>
        {
            articles.map((article) => {
                return(
                    <Article article={article}/>
                )
            })
        }
    </div>
  );
}