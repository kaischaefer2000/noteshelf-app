import React from 'react';
import Book from './Book';
import {Link} from 'react-router-dom';


export default function Bookshelf({books}) {
  const [active, setActive] = React.useState('');
  const navigateToNotes = (event, activeBook) => {
      setActive( );
  };
  return (
    <div className="pt-10 min-h-screen bg-gray-200 pb-14 mb-5">
        {
            books.map((book) => {
                return(
                  <Link to="/buch">
                    <Book book={book} onClick={navigateToNotes} active={active} />
                  </Link>
                )
            })
        }
    </div>
  );
}