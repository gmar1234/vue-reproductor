import {
  config
} from '../../../config/develpment';

const {
  BaseURL
} = config.Api;

const endpoints = {
  
  getArtist: ({
      artist
    }) => ({ 
      url: BaseURL+`/search?q=track:${artist}"&output=jsonp`
    }),
     
  };
  
  export {
    endpoints as
    default
  };