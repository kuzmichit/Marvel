
class MarvelService {
    
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = process.env.REACT_APP_MARVEL_API_KEY;

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
  };

  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
  };

  getCharacter = async(id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);

    return this._transformCharacter(res.data.result);
  };

  _transformCharacter = (char) => {

    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.resourceURI, 
      wiki: char.urls[1]
    };
  };
}

export default MarvelService;