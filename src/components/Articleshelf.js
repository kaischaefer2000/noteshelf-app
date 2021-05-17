import React from 'react';
import Article from './Article';

export default function Articleshelf({articles}) {
  return (
    <div className="pt-10 min-h-screen bg-gray-200 pb-14 mb-5">
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