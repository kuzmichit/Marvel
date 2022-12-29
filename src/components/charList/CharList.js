import './charList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false
  };

  marvelService = new MarvelService();

  onCharactersLoaded = characters => {
    this.setState(
      {characters,
        loading: false,
      }
    );
  };

  onError = () => {
    this.setState( {
      loading: false,
      error: true
    } );
  };

  componentDidMount() {
    this.updateAllCharacters();
    
  }

  updateAllCharacters = () => {
    this.marvelService.getAllCharacters()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  renderCharList = (charList) => {

    const items = charList.map(item => {

      let imgStyle = {objectFit: 'cover'};
      if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') { 
        imgStyle = {objectFit: 'unset'};
      }
			
      return (
        <li 
          className = { 'char__item' } 
          key = { item.id }
          onClick = { (id => this.props.onCharSelected(id) ) }>
          <img src = { item.thumbnail } style = { imgStyle } alt = { item.name }/>
          <div className = { 'char__name' }>{ item.name }</div>
        </li>
      );
    } );

    return (
      <ul className = "char__grid">
        {items}
      </ul>
    );
  };

  render() {
    const { characters, loading, error } = this.state;
    console.log('-------------------------------');
    
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const chars = (spinner || errorMessage) ? this.renderCharList(characters) : null;  

    return (
      <div className = "char__list">
        {this.renderCharList(characters)}
        <button className = "button button__main button__long">
          <div className = "inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;