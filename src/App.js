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
import React, { useState, useContext } from 'react'
import Bookshelf from './components/Bookshelf'
import Booknotes from "./components/BookNotes"
import Articlenotes from "./components/ArticleNotes"
import TestPage from "./pages/TestPage"
import firebase from "./Firebase"
import { AuthProvider} from "./Auth"
import PrivateRoute from './PrivateRoute'
import SignUpp from './pages/SignUp'
import LogIn from './pages/LogIn'


import {
  RecoilRoot,
  // atom,
  // selector,
  // useRecoilState,
  // useRecoilValue,
} from 'recoil';


// const booksArticles = [
//   {
//     title: `Der Alchimist`,
//     author: `Paulo Coelho`,
//     pages: `176`,
//     genre: ['Roman ', 'Fantasy ', 'Drama '],
//     image: der_alchimist,
//     badge: 4,
//     isBook: true,
//     notes: [
//       {
//         title: 'Alchimist 1',
//         book: `Der Alchimist`,
//         pages: `14-16`,
//         text: 'Das Gehirn kann sich immer nur auf eine Sache konzentrieren. Wenn wir Sachen gleichzeitig tun, wechselt unsere Aufmerksamkeit schnell zwischen den Teilen...',
//         tags: ['Zeitmanagement', 'Effizientes Arbeiten'],
//         isFavorite: true,
//       },
//       {
//         title: 'Alchimist 2',
//         book: `Der Alchimist`,
//         pages: `23-26`,
//         text: 'Das Gehirn kann sich immer nur auf eine Sache konzentrieren. Wenn wir Sachen gleichzeitig tun, wechselt unsere Aufmerksamkeit schnell zwischen den Teilen...',
//         tags: ['Persönlichkeitsentwicklung'],
//         isFavorite: false,
//       },
//     ]
//   },
//   {
//     title: `Die Gesetze der Gewinner`,
//     author: `Bodo Schäfer`,
//     pages: `325`,
//     genre: ['Sachbuch ', 'Persönlichkeitsentwicklung'],
//     image: die_gesetze,
//     badge: 11,
//     isBook: true,
//     notes: [
//       {
//         title: 'Kein Multitasking!',
//         book: `Die Gesetze der Gewinner`,
//         pages: `14-16`,
//         text: 'Das Gehirn kann sich immer nur auf eine Sache konzentrieren. Wenn wir Sachen gleichzeitig tun, wechselt unsere Aufmerksamkeit schnell zwischen den Teilen...',
//         tags: ['Zeitmanagement', 'Effizientes Arbeiten'],
//         isFavorite: true,
//       },
//       {
//         title: 'Sei mutig!',
//         book: `Die Gesetze der Gewinner`,
//         pages: `23-26`,
//         text: 'Das Gehirn kann sich immer nur auf eine Sache konzentrieren. Wenn wir Sachen gleichzeitig tun, wechselt unsere Aufmerksamkeit schnell zwischen den Teilen...',
//         tags: ['Persönlichkeitsentwicklung'],
//         isFavorite: false,
//       },
//     ]
//   },
//   {
//     title: `Mininamlismus`,
//     author: `Joshua Fields Millbiurn`,
//     pages: `160`,
//     genre: ['Sachbuch ', 'Persönlichkeitsentwicklung'],
//     image: minimalismus,
//     badge: 8,
//     isBook: true,
    
//   },
//   {
//     title: `Die 4 Stunden Woche`,
//     author: `Timothy Ferris`,
//     pages: `429`,
//     genre: ['Sachbuch ', 'Persönlichkeitsentwicklung'],
//     // image: '/static/media/die_vier_stunden_woche.7a90887f.jpg',
//     image: die_4_stunden,
//     badge: 6,
//     isBook: true,
//   },
//   {
//     title: `Die Macht der Gewohnheit`,
//     author: `Charles Duhigg`,
//     pages: `351`,
//     genre: ['Sachbuch ', 'Persönlichkeitsentwicklung'],
//     image: gewohnheit,
//     badge: 9,
//     isBook: true,
//   },
//   {
//     title: `Das Café am Rande der Welt`,
//     author: `John Strelecky`,
//     pages: `128`,
//     genre: ['Roman ', 'Persönlichkeitsentwicklung'],
//     image: cafe,
//     badge: 10,
//     isBook: true,
//   },



//   //Articles
//   {
//     title: `Mehr Zeit für mich! 5 Tipps fürs Zeitmanagement im Alltag`,
//     author: `Matthias Gräf`,
//     pages: `1`,
//     // image: '/static/media/die_vier_stunden_woche.7a90887f.jpg',
//     badge: 3,
//     isBook: false,
//     link: 'https://www.startplatz.de/zeitmanagement-tipps/',
//   },

//   {
//     title: `Richtiges Zeitmanagement: Der Schlüssel zum Erfolg`,
//     author: `Thomas Kresser`,
//     pages: `3`,
//     badge: 5,
//     isBook: false,
//     link: 'https://www.ingenieur.de/karriere/arbeitsleben/acht-tipps-wie-sie-ihre-zeit-besser-einteilen/',
//   },

//   {
//     title: `Die 13 Zeitmanagement Tipps`,
//     author: `Dr. Martin Krengel`,
//     pages: `2`,
//     badge: 2,
//     isBook: false,
//     link: 'https://www.studienstrategie.de/zeitmanagement/zeitmanagement-tipps/',
//     notes: [
//       {
//         title: 'Zeitmanagement 1',
//         pages: `14-16`,
//         text: 'Das Gehirn kann sich immer nur auf eine Sache konzentrieren. Wenn wir Sachen gleichzeitig tun, wechselt unsere Aufmerksamkeit schnell zwischen den Teilen...',
//         tags: ['Zeitmanagement', 'Effizientes Arbeiten'],
//         isFavorite: false,
//       },
//       {
//         title: 'Zeitmanagement 2',
//         book: `Der Alchimist`,
//         pages: `23-26`,
//         text: 'Das Gehirn kann sich immer nur auf eine Sache konzentrieren. Wenn wir Sachen gleichzeitig tun, wechselt unsere Aufmerksamkeit schnell zwischen den Teilen...',
//         tags: ['Persönlichkeitsentwicklung'],
//         isFavorite: true,
//       },
//     ]
//   },

//   {
//     title: `Qualitative Forschung und quantitative Forschung`,
//     author: `Lea Genau`,
//     pages: `1`,
//     badge: 5,
//     isBook: false,
//     link: 'https://www.scribbr.de/methodik/qualitative-forschung-quantitative-forschung/',
//   },
//   {
//     title: `Qualitative Forschung`,
//     author: ``,
//     pages: `1`,
//     badge: 4,
//     isBook: false,
//     link: 'https://www.qualtrics.com/de/erlebnismanagement/marktforschung/qualitative-forschung/',
//   },
// ]


function App() {
    document.title = "Noteshelf -  Meine Bücher"

    const [booksArticles, setBooksArticles] = React.useState([])
    const [userImage, setUserImage] = React.useState(null)
    const [userName, setUserName] = React.useState(null)

    React.useEffect(() => {
      const fetchData = async () =>{
        const db = firebase.firestore()
        const data = await db.collection("user").get()
        const daten = data.docs.map(doc => doc.data())
        let user = firebase.auth().currentUser;
        const daten2 = daten.filter(d => (d.email == user.email))
        const daten3 = daten2.map(i => i.readings)
        setBooksArticles(daten3[0])
        console.log(daten2)
        setUserImage(daten2[0].image)
        setUserName(daten2[0].name)
      }
      fetchData()
    }, [])


    var books = []
    var articles = []
    const test = booksArticles.forEach(reading => {
      if(reading.isBook == true){
        books.push(reading)
      }
      else{
        articles.push(reading)
      }
    }
    )

    console.log(books)
    // // const books = booksArticles.filter((medium) => (medium.isBook === true));
    // console.log(booksArticles[0])
    // const articles = booksArticles.filter((medium) => (medium.isBook === false));

    

  return (
    <AuthProvider>
    <Router>
        <div className="container">
          <RecoilRoot>
            <Switch>

              <PrivateRoute path="/" exact>
                <Header title="Meine Bücher" userImage={userImage}/>
                <Bookshelf books={books} />
              </PrivateRoute>

              <Route path="/artikel" component={Artikel}>
                <Header title="Meine Artikel" userImage={userImage}/>
                <Artikel articles={articles}/>
              </Route>

              <Route exact path="/signup" component={SignUpp}></Route>
              <Route exact path="/login" component={LogIn}></Route>



              <Route path="/buch" component={SingleBook}>
                <Header title="Meine Notizen" userImage={userImage}/>
                <Booknotes notes={books}/>
              </Route>

              <Route path="/artikel-notizen" component={SingleArticle}>
                <Header title="Meine Notizen" userImage={userImage}/>
                <Articlenotes notes={booksArticles}/>
              </Route>

              <Route path="/notiz" component={SingleNote}>
                <Header title="Meine Notiz" userImage={userImage}/>
                <NoteView booksArticles={booksArticles}/>
              </Route>


              <Route path="/favoriten" component={Favoriten}>
                <Header title="Meine Favoriten" userImage={userImage}/>
                <Favoriten booksArticles={booksArticles}/>
              </Route>

              <Route path="/stichwort" component={Stichwort}>
                <Header title="Meine Stichwörter" userImage={userImage}/>
                <Stichwort booksArticles={booksArticles}/>
              </Route>

              <Route path="/profil" component={Profil}>
                <Header title="Mein Profil" userImage={userImage}/>
                <Profil booksArticles={booksArticles}  books={books} articles={articles} userImage={userImage} userName={userName}/>
              </Route>

              <Route path="/test" component={TestPage}>
                <Header title="Mein Test" userImage={userImage}/>
              </Route>

            </Switch>
            </RecoilRoot>
            
          <FooterNavigation booksArticles={booksArticles}/>
        </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
