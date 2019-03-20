const express = require( 'express' );
const bodyParser = require( 'body-parser' );

// Import the appropriate service and chosen wrappers
const { dialogflow } = require( 'actions-on-google' );

// Create an app instance
const app = dialogflow();
const audioRoot = 'https://7f39af40.ngrok.io/public/audiofiles/';

const expressApp = express().use( bodyParser.json() );


var ip = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 3000;

// Register handlers for Dialogflow intents
// app.intent( 'Default Welcome Intent', conv => {
//     conv.ask( 'Hi, how is it going?' );
//     conv.ask( `Here's a picture of a cat` );
// } );

// Intents
app.intent( 'getRoom', ( conv ) => {
    let response = playRoom( conv.parameters.roomnumber );
    conv.ask( generateAudioResponse( response ) );
    console.log( getAmountRoomsListened() );
} );


//// Game logic
const MAXROOMS = 8;
let currentSate = undefined;
let lastRoomPlayed = undefined;

let rooms = [
    {
        id : "1",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "2",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "3",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "4",
        listened : false,
        audiofile: 'kamer_04.mp3'
    },
    {
        id : "5",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "6",
        listened : false,
        audiofile: 'kamer_06.mp3'
    },
    {
        id : "7",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "8",
        listened : false,
        audiofile: 'kamer_08.mp3'
    },
    {
        id : "9",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "10",
        listened : false,
        audiofile: 'kamer_10.mp3'
    },
    {
        id : "11",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "12",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "13",
        listened : false,
        audiofile: 'kamer_13.mp3'
    },
    {
        id : "14",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "15",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "16",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "17",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "18",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "19",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "20",
        listened : false,
        audiofile: 'kamer_20.mp3'
    },
    {
        id : "21",
        listened : false,
        audiofile: 'kamer_21.mp3'
    },
    {
        id : "22",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "23",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "24",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "25",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "26",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "27",
        listened : false,
        audiofile: '12.mp3'
    },
    {
        id : "28",
        listened : false,
        audiofile: 'kamer_28.mp3'
    },
    {
        id : "29",
        listened : false,
        audiofile: 'kamer_29.mp3'
    },
    {
        id : "30",
        listened : false,
        audiofile: 'kamer_30.mp3'
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
        //lege kamers hebben ook een repsonse nodig, om de teller bij te kunnen houden
        lastRoomPlayed = room.id;
        return 'er is hier niemand';
    } else if ( getRoomsListened() !== MAXROOMS  && !room.listened ) {
        // ja mag ;
        setRoomListened( room.id );
        lastRoomPlayed = room.id;
        return getRoom( room.id ).audiofile;
    } else if ( room.listened ) {
        //nogmaals luisteren
        return getRoom( room.id ).audiofile;
    } else if ( getRoomsListened() === MAXROOMS ) {
        //teveel geluisterd
        return '23.mp3';
    } else {
        return "error";
    }
};

let generateAudioResponse = ( input ) => {
    return `<speak>
      <par>
        <media>
          <audio src="${audioRoot}${input}"/>
        </media>
      </par>
    </speak>`;
};

expressApp.post( '/app', app );
expressApp.use( '/public' , express.static(__dirname + '/public/') );

expressApp.listen( port );
console.log('listening on ' +  ip + ':'  + port);