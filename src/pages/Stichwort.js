import React from 'react'
import TagShelf from '../components/TagShelf'
import TagList from '../components/TagList'


export default function Stichwort({booksArticles}) {
    document.title = "Noteshelf -  Meine Stichwörter"

  return (
    <>
        <TagShelf booksArticles={booksArticles}/>
    </>
  );
}