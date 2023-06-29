import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import {Main, Comics, Page404, SingleComic} from '../pages';
const App = () => {
    
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <Router>
      <div className = "app">
        <AppHeader/>
        <main>
          <Routes>
            <Route end path = "/" element = { <Main/> } errorElement = { <Page404/> }></Route>
            <Route end path = "/comics" element = { <Comics/> }></Route>
            <Route path = '*' element = { <Page404/> }></Route>
            <Route path = '/comics/:comicId' element = { <SingleComic/> }></Route>
          </Routes>      
        </main>
      </div>
    </Router>
  );
};

const Tmp = () => {
  return (
    <>
      <h1>Hello Borys</h1>
    </>
  );
};

export default App;