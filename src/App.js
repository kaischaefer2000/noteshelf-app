import FooterNavigation from "./components/FooterNavigation";
import Header from "./components/Header";
import Artikel from "./pages/Artikel"
import Favoriten from "./pages/Favoriten"
import Profil from "./pages/Profil"
import SingleBook from "./pages/singleBook"
import SingleArticle from "./pages/singleArticle"
import SingleNote from "./pages/SingleNote"
import NoteView from "./components/NoteView"
import Stichwort from "./pages/Stichwort"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from 'react'
import Bookshelf from './components/Bookshelf'
import Booknotes from "./components/BookNotes"
import Articlenotes from "./components/ArticleNotes"
import TestPage from "./pages/TestPage"
import firebase from "./Firebase"
import { AuthProvider} from "./Auth"
import PrivateRoute from './PrivateRoute'
import SignUpp from './pages/SignUp'
import LogIn from './pages/LogIn'
import {RecoilRoot} from 'recoil';
import { atom, useRecoilState} from 'recoil';

export const dataA = atom({
    key: "dataAtom",
    default: ["input"],
  })

export const userA = atom({
    key: "userAtom",
    default: [],
  })
  
 

function App() {
    document.title = "Thought Collector -  Meine Bücher"

    const [userImage, setUserImage] = React.useState("")
    const [userName, setUserName] = React.useState("")
    const [userMail, setUserMail] = React.useState("")
    var [benutzer, setBenutzer] = React.useState("default")

    const [readings, setReadings] = useRecoilState(dataA)
    const [reader, setReader] = useRecoilState(userA)

    let userEmailAdress = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         setBenutzer(user.email)
         console.log(user.email)
       } else {
         console.log("kein User angemeldet")
         setBenutzer("default")
       }
     });
  
    useEffect(() => {
      firebase
        .firestore()
        .collection("user")
        .doc(benutzer)
        .collection("readings")
        .onSnapshot((snapshot) => {
            const newReadings = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))

            setReadings(newReadings)
        })

      firebase
        .firestore()
        .collection("user")
        .onSnapshot((snap) => {
            const newUsers = snap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))

            const newUser = newUsers.filter(u => u.email === benutzer)
            const neuerUser = newUser[0]

            neuerUser && setUserImage(neuerUser.image)
            neuerUser && setUserMail(neuerUser.email)
            neuerUser && setUserName(neuerUser.name)
            setReader(newUser)
        })
    }, [benutzer])
   

    const lectures = readings

    var books = []
    var articles = []

    if(lectures){
      var test = lectures.forEach(lecture => {
        if(lecture.isBook == true){
          books.push(lecture)
        }
        else{
          articles.push(lecture)
        }
      }
      )
    }   

  return (
    
    <AuthProvider>
    <Router>

          <RecoilRoot>
            <Switch>
              <PrivateRoute path="/" exact>
                <Header title="Meine Bücher" userImage={userImage}/>
                <Bookshelf books={books} userMail={userMail}/>
              </PrivateRoute>

              <Route path="/artikel" component={Artikel}>
                <Header title="Meine Artikel" userImage={userImage}/>
                <Artikel articles={articles}/>
              </Route>

              <Route exact path="/signup" component={SignUpp}></Route>
              <Route exact path="/login" component={LogIn}></Route>



              <Route path="/buch" component={SingleBook}>
                <Header title="Meine Notizen" userImage={userImage}/>
                <Booknotes userMail={userMail} books={books}/>
              </Route>

              <Route path="/artikel-notizen" component={SingleArticle}>
                <Header title="Meine Notizen" userImage={userImage}/>
                <Articlenotes notes={lectures} userMail={userMail} articles={articles}/>
              </Route>

              <Route path="/notiz" component={SingleNote}>
                <Header title="Meine Notiz" userImage={userImage}/>
                <NoteView booksArticles={lectures} userMail={userMail}/>
              </Route>


              <Route path="/favoriten" component={Favoriten}>
                <Header title="Meine Favoriten" userImage={userImage}/>
                <Favoriten booksArticles={lectures}/>
              </Route>

              <Route path="/stichwort" component={Stichwort}>
                <Header title="Meine Stichwörter" userImage={userImage}/>
                <Stichwort booksArticles={lectures}/>
              </Route>

              <Route path="/profil" component={Profil}>
                <Header title="Mein Profil" userImage={userImage}/>
                <Profil booksArticles={lectures}  books={books} articles={articles} userImage={userImage} userName={userName} />
              </Route>

              <Route path="/test" component={TestPage}>
                <Header title="Mein Test" userImage={userImage}/>
              </Route>

            </Switch>
            </RecoilRoot>
            
          <FooterNavigation booksArticles={lectures} />
       
    </Router>
    </AuthProvider>
  );
}

export default App;
