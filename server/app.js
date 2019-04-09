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

const audioRoot = ( process.env.URL || 'https://hotelspieker.binnenkort-op.vpro.nl' ) +  '/public/testaudio-v2/';
const audioFormat = 'mp3';

const testing =true;

/// TODO:
/// - check NO's in itro
/// - set contexts to start lsitening to rooms // backup first!!!!!
/// - credits


///// START TESTS ////////

// app.intent( 'prompt-ready-for-room', ( conv ) => {
//     conv.ask(new SimpleResponse({
//         speech: 'Wil je al een kamer beluisteren?',
//         text: 'Wil je al een kamer beluisteren?'
//         })
//     );
// } );
//
// // HOW TO SEND A EVENT INTENT (INTENT TRIGGERED BY CODE INSTEAD OF SPEECH)
// app.intent( 'testevent', ( conv ) => {
//     conv.ask(
//         new SimpleResponse({
//             speech: 'Okhier komt ie',
//             text: 'Okhier komt ie'
//         })
//     );
//     conv.followup('actions_intent_READYFORROOM');
// } );


///// END TESTS ////////



///// START INTENTS ////////

app.intent( 'intro', ( conv ) => {
    console.log('playing intro');
    conv.user.storage = {};
    console.log( conv.user.storage );
    // let response = { end : false, audioMessages : [ getMessage( 'intro' ), getMessage( 'have_notes' ) ] };
    let response = { end : false, audioMessages : [  getMessage( 'have_notes' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'have_notes_yes', ( conv ) => {
    console.log('have_notes_yes');
    // let response = { end : false, audioMessages : [ getMessage( 'have_notes_yes' ), getMessage( 'have_notes_yes_continued' ) ] };
    let response = { end : false, audioMessages : [ getMessage( 'have_notes_yes' ) ] };
    sendResponse( conv, response );

    // keep from hanging in the same intent handler, so clear the context of the previous
    conv.contexts.delete('intro-followup');

} );

app.intent( 'have_notes_no', ( conv ) => {
    console.log( 'have_notes_no');
    let response = { end : false, audioMessages : [ getMessage( 'have_notes_no' ), getMessage( 'have_notes' ) ] };
    sendResponse( conv, response );
} );


app.intent( 'follow_henk_yes', ( conv ) => {
    console.log('follow_henk_yes');
    // let response = { end : false, audioMessages : [ getMessage( 'give_help_yes' ), getMessage( 'waiting_sound' ) , getMessage( 'which_room' ) ] };
    let response = { end : false, audioMessages : [ getMessage( 'help_yes_insufficient_no' ) ] };
    sendResponse( conv, response );

    conv.contexts.delete('intro-followup');
} );

app.intent( 'follow_henk_no', ( conv ) => {
    let response = { end : false, audioMessages : [ getMessage( 'follow_henk_no' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'provide_help_yes', ( conv ) => {
    // let response = { end : false, audioMessages : [ getMessage( 'give_help_yes' ), getMessage( 'waiting_sound' )  ] };
    let response = { end : false, audioMessages : [ getMessage( 'which_room' ) ] };
    sendResponse( conv, response );

    // conv.add( responseMessage );
    // try trigger A?
    // conv.followup( 'actions_intent_WHICHROOM' );
    conv.contexts.delete('follow_henk_yes-followup');
} );

app.intent( 'provide_help_no', ( conv ) => {
    let response = { end : false, audioMessages : [ getMessage( 'provide_help_no' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'getRoom', conv => {
    let response = playRoom( conv, false );
    sendResponse( conv, response );
} );

app.intent( 'get_room_yes', conv => {
    conv.followup( 'actions_intent_AREYOUSURE' );
} );

app.intent( 'get_room_no', conv => {

    // mag nog een kamer luisteren?
    if ( getAmountRoomsListened( conv ) === MAXROOMS ) {

    } else {
        // end_room_question
    }
        // ja - ben je klaar om nog een akmer te luisteren
            // Ja welke kamer
            // nee ....... TODO mega ingewikkeld
        // nee - Je moet een keuze maken -> terug naar C

} );

// start welcome back
app.intent( 'welcome_back', conv => {
    let response = { end : false, audioMessages : [ getMessage( 'welcome_back' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'continue_no', conv => {
    conv.contexts.delete('welcome_back-followup');
    conv.followup( 'actions_intent_STARTGAME' );
} );

app.intent( 'continue_yes', conv => {
    let response = { end : false, audioMessages : [ MESSAGES[ 'rooms_left' ][ getRoomsLeft( conv ) ], getMessage( 'end_room_question' ) ] };
    sendResponse( conv, response );
    conv.contexts.delete('welcome_back-followup');

    // TODO: set context
} );

app.intent( 'continue_yes_accusing' , conv => {
    conv.followup( 'actions_intent_AREYOUSURE' );
} );

app.intent( 'continue_yes_notaccusing', conv => {
    let response = playRoom( conv, false );
    conv.followup( 'actions_intent_READYFORROOM' );
} );

// accuse
app.intent( 'are_you_sure', conv => {
    let response = { end : false, audioMessages : [ getMessage( 'are_you_sure' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'are_you_sure_yes', conv => {
    conv.contexts.delete('are_you_sure-followup');
    conv.contexts.delete('ask_for_accusation');

    let response = { end : false, audioMessages : [ getMessage( 'are_you_sure_yes' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'are_you_sure_no', conv => {
    let response = { end : false, audioMessages : [ getMessage( 'are_you_sure_no' ) ] };
    sendResponse( conv, response );
    conv.contexts.delete('are_you_sure-followup');
    conv.contexts.delete('ask_for_accusation');

} );

app.intent( 'answer_correct', conv => {
    let response = { end : true, audioMessages : [ getMessage( 'accuse_correct' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'accuse_wrong', conv => {
    let response = { end : true, audioMessages :  MESSAGES[ 'accuse_wrong' ]  };
    sendResponse( conv, response );
} );


app.intent( 'accuse_fallback', conv => {
    let response = { end : true, audioMessages :  MESSAGES[ 'accuse_wrong' ]  };
    sendResponse( conv, response );
} );









/////////
// Dialogflow agent 'say_bye' intent handles 'actions_intent_CANCEL' event
app.intent( 'say_bye', ( conv ) => {
    let response = { end : true, audioMessages : [ getMessage( 'stop' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'Default Welcome Intent', conv => {
    console.log('welcome');
    console.log( conv.user.storage );
    if ( !conv.user.storage || ( Object.keys(conv.user.storage).length === 0 && conv.user.storage.constructor === Object ) ) {
        console.log( 'trigger actions_intent_STARTGAME' );
        conv.followup( 'actions_intent_STARTGAME' );
    } else {
        console.log( 'trigger actions_intent_WELCOMEBACK' );
        conv.followup( 'actions_intent_WELCOMEBACK' );
    }
} );








app.intent( 'Default Fallback Intent', conv => {
    let response = { end : false, audioMessages : [ MESSAGES[ 'stop' ] ] };
    sendResponse( conv, response );
} );

//TODO is this needed?
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
// app.intent( [ 'have_notes_no','follow_henk_yes', 'follow_henk_no','give_help_yes', 'give_help_no', 'call_henk','no_recording', 'empty_room','know_answer_yes','know_answer_no','know_anwser_unclear','accuse','accuse_yes', 'accuse_correct' , 'accuse_no','help','help_yes','help_no','help_sufficient', 'help_insufficient', 'question_rooms', 'question_map', 'question_crimescene','question_guestlist', 'question_codes', 'question_bird', 'question_james'], ( conv ) => {
//     let response = { end : false, audioMessages : [ getMessage( conv.intent ) ] };
//     console.log(conv.intent);
//     console.log(response);
//
//     sendResponse( conv, response );
// } );


//// Game logic
const MAXROOMS = 8;
let lastRoomPlayed = undefined;
// let MESSAGES = {
//     'intro' : [ '01.mp3' ],
//     'have_notes_no' : [ '02.mp3' ],
//     'have_notes_yes' : [ '03.mp3' ],
//     'ready_yes' : [ '04.mp3' ],
//     'ready_no' : [ '05.mp3' ],
//     'follow_henk_yes' : [ '07.mp3' ],
//     'follow_henk_no' : [ '06.mp3' ],
//     'give_help_yes' : [ '08.mp3' ],
//     'give_help_no' : [ '09.mp3' ],
//     'call_henk' : [ '10.mp3' ],
//     'no_recording' : [ '11.mp3' ],
//     'empty_room' : [ '12.mp3' ],
//     'end_room_question' : [ '13.mp3' ],
//     'know_answer_yes' : [ '15.mp3' ],
//     'know_answer_no' : [ '14.mp3' ],
//     'know_answer_unclear' : [ '16.mp3' ],
//     'accuse' : [ '17.mp3' ],
//     'accuse_yes' : [ '19.mp3' ],
//     'accuse_no' : [ '18.mp3' ],
//     'accuse_correct' : [ '20.mp3' ],
//     'accuse_wrong' : [ '21.mp3' ],
//     'help' : [ '24.mp3' ],
//     'help_yes' : [ '25.mp3', '26.mp3', '27.mp3', '28.mp3', '29.mp3' ],
//     'help_no' : [ '30.mp3' ],
//     'help_no_sufficient' : [ '31.mp3' ],
//     'help_no_insufficient' : [ '32.mp3' ],
//     'max_rooms_reached' : [ '23.mp3' ],
//     'question_rooms' : [ '33.mp3' ],
//     'question_map' : [ '34.mp3' ],
//     'question_crimescene' : [ '35.mp3' ],
//     'question_guestlist' : [ '36.mp3' ],
//     'question_codes' : [ '37.mp3' ],
//     'question_bird' : [ '38.mp3' ],
//     'question_james' : [ '37.mp3' ],
//     'waiting_sound' : [ 'Tick-tock-sound.mp3' ],
//     'fallback' : [ '22.mp3' ]
// };


let MESSAGES = {
    'intro' : [ 'I-01' ],
    'have_notes' : [ 'I-02' ],
    'have_notes_no' : [ 'I-03' ],
    'have_notes_yes' : [ 'I-04' ],
    'have_notes_yes_continued' : [ 'I-05' ],
    'follow_henk_yes' : [ 'I-07' ],
    'follow_henk_no' : [ 'I-06' ],
    'provide_help_yes' : [ 'I-08' ], // + waiting + 'kamerkeuze'
    'provide_help_no' : [ 'I-09' ],
    'which_room' : [ 'A-01-a', 'A-01-b', 'A-01-c', 'A-01-d' ], // was 'call henk'
    'which_room_fallback' : [ 'FB-A-a', 'FB-A-b', 'FB-A-c', 'FB-A-d', 'FB-A-e' ],
    'no_recording' : [  ], // missing in scenes
    'empty_room' : [  ], // missing in scenes
    'no_room' : [ 'FB-A-1' ],
    'end_room_question' : [ 'C-01-a' , 'C-01-b', 'C-01-c', 'C-01-d'],
    'another_room' : [ 'D-01-a' , 'D-01-b', 'D-01-c', 'D-01-d'],
    'another_room_yes' : [ 'D-02-a' , 'D-02-b', 'D-02-c', 'D-02-d', 'D-02-e' , 'D-02-f', 'D-02-g'],
    'another_room_no' : [], // +F
    'another_room_fallback' : [], // + X
    'know_answer_yes' : [ ], // + J
    'know_answer_no' : [ 'C-02-a', 'C-02-b', 'C-02-c' ], // + D
    'know_answer_unclear' : [  ], //MISSING?
    'are_you_sure': ['J'],
    // 'are_you_sure' : [ 'J-02','J-01.8','J-01.7','J-01.6','J-01.5','J-01.4','J-01.3','J-01.2','J-01.1' ],
    'are_you_sure_yes' : [ 'W' ],
    'are_you_sure_no' : [ ], // + G
    'accuse_fallback' : [ ''], // + X
    'accuse_correct' : [ 'E-01' ], // + E19
    'accuse_wrong' : [ 'E-02-1' , 'E-02-2'], //  + Matching incorrect + E-02-2
    'accuse__name_fallback' : [ 'FB-W-a' , 'FB-W-b', 'FB-W-c' , 'FB-W-d' ],
    'rooms_left' : [ 'B-01.8','B-01.7','B-01.6','B-01.5','B-01.4','B-01.3','B-01.2','B-01.1' ], // + C
    'welcome_back': [ 'H-01' ],
    'welcome_back_continue': [ ], // + B
    'welcome_back_reset': [ 'H-03' ],
    'welcome_back_reset_yes': [  ], // + I-01
    'welcome_back_reset_no': [  ], // + H-01
    'max_rooms_reached' : [ 'L-01-a', 'L-01-b', 'L-01-c' ], // + C
    'stop' : [ 'S' ],
    /// questions
    'help' : [ 'Z-01' ],
    'help_yes' : [ 'Z-02-1', 'Z-02-2', 'Z-02-3', 'Z-02-4', 'Z-02-5' ],
    'help_yes_sufficient' : [  ], // + A
    'help_yes_insufficient' : [ 'Z-04' ],
    'help_yes_insufficient_yes' : [  ], // + Z2 (help_yes)
    'help_yes_insufficient_no' : [ 'Z-04' ], // + Z7(help_no)
    'help_no' : [ 'Z-07' ],
    'help_no_sufficient' : [ 'Z-08' ], // + A
    'help_no_insufficient' : [ 'Z-09' ], // + F
    'question_rooms' : [  ], //MISSING
    'question_map' : [  ], //MISSING
    'question_crimescene' : [  ], //MISSING
    'question_guestlist' : [  ], //MISSING
    'question_codes' : [  ], //MISSING
    'question_bird' : [  ], //MISSING
    'question_james' : [  ], //MISSING
    'waiting_sound' : [ 'F-01-a','F-01-b','F-01-c','F-01-d','F-01-e','F-01-f','F-01-g','F-01-h' ], // + C
    'waiting_sound_continue' : [ 'F-02-a','F-02-b','F-02-c','F-02-d','F-02-e','F-02-f','F-02-g','F-02-h','F-02-i','F-02-j','F-02-k' ],
    'fallback_yes_no' : [ 'X-01-a','X-01-b','X-01-c','X-01-d','X-01-e','X-01-f','X-01-gg','X-01-h','X-01-i','X-01-j' ],
    'fallback' : [] //MISSING
};

let characters  =  {
    anna: ['E-03'],
    joan: ['E-04'],
    silvia: ['E-05'],
    esmee: ['E-06'],
    marian: ['E-07'],
    guido: ['E-08'],
    zelda: ['E-09'],
    gerard: ['E-10'],
    jannet: ['E-11'],
    puk: ['E-12'],
    bob: ['E-13'],
    henk: ['E-14'],
    pien: ['E-15'],
    evert: ['E-16'],
    steve: ['E-17'],
    evaline: ['E-17'],
    thierry: ['E-18']
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
        audiofile: 'K-04'
    },
    {
        id : "5",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "6",
        audiofile: 'K-06'
    },
    {
        id : "7",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "8",
        audiofile: 'K-08'
    },
    {
        id : "9",
        empty: true,
        audiofile: MESSAGES['empty_room']
    },
    {
        id : "10",
        audiofile: 'K-10'
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
        audiofile: 'K-13'
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
        audiofile: 'K-20'
    },
    {
        id : "21",
        audiofile: 'K-21'
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
        audiofile: 'K-28'
    },
    {
        id : "29",
        audiofile: 'K-29'
    },
    {
        id : "30",
        audiofile: 'K-30'
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

let getMessage = ( messageId ) => {

    let message = MESSAGES[ messageId ][0];
    if ( MESSAGES[ messageId ].length > 1 ) {
        message = getRandomItem( MESSAGES[ messageId ] );
    }
    return message ;
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
        end : false,
        audioMessages : []
    };

    let room = getRoom( repeat ? conv.user.storage.lastRoomPlayed : conv.parameters.roomnumber );

    if ( getAmountRoomsListened( conv ) === MAXROOMS ) {
        // teveel geluisterd
        response.audioMessages.push( MESSAGES[ 'max_rooms_reached' ] );
        response.audioMessages.push( getMessage( 'end_room_question' ) ); //TODO add C 'wie heeft het gedaan'
        response.end = true;
    } else if ( room.empty ) { // TODO add if room doesnt exist
        // lege kamers hebben ook een repsonse nodig, om de teller bij te kunnen houden
        setRoomListened( conv, room.id );
        setLastPlayed( conv, room.id );
        // response.audioMessages.push( MESSAGES[ 'no_room' ] );
        conv.ask('daar zit niemand, welke kamer wil je horen?') // TODO MISSING
    } else if ( getAmountRoomsListened( conv ) !== MAXROOMS && !room.listened ) {
        // ja mag ;
        setRoomListened( conv, room.id );
        lastRoomPlayed = room.id;
        response.audioMessages.push( getRoom( room.id ).audiofile );
        response.audioMessages.push( MESSAGES[ 'rooms_left' ][ getRoomsLeft( conv ) ] );
        response.audioMessages.push( getMessage( 'end_room_question' ) );

    } else if ( room.listened ) {
        // nogmaals luisteren
        response.audioMessages.push( getRoom( room.id ).audiofile );
        response.audioMessages.push( getMessage( 'end_room_question' ) );
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

    let messages = input.audioMessages.map( ( item, i ) => {
        if ( item.isText ) {
            return item.text
        } else {
            return `<audio src="${audioRoot}${item}.${audioFormat}"/>`
        }
    } );
    return `<speak>${messages.join( "" )}</speak>`;
};

expressApp.post( '/app', app );
expressApp.use( '/public' , express.static(__dirname + '/../public/') );
console.log( __dirname );
expressApp.listen( port );
console.log('listening on ' +  ip + ':'  + port);