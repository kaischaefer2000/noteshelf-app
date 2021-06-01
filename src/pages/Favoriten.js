import React from 'react'
import FavoriteShelf from '../components/FavoriteShelf'


function Favoriten({booksArticles}) {
    document.title = "Noteshelf -  Meine Favoriten"

  return (
    <>
      <FavoriteShelf booksArticles={booksArticles}/>
    </>
  );
}

export default Favoriten;