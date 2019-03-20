// Import the appropriate service and chosen wrappers
const {
    dialogflow,
    Image,
} = require('actions-on-google')

// Create an app instance
const app = dialogflow();

// Register handlers for Dialogflow intents

app.intent('Default Welcome Intent', conv => {
    conv.ask('Hi, how is it going?')
    conv.ask(`Here's a picture of a cat`)
    conv.ask(new Image({
        url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
        alt: 'A cat',
    }))
});

// Intent in Dialogflow called `Goodbye`
app.intent('Webhook Test', conv => {
    conv.close('See you later!')
});

app.intent('Default Fallback Intent', conv => {
    conv.ask(`I didn't understand. Can you tell me something else?`)
});


//// Game logic
const MAXROOMS = 8;
let roomsAvailable = MAXROOMS;

let currentSate = undefined;

let rooms = [
    {
        id : 1,
        listened : true,
        message: "this is room 1"
    },
    {
        id : 2,
        listened : false,
        message: "this is room 2"
    },
    {
        id : 3,
        listened : true,
        message: "this is room 3"
    },
    {
        id : 4,
        listened : false,
        message: "this is room 4"
    },
    {
        id : 5,
        listened : true,
        message: "this is room 5"
    },
    {
        id : 6,
        listened : false,
        message: "this is room 6"
    },
    {
        id : 7,
        listened : true,
        message: "this is room 7"
    },
    {
        id : 8,
        listened : false,
        message: "this is room 8"
    },
    {
        id : 9,
        listened : true,
        message: "this is room 9"
    },
    {
        id : 10,
        listened : false,
        message: "this is room 10"
    },
    {
        id : 11,
        listened : true,
        message: "this is room 11"
    }
];

let introMessages = [];


let endRoomQuestion =  [
    {},
    {},
    {},
    {}
];

let waitingAudio =  [
    {},
    {},
    {},
    {}
];

// helpers


let getRoomsListened = () => {
    return rooms.filter( ( room ) => {
        return ( room.listened )
    });
};

let getAmountRoomsListened = () => {
    return getRoomsListened().length  ||  0;
};

let setRoomListened = ( id  ) => {
    rooms.map( ( room ) => {
        if ( room.id === id ) {
            room.listened = true;
        }
        return room;
    });
};

let getEndRoomQuestion = () => {
    return endRoomQuestion[ Math.rand( 0, endRoomQuestion.length -1 ) ];
};

let getRoom = ( id ) => {
    let currentRoom = undefined;
    rooms.map( ( room ) => {
        if ( room.id === id ) {
            currentRoom = room;
        }
        return room;
    });
    return currentRoom;
};

let playRoom = ( id ) => {

  let room = getRoom( id );

  if (!room) {
      // play aduio 'er is hier niemand'
  } else if ( getRoomsListened() !== MAXROOMS  && !room.listened ) {
      console.log( "" )
  } else if ( !room.listened ) {
      setRoomListened( room.id )
      // play
  } else {
      //play
  }

};

let createMessge  = () => {

    let messages = '';

    return message
};


// // Copyright 2017, Google, Inc.
// // Licensed under the Apache License, Version 2.0 (the 'License');
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //    http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an 'AS IS' BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.
//
// 'use strict';
//
// const functions = require('firebase-functions');
// const app = require('./app');
//
// module.exports.ssmlExampleAction = functions.https.onRequest(app);