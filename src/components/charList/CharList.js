import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
  state = {
    characters: {},
    id: 0
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
    const {chars} = this.state;
    const characters = () => {
      chars.forEach()
    }
    return (
      <div className = "char__list">
        <ul className = "char__grid">
          <li className = "char__item">
            <img src = { abyss } alt = "abyss"/>
            <div className = "char__name">Abyss</div>
          </li>
        </ul>
        <button className = "button button__main button__long">
          <div className = "inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;