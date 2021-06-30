import React from 'react'
import ProfileAvatar from '../components/ProfileAvatar'
import ProfileFriends from '../components/ProfileFriends'
import Settings from '../components/Settings'

function Profil({booksArticles, books, articles, userImage, userName}) {
    document.title = "Thought Collector -  Mein Profil";
    console.log(books);

    

  return (
    <div className="pb-14">
        <ProfileAvatar booksArticles={booksArticles} books={books} articles={articles} userImage={userImage} userName={userName}/>
        <ProfileFriends/>
        <Settings/>
    </div>
  );
}

export default Profil;