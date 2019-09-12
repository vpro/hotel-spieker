const express = require( 'express' );
const bodyParser = require( 'body-parser' );

// Import the appropriate service and chosen wrappers
const { dialogflow } = require( 'actions-on-google' );

// Create an app instance
const app = dialogflow( {
    debug: false
} );

const expressApp = express().use( bodyParser.json() );

var ip = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;

const audioRoot = ( process.env.URL || 'https://hotelspieker.binnenkort-op.vpro.nl' ) + '/public/audio/';
const audioFormat = 'mp3';
const MAXROOMS = 8;
const DEMO_ID = '6b0434fe-82d5-43da-96ad-0da7377de3e4';

///// START MIDDLEWARE ////////
app.middleware( conv => {
    // will run before running the intent handler
    console.log( '////////// intent received: ' + conv.intent + ' ////////////' );
    console.log( 'contexts:', conv.contexts );
} );


///// START INTENTS ////////
app.intent( 'intro', ( conv ) => {

    let response = { audioMessages: [ getMessage( 'intro' ), getMessage( 'have_notes' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'have_notes_yes', ( conv ) => {
    let response = {
        audioMessages: [ getMessage( 'have_notes_yes' ), getMessage( 'have_notes_yes_continued' ) ]
    };
    sendResponse( conv, response );

    // keep from hanging in the same yes / no intent handler, so clear the context of the previous intent
    conv.contexts.delete( 'intro-followup' );

} );

app.intent( 'have_notes_no', ( conv ) => {
    conv.followup( 'hotel_spieker_NO_NOTES' );
} );

app.intent( 'user_has_no_notes', ( conv ) => {
    let response = { audioMessages: [ getMessage( 'have_notes_no' ), getMessage( 'have_notes' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'follow_henk_yes', ( conv ) => {
    let response = { audioMessages: [ getMessage( 'follow_henk_yes' ) ] };
    sendResponse( conv, response );

    // keep from hanging in the same yes / no intent handler, so clear the context of the previous intent
    conv.contexts.delete( 'have_notes_yes-followup' );
} );

app.intent( 'follow_henk_no', ( conv ) => {
    conv.user.storage = {};
    let response = { end: true, audioMessages: [ getMessage( 'follow_henk_no' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'provide_help_yes', ( conv ) => {

    let response = { audioMessages: [ getMessage( 'provide_help_yes' ), getMessage( 'which_room' ) ] };
    sendResponse( conv, response );

    // keep from hanging in the same yesy/no intent handler, so clear the context of the previous intent
    conv.contexts.delete( 'follow_henk_yes-followup' );
} );

app.intent( 'provide_help_no', ( conv ) => {
    conv.user.storage = {};
    let response = { end: true, audioMessages: [ getMessage( 'provide_help_no' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'getRoom', conv => {
    let response = playRoom( conv, false );
    sendResponse( conv, response );
} );

app.intent( 'get_room_yes', conv => {
    conv.contexts.delete( 'innocentCharacters' );
    conv.followup( 'hotel_spieker_AREYOUSURE' );
} );

app.intent( 'ready_for_another_room', conv => {
    let response = {
        audioMessages: []
    };
    conv.contexts.delete( 'ask_for_accusation' );

    response.audioMessages = [ getMessage( 'another_room' ) ];
    sendResponse( conv, response );

} );

app.intent( 'ready_for_another_room_yes', conv => {
    conv.contexts.delete( 'ready_for_another_room-followup' );
    conv.followup( 'hotel_spieker_READYFORROOM' );
} );

app.intent( 'ready_for_another_room_no', conv => {
    conv.contexts.delete( 'ready_for_another_room-followup' );
    conv.followup( 'hotel_spieker_WAITING' );
} );


app.intent( 'waiting', conv => {
    let response = {
        audioMessages: []
    };
    conv.contexts.delete( 'ready_for_another_room-followup' );
    conv.contexts.delete( 'ask_for_accusation' );

    response.audioMessages = [ getMessage( 'waiting_sound' ) ];

    sendResponse( conv, response );
} );

app.intent( 'waiting_no', conv => {
    conv.contexts.delete( 'waiting-followup' );
    conv.contexts.delete( 'ready_for_another_room-followup' );
    conv.followup( 'hotel_spieker_WAITING_AGAIN' );
} );

app.intent( 'waiting_yes', conv => {
    conv.contexts.delete( 'waiting-followup' );
    conv.contexts.delete( 'ready_for_another_room-followup' );
    conv.contexts.set('welcome_back-followup', 1);
    conv.followup( 'hotel_spieker_CONTINUE' );
} );


app.intent( 'waiting_again', conv => {
    let response = {
        audioMessages: []
    };
    conv.contexts.delete( 'waiting-followup' );

    response.audioMessages = [  getMessage( 'waiting_sound_continue' ) ];
    sendResponse( conv, response );
} );

app.intent( 'waiting_again_no', conv => {
    conv.contexts.delete( 'waiting_again-followup' );
    conv.followup( 'hotel_spieker_WAITING_AGAIN' );
} );

app.intent( 'waiting_again_yes', conv => {
    conv.contexts.delete( 'waiting_again-followup' );
    conv.contexts.set('welcome_back-followup', 1);

    conv.followup( 'hotel_spieker_CONTINUE' );
} );

// start welcome back
app.intent( 'welcome_back', conv => {
    let response = { audioMessages: [ getMessage( 'welcome_back' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'continue_no', conv => {
    conv.contexts.delete( 'welcome_back-followup' );
    conv.followup( 'hotel_spieker_STARTGAME' );
} );

app.intent( 'continue_yes', conv => {

    conv.contexts.delete( 'waiting-followup' );
    conv.contexts.delete( 'waiting_again-followup' );
    conv.contexts.delete( 'welcome_back-followup' );

    let response = {
        audioMessages: [ getMessage( 'end_room_question' ) ]
    };
    sendResponse( conv, response );

} );

app.intent( 'continue_yes_accusing', conv => {
    conv.followup( 'hotel_spieker_AREYOUSURE' );
} );

app.intent( ['are_you_sure_no','continue_yes_notaccusing', 'get_room_no' ], conv => {

    let response = {
        audioMessages: []
    };

    conv.contexts.delete( 'waiting-followup' );
    conv.contexts.delete( 'waiting_again-followup' );
    conv.contexts.delete( 'welcome_back-followup' );

    if ( getAmountRoomsListened( conv ) === MAXROOMS || getAmountRoomsListened( conv ) > MAXROOMS ) {
        // teveel geluisterd
        response.audioMessages = [ ( getMessage( 'max_rooms_reached' ) ), getMessage( 'end_room_question' ) ];
        sendResponse( conv, response );
    } else {
        conv.followup( 'hotel_spieker_READYFORANOTHER' );
    }

} );

// fallback for all yes/no questions
app.intent( [ 'have_notes_fallback', 'follow_henk_fallback',  'provide_help_fallback', 'get_room-fallback', 'ready_for_another_room_fallback', 'waiting_fallback', 'continue_fallback', 'waiting_again_fallback', 'are_you_sure-fallback', 'help_fallback' , 'help_no_fallback' ], conv => {
    let response = { audioMessages : [ getMessage( 'fallback_yes_no' ) ] };
    sendResponse( conv, response );
} );

// accuse
app.intent( 'accuse', conv => {
    conv.followup( 'hotel_spieker_AREYOUSURE' );
});

app.intent( 'are_you_sure', conv => {

    // keep from hanging in the same yes/no intent handler, so clear the context of the previous intent
    conv.contexts.delete( 'continue_yes-followup' );
    conv.contexts.delete( 'ask_for_accusation' );

    if ( getAmountRoomsListened( conv ) === MAXROOMS || getAmountRoomsListened( conv ) > MAXROOMS ) {
        // skip step 'are you sure' because we cant listen any more rooms anyway
        conv.followup( 'hotel_spieker_FORCEACCUSE' );
    } else {
        let response = { audioMessages: [ MESSAGES[ 'are_you_sure' ][ getRoomsLeft( conv ) ] , getMessage( 'are_you_sure_question' ) ] };
        sendResponse( conv, response );
    }

} );

app.intent( 'are_you_sure_yes', conv => {
    let response = { audioMessages: [ getMessage( 'are_you_sure_yes' ) ] };
    sendResponse( conv, response );
} );


app.intent( [ 'answer_given', 'answer_given_catchall' ], conv => {
    let answer = conv.parameters[ 'name' ] ? conv.parameters[ 'name' ].toLowerCase() : '';
    console.log( 'answer given: ', answer );
    let response = {};
    if ( answer === 'emma' ) {
        response = { end: true, audioMessages: [ getMessage( 'accuse_correct' ), getMessage( 'credits' ) ] };
    } else if ( answer in innocentCharacters ) {
        response = { end: true, audioMessages: [ MESSAGES[ 'accuse_wrong' ][ 0 ],  innocentCharacters[ answer ], MESSAGES[ 'accuse_wrong' ][ 1 ] ] };
    } else if ( answer in innocentCharacters2 ) {
        response = { end: true, audioMessages: [ MESSAGES[ 'accuse_wrong' ][ 0 ],  innocentCharacters2[ answer ] ] };
}    else {
        response = { end: true, audioMessages: [ getMessage( 'accuse__name_fallback' ) ] };
        console.log( 'error' );
    }
    conv.user.storage = {};
    sendResponse( conv, response );
} );

app.intent( 'prompt-ready-for-room', conv => {
    let response = { audioMessages: [ getMessage( 'which_room' ) ] };
    sendResponse( conv, response );

} );

/////////
// Dialogflow agent 'say_bye' intent handles 'actions_intent_CANCEL' event
app.intent( 'say_bye', ( conv ) => {
    let response = { end: true, audioMessages: [ getMessage( 'stop' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'Default Welcome Intent', conv => {
    // restart is always reset!
    conv.followup( 'hotel_spieker_WELCOMEBACK' );
} );


app.intent( 'Default Fallback Intent', conv => {
    let messages = [
        'sorry, ik begrijp niet helemaal wat je bedoelt, wil je nog wat bedenktijd?',
        'sorry, dat heb ik niet helemaal begrepen, wil je nog wat bedenktijd?'
    ];
    conv.ask( getRandomItem( messages ) )

} );

app.intent( 'default_fallback_yes', conv => {
    conv.followup( 'hotel_spieker_WAITING' );
} );

app.intent( 'default_fallback_no', conv => {
    conv.contexts.set('welcome_back-followup', 1);

    conv.followup( 'hotel_spieker_CONTINUE' );
} );

app.intent( 'repeatRoom', conv => {
    let response = playRoom( conv, true );
    sendResponse( conv, response );
} );

app.intent( 'reset', conv => {
    conv.user.storage = {};
    conv.close( 'okay, herstart hotel spieker om opnieuw te beginnen' );
} );

app.intent( 'help', conv => {

    conv.contexts.delete( 'roomlistened' );
    conv.contexts.delete( 'ask_for_accusation' );
    conv.contexts.delete( 'getRoom-followup' );
    conv.contexts.delete( 'welcome_back-followup' );
    conv.contexts.delete( 'waiting-followup' );
    conv.contexts.delete( 'waiting_again-followup' );
    conv.contexts.delete( 'ready_for_another_room-followup' );
    conv.contexts.delete( 'innocentCharacters' );
    conv.contexts.delete( 'follow_henk_yes-followup' );
    conv.contexts.delete( 'intro-followup' );
    conv.contexts.delete( 'continue_yes-followup' );
    conv.contexts.delete( 'continue_yes-followup' );

    let response = { audioMessages: [ getMessage( 'help' ) ] };
    sendResponse( conv, response );
} );

app.intent( 'help_yes', conv => {
    conv.contexts.delete( 'help-followup' );

    let response = { audioMessages: [ getMessage( 'help_yes' ) ] };
    sendResponse( conv, response );
} );

app.intent( ['help_yes_insufficient'], conv => {
    let response = { audioMessages: [ getMessage( 'help_yes_insufficient' ) ] };
    sendResponse( conv, response );
} );

app.intent( ['help_again_yes'], conv => {
    conv.followup( 'hotel_spieker_HELPNEEDED' );
} );

app.intent( ['help_again_no'], conv => {
    conv.followup( 'hotel_spieker_READYFORROOM' );
} );

app.intent( 'help_no', conv => {
    conv.contexts.delete( 'help-followup' );

    let response = { audioMessages: [ getMessage( 'help_no' ) ] };
    sendResponse( conv, response );
} );

app.intent( ['help_no_sufficient','help_yes_sufficient'], conv => {
    conv.followup( 'hotel_spieker_READYFORROOM' );
} );

app.intent( 'help_no_insufficient', conv => {
    let response = { audioMessages: [ getMessage( 'help_no_insufficient' ) ] };
    sendResponse( conv, response );
} );


//// Audio files
let MESSAGES = {
    'intro': [ 'I-01_v3' ],
    'have_notes': [ 'I-02' ],
    'have_notes_no': [ 'I-03' ],
    'have_notes_yes': [ 'I-04' ],
    'have_notes_yes_continued': [ 'I-05' ],
    'follow_henk_yes': [ 'I-07' ],
    'follow_henk_no': [ 'I-06' ],
    'provide_help_yes': [ 'I-08' ],
    'provide_help_no': [ 'I-09' ],
    'which_room': [ 'A-01-a', 'A-01-b', 'A-01-c', 'A-01-d' ],
    'which_room_fallback': [ 'FB-A-a', 'FB-A-b', 'FB-A-c', 'FB-A-d', 'FB-A-e' ],
    'no_recording': ['FB-A-1'], // MISSING ?
    'empty_room': [ 'FB-A-1' ], // MISSING ?
    'no_room': [ 'FB-A-1' ],
    'end_room_question': [ 'C-01-a', 'C-01-b', 'C-01-c', 'C-01-d' ],
    'another_room': [ 'D-01-a', 'D-01-b', 'D-01-c', 'D-01-d' ],
    'another_room_yes': [ 'D-02-a', 'D-02-b', 'D-02-c', 'D-02-d', 'D-02-e', 'D-02-f', 'D-02-g' ],
    'another_room_no': [''],
    'another_room_fallback': [ 'FB-A-a', 'FB-A-b', 'FB-A-c', 'FB-A-d', 'FB-A-e', ],
    'know_answer_yes': [''],
    'know_answer_no': [ 'C-02-a', 'C-02-b', 'C-02-c' ],
    'know_answer_unclear': [], // MISSING ?
    'are_you_sure' : [ 'J-01.8','J-01.7','J-01.6','J-01.5','J-01.4','J-01.3','J-01.2','J-01.1' ,'J-01.0' ],
    'are_you_sure_question' : [ 'J-02' ],
    'are_you_sure_yes': [ 'W-01' ],
    'are_you_sure_no': [''],
    'accuse_fallback': [ '' ],
    'accuse_correct': [ 'E-01' ],
    'accuse_wrong': [ 'E-02-1', 'E-02-2' ],
    'accuse__name_fallback': [ 'FB-W-a', 'FB-W-b', 'FB-W-c', 'FB-W-d' ],
    'rooms_left': [ 'B-01.8-a', 'B-01.7-a', 'B-01.6', 'B-01.5', 'B-01.4', 'B-01.3', 'B-01.2', 'B-01.1' ], // TODO add alternatives voor 7 and 8
    'welcome_back': [ 'H-01' ],
    'welcome_back_continue': [''],
    'welcome_back_reset': [ 'H-03' ],
    'welcome_back_reset_yes': [''],
    'welcome_back_reset_no': [''],
    'max_rooms_reached': [ 'L-01-a', 'L-01-b', 'L-01-c' ], // + C
    'stop': [ 'S' ],
    'help': [ 'Z-01' ],
    'help_yes': [ 'Z-02-1', 'Z-02-2', 'Z-02-3', 'Z-02-4', 'Z-02-5' ],
    'help_yes_sufficient': [''],
    'help_yes_insufficient': [ 'Z-04' ],
    'help_yes_insufficient_yes': [''],
    'help_yes_insufficient_no': [ 'Z-04' ],
    'help_no': [ 'Z-07' ],
    'help_no_sufficient': [ 'Z-08' ], // + A
    'help_no_insufficient': [ 'Z-09' ], // + F
    'waiting_sound': [ 'F-01-a_v2', 'F-01-b_v2', 'F-01-c_v2', 'F-01-e_v2', 'F-01-f_v2', 'F-01-g_v2', 'F-01-h_v2' ], // + C
    'waiting_sound_continue': [ 'F-02-a_v2', 'F-02-b_v2', 'F-02-c_v2', 'F-02-d_v2', 'F-02-e_v2', 'F-02-f_v2', 'F-02-g_v2', 'F-02-h_v2', 'F-02-i_v2', 'F-02-j_v2' , 'F-02-k_v2'],
    'fallback_yes_no': [ 'X-01-a', 'X-01-b', 'X-01-c', 'X-01-d', 'X-01-e', 'X-01-f', 'X-01-g', 'X-01-h', 'X-01-i', 'X-01-j' ],
    'fallback': [''], // MISSING
    'credits' :[ 'E-19' ]
};

let innocentCharacters = {
    'anna': [ 'E-03' ],
    'joan': [ 'E-04' ],
    'silvia': [ 'E-05' ],
    'esmee': [ 'E-06' ],
    'marian': [ 'E-07' ],
    'guido': [ 'E-08' ],
    'zelda': [ 'E-09' ],
    'gerard': [ 'E-10' ],
    'jannet': [ 'E-11' ],
    'puk': [ 'E-12' ],
    'bob': [ 'E-13' ],
    'henk': [ 'E-14' ],
};


let innocentCharacters2 = {
    'pien': [ 'E-15' ],
    'evert': [ 'E-16' ],
    'steve': [ 'E-17' ],
    'evaline': [ 'E-17' ],
    'thierry': [ 'E-18' ]
};


let rooms = [
    {
        id: "1",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "2",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "3",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "4",
        audiofile: 'K-04'
    },
    {
        id: "5",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "6",
        audiofile: 'K-06_v2'
    },
    {
        id: "7",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "8",
        audiofile: 'K-08'
    },
    {
        id: "9",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "10",
        audiofile: 'K-10'
    },
    {
        id: "11",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "12",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "13",
        audiofile: 'K-13'
    },
    {
        id: "14",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "15",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "16",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "17",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "18",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "19",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "20",
        audiofile: 'K-20_v2'
    },
    {
        id: "21",
        audiofile: 'K-21'
    },
    {
        id: "22",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "23",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "24",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "25",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "26",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "27",
        empty: true,
        audiofile: MESSAGES[ 'empty_room' ]
    },
    {
        id: "28",
        audiofile: 'K-28'
    },
    {
        id: "29",
        audiofile: 'K-29'
    },
    {
        id: "30",
        audiofile: 'K-30'
    }
];


// helpers

const getRandomItem = ( array ) => {
    return array[ Math.floor( Math.random() * ( array.length ) ) ];
};




let getRoomsListened = ( conv ) => {
    if ( !conv.user.storage.roomsListened ) {
        conv.user.storage.roomsListened = [];
    }
    console.log( 'rooms listened:' , conv.user.storage.roomsListened);
    return conv.user.storage.roomsListened;
};

let getAmountRoomsListened = ( conv ) => {
    return getRoomsListened( conv ).length || 0;
};

let getRoomsLeft = ( conv ) => {
    let amountListened = getAmountRoomsListened( conv );
    if ( !amountListened ) {
        amountListened = 0
    }
    return MAXROOMS - amountListened;
};

let setRoomListened = ( conv, id ) => {
    if ( !conv.user.storage.roomsListened.includes( id ) ) {
        conv.user.storage.roomsListened.push( id );
    }
};

let setLastPlayed = ( conv, id ) => {
    conv.user.storage.lastRoomPlayed = id;
};

let getMessage = ( messageId ) => {

    let message = MESSAGES[ messageId ][ 0 ];
    if ( MESSAGES[ messageId ].length > 1 ) {
        message = getRandomItem( MESSAGES[ messageId ] );
    }
    return message;
};

let getRoom = ( id ) => {
    let currentRoom = undefined;
    rooms.map( ( room ) => {
        if ( room.id === id ) {
            currentRoom = room;
        }
        return room;
    } );
    return currentRoom;
};

let playRoom = ( conv, repeat ) => {

    let response = {
        audioMessages: []
    };

    let room = getRoom( repeat ? conv.user.storage.lastRoomPlayed : conv.parameters.roomnumber );

    if ( getAmountRoomsListened( conv ) === MAXROOMS || getAmountRoomsListened( conv ) > MAXROOMS ) {
        // teveel geluisterd
        response.audioMessages.push( MESSAGES[ 'max_rooms_reached' ] );
        response.audioMessages.push( getMessage( 'end_room_question' ) );
    } else if ( !room ) {
        // kamer bestaat niet
        response.audioMessages.push( MESSAGES[ 'no_room' ] );
    } else if ( room.empty ) {
        setLastPlayed( conv, room.id );
        let messages = [
            'In die kamer zit niemand, welke andere kamer wil je horen?',
            'In kamer ' + room.id +  ' verblijven geen gasten, welke andere kamer wil je beluisteren?'
        ];
        conv.ask( getRandomItem( messages ) )
    } else if ( getAmountRoomsListened( conv ) !== MAXROOMS && !room.listened ) {
        // ja mag ;
        setRoomListened( conv, room.id );
        setLastPlayed( conv, room.id );
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
expressApp.use( '/public', express.static( __dirname + '/../public/' ) );
console.log( __dirname );
expressApp.listen( port );
console.log( 'listening on ' + ip + ':' + port );