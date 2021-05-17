import React from 'react'
import Booknotes from "../components/BookNotes"


function SingleBook({booknotes}) {
  document.title = "Noteshelf -  Meine Notizen"
  return (
    <div>
        <Booknotes booknotes={booknotes} />
    </div>
  );
}

export default SingleBook;