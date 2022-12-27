import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';

import MarvelService from './services/MarvelService';

const marvelService = new MarvelService();
// marvelService.getCharacter(1011005)
//   .then(console.log);

const root = ReactDOM.createRoot(document.getElementById('root') );
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

