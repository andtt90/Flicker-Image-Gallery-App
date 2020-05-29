import axios from 'axios';

const getFlikerPhotos = (text) => {
    return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=15b67c2a8b4288ff1fddf5eb56655cfb&content_type=1&is_getty=1',
        params: {
          text,
        }
      });
}

export { getFlikerPhotos };