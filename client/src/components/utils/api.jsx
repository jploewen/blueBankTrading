var Fetch = require('whatwg-fetch');
var rootUrl = '/api/v1/trades/';


module.exports = window.api =  {
  get: function(url){
    return fetch(rootUrl + url)
    .then(function(response){
      //console.log("api ", response);
      return response.json();
    })
  },
  buy: function(data){
    console.log("buy: ", data);
    return fetch(rootUrl + "buy", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response){
      console.log("POST response: ", response);
      return response.json();
    })
  },
  sell: function(data){
    console.log("buy: ", data);
    return fetch(rootUrl + "sell", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response){
      console.log("POST response: ", response);
      return response.json();
    })
  }
};
