<<<<<<< Updated upstream
=======
<<<<<<< HEAD
import {Component} from 'react';
import MarvelService from '../../services/MarvelService';
=======
>>>>>>> Stashed changes
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

<<<<<<< Updated upstream
import './charInfo.scss';

const CharInfo = (props) => {
=======
>>>>>>> transfer
import './charInfo.scss';

<<<<<<< HEAD
class CharInfo extends Component {
>>>>>>> Stashed changes

  const [char, setChar] = useState(null);

  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect( () => {
    updateChar();
  }, [props.charId] );

  const updateChar = () => {
    const {charId} = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };
<<<<<<< Updated upstream
=======
	
  render() {
    return (
      <div className = "char__info">
        <div className = "char__basics">
          <img src = { thor } alt = "abyss"/>
          <div>
            <div className = "char__info-name">thor</div>
            <div className = "char__btns">
              <a href = "#" className = "button button__main">
                <div className = "inner">homepage</div>
              </a>
              <a href = "#" className = "button button__secondary">
                <div className = "inner">Wiki</div>
              </a>
            </div>
=======
const CharInfo = (props) => {

  const [char, setChar] = useState(null);

  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect( () => {
    updateChar();
  }, [props.charId] );

  const updateChar = () => {
    const {charId} = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };
>>>>>>> Stashed changes

  const skeleton = char || loading || error ? null : <Skeleton/>;
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View char = { char }/> : null;

  return (
    <div className = "char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ( {char} ) => {
  const {name, description, thumbnail, homepage, wiki, comics} = char;
  let imgStyle = {objectFit: 'cover'};

  if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') { 
    imgStyle = {objectFit: 'unset'};
  }
  let comicsList = comics.length > 0 ? comics : [{name: 'There is`t image'}]; 

  return(
    <>
      <div className = "char__basics">
        <img src = { thumbnail } style = { imgStyle } alt = { name }/>
        <div>
          <div className = "char__info-name">{ name }</div>
          <div className = "char__btns">
            <a href = { homepage } className = "button button__main">
              <div className = "inner">homepage</div>
            </a>
            <a href = { wiki } className = "button button__secondary">
              <div className = "inner">Wiki</div>
            </a>
<<<<<<< Updated upstream
=======
>>>>>>> transfer
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    );
  }
  
}
=======
>>>>>>> Stashed changes
      <div className = "char__descr">
        {description}
      </div>
      <div className = "char__comics">Comics:</div>
      <ul className = "char__comics-list">

        {
          comicsList.map( (item, i) => {
            if(i > 9) return null ;
            
            return(
              <li className = "char__comics-item" key = { i }>
                {item.name}
              </li>
            );
          } )
        }
      </ul>
    </>
  );
};
<<<<<<< Updated upstream
=======
>>>>>>> transfer
>>>>>>> Stashed changes

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;