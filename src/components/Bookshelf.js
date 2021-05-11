import React from 'react';
import Book from './Book';

const books = [
  {
    title: `<strong>Der Alchimist</strong>`,
    author: `Paulo Coelho`,
    pages: `176`,
    // genre: ['Roman', 'Fantasy', 'Drama']
    genre: 'Roman'
  },
  {
    title: `<strong>Die Gesetze der Gewinner</strong>`,
    author: `Bodo Schäfer`,
    pages: `325`,
    // genre: ['Sachbuch', 'Persönlichkeitsentwicklung']
    genre: 'Persönlichkeitsentwicklung'
  },
  {
    title: `<strong>Mininamlismus</strong>`,
    author: `Joshua Fields Millbiurn`,
    pages: `160`,
    // genre: ['RSachbuch', 'Persönlichkeitsentwicklung']
    genre: 'Persönlichkeitsentwicklung'
  },
  {
    title: `<strong>Die 4 Stunden Woche</strong>`,
    author: `Timothy Ferris`,
    pages: `429`,
    // genre: ['Sachbuch', 'Persönlichkeitsentwicklung']
    genre: 'Sachbuch'
  },
]

export default function Bookshelf() {
  return (
    <div className="pt-10 min-h-screen bg-gray-100">
        {
            books.map((book) => {
                return(
                    <Book title={{ __html: book.title }} pages={{ __html: book.pages }} author={{ __html: book.author }} genre={{ __html: book.genre}} />
                )
            })
        }
    </div>
  );
}