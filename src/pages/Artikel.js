import React from 'react'
import Articleshelf from "../components/Articleshelf"


function Artikel({articles}) {
  document.title = "Noteshelf -  Meine Artikel"
  return (
    <div>
      <Articleshelf articles={articles} />
    </div>
  );
}

export default Artikel;