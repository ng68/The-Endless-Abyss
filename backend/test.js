var axios = require('axios');
var url = "https://stormy-journey-75510.herokuapp.com/score";

const options = {
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username : "Sup"
    }
  };

  axios(options).then(response => {
    console.log(response.data);
  });