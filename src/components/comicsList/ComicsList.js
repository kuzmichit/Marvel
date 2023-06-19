import {useState, useEffect} from 'react';
import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {

  const [comicsList, setComicsList] = useState( [] );
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setNewItemLoading] = useState(false);

  const {loading, error, clearError, getAllComics } = useMarvelService();

  useEffect( () => {
    onRequest(offset, true);
  }, [] );

  function onRequest(offset) {
    getAllComics(offset)
      .then(onComicsListLoaded);
  }

  function onComicsListLoaded(comicsList) {
    setComicsList(comicsList);
  }

  function renderItems(arr) {
    const items = arr.map( (item) => {

      return (
        <li className = "comics__item" key = { item.id }>
          <a href = "#">
            <img src = { item.thumbnail } alt = { item.description } className = "comics__item-img"/>
            <div className = "comics__item-name">{ item.title }</div>
            <div className = "comics__item-price">{ item.price }</div>
          </a>
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
      {/* {errorMessage}
      {spinner} */}
      {items}
    </div>
  );
};

export default ComicsList;