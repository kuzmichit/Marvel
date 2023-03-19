import {Component} from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import './charInfo.scss';

class CharInfo extends Component {

  state = {
    char: null,
    loading: false,
    error: false
  };

  marvelService = new MarvelService();

  onCharLoaded = char => {
    this.setState( {
      char,
      loading: false,
    } );
  };
	
  onError = () => {
    this.setState( {
      loading: false,
      error: true
    } );
  };
	
  onCharLoading = () => {
    this.setState( {
      loading: true
    } );
  };
	
  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {

    if(this.props.charId !== prevProps.charId)
      this.updateChar();
  }
	
  updateChar = () => {
    const {charId} = this.props;

    if(!charId) return;
 
    this.onCharLoading();

    this.marvelService.getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
	
  render() {
    const {char, loading, error} = this.state;
    const skeleton = char || error || loading ? null : <Skeleton/>;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const view = !(spinner || errorMessage || !char) ? <View char = { char }/> : null;
    
    return (
      <div className = "char__info">
        {skeleton}
        {spinner}
        {errorMessage}
        {view}
      </div>
    );
  }
}

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
          </div>
        </div>
      </div>
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

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;