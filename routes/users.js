var express = require('express');
var router = express.Router();

const { dialogflow, Suggestions } = require( 'actions-on-google' );


/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log( req.body );
  res.send( createTextResponse( 'test' ) );

});



function createTextResponse(textResponse){
  let response = {
    "fulfillmentText": "This is a text response",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            textResponse
          ]
        }
      }
    ],
    "source": "example.com",
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "this is a simple response"
              }
            }
          ]
        }
      }
    }
  };
  return response;
}


module.exports = router;
