import { useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

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
         
          <ErrorBoundary>
            <ComicsList/>
          </ErrorBoundary>
          <img className = "bg-decoration" src = { decoration } alt = "vision"/> 
        </main>
      </div>
    </Router>
  );
};

export default App;