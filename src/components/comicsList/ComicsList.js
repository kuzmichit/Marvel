import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {

  const [comicsList, setComicsList] = useState( [] );
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  const {loading, error, clearError, getAllComics } = useMarvelService();

  useEffect( () => {
    onRequest(offset, true);
  }, [] );

  function onRequest(offset, initial) {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded);
  }

  function onComicsListLoaded(newComicsList) {
    let ended = false;
    if(newComicsList < 8) { 
      ended = true;
    }
    setComicsList(comicsList => [...comicsList, ...newComicsList] );
    setNewItemLoading(false);
    setOffset(offset => offset + 8);
    setComicsEnded(ended);
  }
	
  function renderItems(arr) {
    const items = arr.map( (item) => {

      return (
        <li 
          className = "comics__item"
          key = { item.id }
        >
          <Link to = { `/comics/${item.id}` }>
            <img src = { item.thumbnail } alt = { item.description } className = "comics__item-img"/>
            <div className = "comics__item-name">{ item.title }</div>
            <div className = "comics__item-price">{ item.price }</div>
          </Link>
        </li>
      ); 
    } );

    // А эта конструкция вынесена для центровки спиннера/ошибки
    return (
      <ul className = "comics__grid">
        {items}
      </ul>
    );
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;

  return (
    <div className = "comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button 
        className = "button button__main button__long"
        disabled = { newItemLoading }
        style = { {'display': comicsEnded ? 'none' : 'block'} }
        onClick = { () => onRequest(offset) }>
        <div className = "inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;