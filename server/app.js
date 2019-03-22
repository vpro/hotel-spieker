const express = require( 'express' );
const bodyParser = require( 'body-parser' );

// Import the appropriate service and chosen wrappers
const {dialogflow, Suggestions, MediaObject, Image, SimpleResponse} = require('actions-on-google');

// Create an app instance
const app = dialogflow({
    debug: false
});

const expressApp = express().use( bodyParser.json() );

var ip = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;

const audioRoot = ( process.env.URL || 'https://hotelspieker.binnenkort-op.vpro.nl' ) +  '/public/audiofiles/';

// Dialogflow agent 'say_bye' intent handles 'actions_intent_CANCEL' event
app.intent( 'say_bye', ( conv ) => {
    conv.close('ok doei')
} );

app.intent( 'Default Welcome Intent', conv => {
    if ( !conv.user.storage || ( Object.keys(conv.user.storage).length === 0 && conv.user.storage.constructor === Object ) ) {
        let response = { end : false, audioMessages : [ MESSAGES[ 'intro' ] ] };
        sendResponse( conv, response );
    } else {
        conv.ask( 'welke kamer wil je horen?' );
    }
} );

app.intent( 'Default Fallback Intent', conv => {
    let response = { end : false, audioMessages : [ MESSAGES[ 'fallback' ] ] };
    sendResponse( conv, response );
} );

app.intent( 'getRoom', conv => {
    let response = playRoom( conv, false );
    sendResponse( conv, response );
} );

app.intent( 'repeatRoom', conv => {
    let response = playRoom( conv, true );
    sendResponse( conv, response );
    console.log( getAmountRoomsListened( conv ) );
} );

app.intent( 'reset', conv => {
    conv.user.storage = {};
    conv.close( 'okay, herstart hotel spieker om opnieuw te beginnen' );
} );

// generic intents //switch with or without waiting
app.intent( [ 'intro', 'have_notes_no', 'have_notes_yes', 'ready_yes' ,'ready_no','follow_henk_yes','follow_henk_no','give_help_yes','give_help_no', 'call_henk','no_recording', 'empty_room','know_answer_yes','know_answer_no','know_anwser_unclear','accuse','accuse_yes', 'accuse_correct' , 'accuse_no','help','help_yes','help_no','help_sufficient', 'help_insufficient', 'question_rooms', 'question_map', 'question_crimescene','question_guestlist', 'question_codes', 'question_bird', 'question_james'], ( conv ) => {
    let message = MESSAGES[ conv.intent ][0];
    if ( MESSAGES[ conv.intent ].length > 1 ) {
        message = getRandomItem( MESSAGES[ conv.intent ] );
    }
    let response = { end : false, audioMessages : [ message ] };
    sendResponse( conv, response );
} );


//// Game logic
const MAXROOMS = 8;
let lastRoomPlayed = undefined;
let MESSAGES = {
    'intro' : [ '01.mp3' ],
    'have_notes_no' : [ '02.mp3' ],
    'have_notes_yes' : [ '03.mp3' ],
    'ready_yes' : [ '04.mp3' ],
    'ready_no' : [ '05.mp3' ],
    'follow_henk_yes' : [ '07.mp3' ],
    'follow_henk_no' : [ '06.mp3' ],
    'give_help_yes' : [ '08.mp3' ],
    'give_help_no' : [ '09.mp3' ],
    'call_henk' : [ '10.mp3' ],
    'no_recording' : [ '11.mp3' ],
    'empty_room' : [ '12.mp3' ],
    'end_room_question' : [ '13.mp3' ],
    'know_answer_yes' : [ '15.mp3' ],
    'know_answer_no' : [ '14.mp3' ],
    'know_answer_unclear' : [ '16.mp3' ],
    'accuse' : [ '17.mp3' ],
    'accuse_yes' : [ '19.mp3' ],
    'accuse_no' : [ '18.mp3' ],
    'accuse_correct' : [ '20.mp3' ],
    'accuse_wrong' : [ '21.mp3' ],
    'help' : [ '24.mp3' ],
    'help_yes' : [ '25.mp3', '26.mp3', '27.mp3', '28.mp3', '29.mp3' ],
    'help_no' : [ '30.mp3' ],
    'help_no_sufficient' : [ '31.mp3' ],
    'help_no_insufficient' : [ '32.mp3' ],
    'max_rooms_reached' : [ '23.mp3' ],
    'question_rooms' : [ '33.mp3' ],
    'question_map' : [ '34.mp3' ],
    'question_crimescene' : [ '35.mp3' ],
    'question_guestlist' : [ '36.mp3' ],
    'question_codes' : [ '37.mp3' ],
    'question_bird' : [ '38.mp3' ],
    'question_james' : [ '37.mp3' ],
    'waiting_sound' : [ 'Tick-tock-sound.mp3' ],
    'fallback' : [ '22.mp3' ]
};
let rooms = [
    {
        id : "1",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "2",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "3",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "4",
        audiofile: 'kamer_04.mp3'
    },
    {
        id : "5",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "6",
        audiofile: 'kamer_06.mp3'
    },
    {
        id : "7",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "8",
        audiofile: 'kamer_08.mp3'
    },
    {
        id : "9",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "10",
        audiofile: 'kamer_10.mp3'
    },
    {
        id : "11",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "12",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "13",
        audiofile: 'kamer_13.mp3'
    },
    {
        id : "14",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "15",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "16",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "17",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "18",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "19",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "20",
        audiofile: 'kamer_20.mp3'
    },
    {
        id : "21",
        audiofile: 'kamer_21.mp3'
    },
    {
        id : "22",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "23",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "24",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "25",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "26",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "27",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "28",
        audiofile: 'kamer_28.mp3'
    },
    {
        id : "29",
        audiofile: 'kamer_29.mp3'
    },
    {
        id : "30",
        audiofile: 'kamer_30.mp3'
    }
];




// helpers

// Utility to get a random item from an array
const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * (array.length))];
};


let getRoomsListened = ( conv ) => {
    if ( !conv.user.storage.roomsListened ) {
        conv.user.storage.roomsListened = [];
    }
    console.log( conv.user.storage.roomsListened );
    return conv.user.storage.roomsListened ;
};

let getAmountRoomsListened = ( conv ) => {
    return getRoomsListened( conv ).length  ||  0;
};

let getRoomsLeft = ( conv ) => {
    return MAXROOMS - getAmountRoomsListened( conv );
};

let setRoomListened = ( conv, id ) => {
    if (! conv.user.storage.roomsListened.includes( id ) ) {
        conv.user.storage.roomsListened.push( id );
    }
};

let setLastPlayed = ( conv, id ) => {
    conv.user.storage.lastRoomPlayed = id;
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

let playRoom = ( conv, repeat ) => {

    let response = {
        end: false,
        audioMessages: []
    };

    let room = getRoom(repeat ? conv.user.storage.lastRoomPlayed : conv.parameters.roomnumber );

    if ( getAmountRoomsListened( conv ) === MAXROOMS ) {
        // teveel geluisterd
        response.audioMessages.push( MESSAGES['max_rooms_reached'] );
        response.end = true;
    } else if (room.empty) {
        // lege kamers hebben ook een repsonse nodig, om de teller bij te kunnen houden
        setRoomListened( conv, room.id );
        setLastPlayed( conv,  room.id );
        response.audioMessages.push( getRoom( room.id ).audiofile );
    } else if ( getAmountRoomsListened( conv ) !== MAXROOMS && !room.listened ) {
        // ja mag ;
        setRoomListened( conv, room.id );
        lastRoomPlayed = room.id;
        response.audioMessages.push( getRoom( room.id ).audiofile );
        response.audioMessages.push( {isText: true, text:`je kunt nog ${getRoomsLeft( conv )} kamers beluisteren`} );
    } else if ( room.listened ) {
        // nogmaals luisteren
        response.audioMessages.push( getRoom( room.id ).audiofile );
        response.audioMessages.push( MESSAGES['end_room_question'] );
    } else {
        response.end = true;
    }

    return response;
};

let sendResponse = ( conv, response ) => {
    let responseMessage = generateAudioResponse( response );
    if ( response.end ) {
        conv.close( responseMessage );
    } else {
        conv.ask( responseMessage );
    }

};

let generateAudioResponse = ( input ) => {
    // TODO add flag for which have waiting elements
    if ( !input.end ) {
        input.audioMessages.push( MESSAGES['waiting_sound'] );
        input.audioMessages.push( MESSAGES['waiting_sound'] );
        input.audioMessages.push( MESSAGES['waiting_sound'] );
    }
    let messages = input.audioMessages.map( ( item, i ) => {
        if ( item.isText ) {
            return item.text
        } else {
            return `<audio src="${audioRoot}${item}"/>`
        }
    } );
    return `<speak>${messages.join( "" )}</speak>`;
};

expressApp.post( '/app', app );
expressApp.use( '/public' , express.static(__dirname + '/../public/') );
console.log( __dirname );
expressApp.listen( port );
console.log('listening on ' +  ip + ':'  + port);