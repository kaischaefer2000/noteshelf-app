import React from 'react';
import Book from './Book';
import {Link} from 'react-router-dom';


export default function Bookshelf({books}) {
  const [active, setActive] = React.useState('default');
  function navigateToNotes(newValue){
      setActive(newValue);
  };
  return (
    <div className="pt-14 min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 pb-14 mb-5">
    <div className="m-3 bg-gradient-to-r from-green-200 to-indigo-200 rounded">
      <h1 className="text-xl font-semibold pt-7 pl-7 pr-7 text-gray-900">Welches Buch liest du gerade?</h1>
      <p className="text-sm pt-4 pb-7 pl-7 pr-7 text-gray-500">Wähle ein Buch aus, um dir alle dazugehörigen Notizen anzeigen zu lassen. Auf dem + kannst du ein neues Buch hinzufügen.</p>
    </div>
    <h1 style={{display: 'none'}}>{active}</h1>

        {
            books.map((book) => {
              const activeBook = book.title;
                return(
                  <>
                   {/* <Link to="/buch"> */}
                  <div onClick={() => navigateToNotes(activeBook)} style={{zIndex: '999'}}>
                    <Book book={book} />
                  </div>
                   {/* </Link> */}
                  </>
                )
            })
        }
    </div>
  );
}