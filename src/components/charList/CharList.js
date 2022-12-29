import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
  state = {
    characters: {},
  };

  marvelService = new MarvelService();

  onCharactersLoaded = characters => {
    this.setState(
      {characters}
    );
  };

  componentDidMount() {
    this.updateAllCharacters();
    
  }

  updateAllCharacters = () => {
    this.marvelService.getAllCharacters()
      .then(this.onCharactersLoaded);
  };

  render() {
    const { characters } = this.state;
    if(!Array.isArray(characters) ) { return null; }
    
    const chars = characters.map(item => {
      const {id, ...restItem} = item;
      
      return (
        <Character key = { id } { ...restItem }/>

      );

    } );

    return (
      <div className = "char__list">
        <ul className = "char__grid">
          {chars}
        </ul>
        <button className = "button button__main button__long">
          <div className = "inner">load more</div>
        </button>
      </div>
    );
  }
}

function Character(props) {
  return(
    <li className = { 'char__item' }>
      <img src = { props.thumbnail } alt = "Character image"/>
      <div className = { 'char__name' }>{ props.name }</div>
    </li>
  );
}

export default CharList;