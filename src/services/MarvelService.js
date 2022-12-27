
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

  getAllCharacters = async () => {

    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);

    return res.data.results.map(item => this._transformCharacter(item) );
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
    
    return this._transformCharacter(res.data.results[0] );
  };

  checkCharDesc = (desc) => {
    if(desc.length > 200) {
      return (desc.slice(0, 200) + '...'); 
    }

    return (desc || 'Description in process'); 
  };

  isImgNotAvailable = (path) => {
    if (path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
      console.log('fires');
    }
    // console.log(path);
    
    return path;
  };

  _transformCharacter = (char) => {

    return {
      name: char.name,
      description: this.checkCharDesc(char.description),
      thumbnail: this.isImgNotAvailable(char.thumbnail.path) + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url, 
      wiki: char.urls[1].url
    };
  };
}

export default MarvelService;