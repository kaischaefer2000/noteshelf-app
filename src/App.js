import FooterNavigation from "./components/FooterNavigation";
import Header from "./components/Header";
import Artikel from "./pages/Artikel"
import Favoriten from "./pages/Favoriten"
import Profil from "./pages/Profil"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from 'react'
import Bookshelf from './components/Bookshelf'


function App() {
    document.title = "Noteshelf -  Meine Bücher"

    // const [title, setTitle] = useState(window.location.pathname);

  return (
    <Router>
      <div className="container">
        <Header/>
          <Switch>
            <Route path="/" exact/>
            <Route path="/artikel" component={Artikel}/>
            <Route path="/favoriten" component={Favoriten}/>
            <Route path="/profil" component={Profil}/>
          </Switch>
          <Bookshelf />
        <FooterNavigation/>
      </div>
    </Router>
  );
}

export default App;
