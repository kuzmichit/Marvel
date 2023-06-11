import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

<<<<<<< Updated upstream
const CharList = (props) => {
=======
<<<<<<< HEAD
class CharList extends Component {
  constructor() {
    super();
  }
  state = {
    characters: [],
    loading: true,
    error: false
  };
=======
const CharList = (props) => {
>>>>>>> transfer
>>>>>>> Stashed changes

  const [charList, setCharList] = useState('[]');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();
<<<<<<< Updated upstream

  useEffect( () => {
    onRequest();
  },
  [] 
  );

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
=======

  useEffect( () => {
    onRequest();
  },
  [] 
  );

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

<<<<<<< HEAD
  onCharLoading = () => {
    this.setState( {
      loading: true,
    } );
>>>>>>> Stashed changes
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

<<<<<<< Updated upstream
    setCharList(charList => {[...charList, ...newCharList];} );
    setLoading(false);
    setNewItemLoading(false);
    setOffset( (offset) => { offset + 9; } );
    setCharEnded(ended);
  };

=======
  updateAllCharacters = () => {
    this.onCharLoading();
    this.marvelService.getAllCharacters()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
=======
  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => {[...charList, ...newCharList];} );
    setLoading(false);
    setNewItemLoading(false);
    setOffset( (offset) => { offset + 9; } );
    setCharEnded(ended);
>>>>>>> transfer
  };

>>>>>>> Stashed changes
  const onError = () => {
    setError(true);
    setLoading(false);
  };

  // Этот метод создан для оптимизации, 
  // чтобы не помещать такую конструкцию в метод render
  const renderItems = (arr) => {
    console.log(arr);
		
    if(arr === [] ) return null;  
    const items = arr.map( (item) => {
      let imgStyle = {'objectFit' : 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
      }
            
      return (
        <li 
          className = "char__item"
          key = { item.id }
<<<<<<< Updated upstream
          onClick = { () => props.onCharSelected(item.id) }>
          <img src = { item.thumbnail } alt = { item.name } style = { imgStyle }/>
          <div className = "char__name">{item.name}</div>
=======
<<<<<<< HEAD
          onClick = { () => this.props.onCharSelected(item.id) }>
          <img src = { item.thumbnail } style = { imgStyle } alt = { item.name }/>
          <div className = { 'char__name' }>{ item.name }</div>
=======
          onClick = { () => props.onCharSelected(item.id) }>
          <img src = { item.thumbnail } alt = { item.name } style = { imgStyle }/>
          <div className = "char__name">{item.name}</div>
>>>>>>> transfer
>>>>>>> Stashed changes
        </li>
      );
    } );

    // А эта конструкция вынесена для центровки спиннера/ошибки
    return (
      <ul className = "char__grid">
        {items}
      </ul>
    );
  };

  const items = renderItems(charList);
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className = "char__list">
      {errorMessage}
      {spinner}
      {content}
      <button 
        className = "button button__main button__long"
        disabled = { newItemLoading }
        style = { {'display': charEnded ? 'none' : 'block'} }
        onClick = { () => onRequest(offset) }>
        <div className = "inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;