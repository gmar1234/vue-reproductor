import {
  config
} from '../../../config/develpment';

const {
  BaseURL
} = config.Api;

const endpoints = {
  
  getListItem: ({
      value,
      type
    }) => ({ 
      url: BaseURL+`/search?q=${type}:${value}"&output=jsonp`
    }),
  };
  
  export {
    endpoints as
    default
  };