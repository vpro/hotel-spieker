var storyData = {
    "actors" : {},
    "randoms" : { "myRoom" : [ "423", "444", "491", "42", "2" ] },
    "meta" : {
        "sortTitle" : "hotel speaker",
        "author" : "VPRO",
        "docID" : "1JY3r0vFhvlUC8PuFMfw-4Qz_yNF62wk5qkg8HEXEyJ4",
        "startFound" : true,
        "title" : "Hotel Speaker",
        "sortAuthor" : "vpro"
    },
    "blocks" : [ {
        "role" : "Intro",
        "indentation" : 0,
        "children" : [ 1, 2, 3, 6 ],
        "rawInstruction" : "Intro",
        "id" : 0,
        "text" : [ "<speak>", "  <par>", "    <media xml:id=\"question\" begin=\"0.5s\">", "      <speak>You’re about to check into Hotel Speaker, and you are standing at the frontdesk in the crowded lobby. There’s nobody behind the desk, but there is a bell. Through the door behind the desk you see a man sitting on a chair, eating a donut. You want get the attention of the man</speak>", "    </media>", "    <media begin=\"answer.end-0.2s\" soundLevel=\"-50db\">", "      <audio", "        src=\"https://files.vpro.nl/test/hotel-spieker/Crowd-noise-sound-effect.mp3\"/>", "    </media>", "  </par>", "</speak>" ],
        "numberOfTabs" : 0,
        "catchAllChild" : 6
    }, {
        "parent" : 0,
        "intents" : [ "ring bell", "bell", "use bell" ],
        "indentation" : 36,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"ring bell\" or \"bell\" or \"use bell\"",
        "id" : 1,
        "text" : [ "\t<audio src=\"https://files.vpro.nl/test/hotel-spieker/Desk-bell-sound.wav\"></audio>" ],
        "numberOfTabs" : 1
    }, {
        "parent" : 0,
        "intents" : [ "leave hotel" ],
        "indentation" : 36,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"leave hotel\"",
        "id" : 2,
        "text" : [ "You’ve decided this hotel is not up to your standards. You exit onto the street, but are immediately hit by a car and die. " ],
        "numberOfTabs" : 0,
        "isEnd" : true
    }, {
        "parent" : 0,
        "intents" : [ "hello", "excuse me" ],
        "indentation" : 36,
        "children" : [ 4, 5 ],
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"hello\" or \"excuse me\"",
        "id" : 3,
        "text" : [ "The man approaches the desk and gives you a bored look. <voice gender=\"male\" variant=\"2\">What do you want</voice>, he seems to say." ],
        "numberOfTabs" : 0,
        "catchAllChild" : 5
    }, {
        "parent" : 3,
        "intents" : [ "my room", "can i have the key to my room", "check in", "I want to check in" ],
        "indentation" : 72,
        "goto" : "Get Room Key",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"my room\" or \"can i have the key to my room\" or \"check in\" or \"I want to check in\" ",
        "id" : 4,
        "text" : [ "" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 3,
        "indentation" : 72,
        "id" : 5,
        "text" : [ "You are tired of your journey and want to get to your room for a nap." ],
        "isCatchAll" : true,
        "numberOfTabs" : 0
    }, {
        "parent" : 0,
        "indentation" : 36,
        "id" : 6,
        "text" : [ "That doesn’t work, try getting the attention of the man behind the desk." ],
        "isCatchAll" : true,
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "children" : [ 8 ],
        "id" : 7,
        "text" : [ "Name please, says the man" ],
        "title" : "Get Room Key",
        "numberOfTabs" : 0
    }, {
        "parent" : 7,
        "indentation" : 36,
        "goto" : "receiveKey",
        "isInput" : true,
        "rawInstruction" : "\tSave response as ^PlayerName^",
        "id" : 8,
        "text" : [ "" ],
        "numberOfTabs" : 1,
        "inputName" : "PlayerName"
    }, {
        "indentation" : 0,
        "children" : [ 10, 11 ],
        "id" : 9,
        "text" : [ "Welcome to Hotel Speaker, ^PlayerName^, says the man behind the desk. He gives you a key for room #myRoom#. You are carrying some heavy luggage. Do you want to take the stairs or the elevator to the fourth floor?" ],
        "title" : "receiveKey",
        "numberOfTabs" : 0
    }, {
        "parent" : 9,
        "intents" : [ "stairs" ],
        "indentation" : 36,
        "goto" : "Opening Door",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"stairs\"",
        "id" : 10,
        "text" : [ "\tYou take the stairs upstairs, feeling yourself getting fitter with every step. " ],
        "numberOfTabs" : 0
    }, {
        "parent" : 9,
        "intents" : [ "elevator" ],
        "indentation" : 36,
        "goto" : "Opening Door",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"elevator\"",
        "id" : 11,
        "text" : [ "This way, you will never lose those extra pounds you are carrying since thanksgiving. " ],
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "children" : [ 13 ],
        "id" : 12,
        "text" : [ "On the fourth floor, you approach the door of your room." ],
        "title" : "Opening Door",
        "numberOfTabs" : 0
    }, {
        "parent" : 12,
        "intents" : [ "use key", "open door", "enter room" ],
        "indentation" : 36,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"use key\" or \"open door\" or \"enter room\"",
        "id" : 13,
        "text" : [ "\tYou open the door to your hotelroom. It’s dark inside. You walk in slowly and once the sensor notices you, the lights go on. And there it is, a body on the floor. <audio src=\"https://files.vpro.nl/test/hotel-spieker/Dun-dun-dun-sound-effect-brass.mp3]][[END\"></audio>" ],
        "numberOfTabs" : 1
    }, {
        "intents" : [ "where am i" ],
        "indentation" : 0,
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"where am i\"",
        "id" : 14,
        "text" : [ "You are in Hotel Speaker, the most advanced, high-tech hotel on the planet." ],
        "numberOfTabs" : 0
    }, {
        "role" : "Fallback",
        "indentation" : 0,
        "rawInstruction" : "Fallback",
        "id" : 15,
        "text" : [ "Sorry, I didn’t get that. Please try again." ],
        "numberOfTabs" : 0
    } ]
};
var functions = require( "firebase-functions" );
const DialogflowApp = require( "actions-on-google" ).DialogflowApp;
exports.dialogflowFirebaseFulfillment = functions.https.onRequest( function ( t, e ) {

    console.log( "begin function" );

    var r = new DialogflowApp( { request : t, response : e } );
    var a = r.getRawInput();
    var o = [ "yes", "yeah", "sure", "okay" ];
    var n = [ "no", "nope", "never", "rather not", "don't think so" ];

    if ( hasStoryEnded( r ) && !r.data.userQuit ) {
        for ( var s = 0; s < o.length; s++ ) {
            if ( a.toLowerCase().indexOf( o[ s ] ) > -1 ) {
                return startStory( r, storyData, i );
            }
        }
        for ( s = 0; s < n.length; s++ ) {
            if ( a.toLowerCase().indexOf( n[ s ] ) > -1 ) {
                return r.data.userQuit = !0, r.tell( "<speak>Okay. Goodbye.</speak>" );
            }
        }
        return r.ask( "<speak>Sorry, I didn't get that. Do you want to play this story again?</speak>" )
    }

    function i ( t, e, r ) {
        console.log( "finished" ), console.log( t ), e.ask( t )
    }

    isStoryPlaying( r ) ? tryAdvanceStory( r, a, i ) : (r.data.userQuit = !1, startStory( r, storyData, i ))
} );
var finishedCallback, tracery = require( "tracery-grammar" ),
    storyStateDefaults = { storyStarted : !1, currentBlock : -1, history : [], isPreview : !1 },
    useExperimentalGotos = !0;

function setApp ( t ) {
}

function isStoryPlaying ( t ) {
    return !!(t.data && t.data.storyState && t.data.storyState.storyStarted) && !hasStoryEnded( t );
}

function hasStoryEnded ( t ) {
    if ( t && t.data && t.data.storyState && t.data.storyState.history ) {
        for ( var e = t.data.storyState.history, r = 0; r < e.length; r++ ) {
            if ( e[ r ].isEnd ) {
                return !0;
            }
        }
    }
    return !1;
}

function startStory ( t, e, r, a, o ) {
    finishedCallback = r, resetState( t ), a || (a = ""), e.randoms && parseRandoms( t, e.randoms ), t.data.storyState.story = e, t.data.storyState.storyStarted = !0, t.data.storyState.isPreview = o, playBlock( t, getBlockByAttribute( t, getCurStory( t ), "role", "intro" ), a )
}

function parseRandoms ( t, e ) {
    var r = Object.keys( e ), a = tracery.createGrammar( e );
    for ( var o of(t.data.pickedRandoms = {}, r) ) {
        t.data.pickedRandoms[ o ] = a.flatten( "#" + o + "#" );
    }
}

function tryAdvanceStory ( t, e, r, a ) {
    if ( t.data.lastUserMessage = e, r && (finishedCallback = r), e.toLowerCase().indexOf( "reset data" ) > -1 ) {
        return resetState( t ), respond( t, "resetting data" );
    }
    advanceStory( t, e, a, r );
}

function endStory ( t ) {
    return isStoryPlaying( t ) && resetState( t );
}

function advanceStory ( t, e, r, a, o, n ) {
    t.data.storyState.storyStarted = !0;
    var s = t.data.storyState.currentBlock;
    if ( !s.children || 0 === s.children.length ) {
        for ( var i = t.data.storyState.history.length - 1; i >= 0; i-- ) {
            if ( t.data.storyState.history[ i ].children && t.data.storyState.history[ i ].children.length > 0 ) {
                s = t.data.storyState.history[ i ];
                break;
            }
        }
    }
    var l = getChildBlocksWithIntent( t, getCurStory( t ), s, e, !0, r );
    if ( l.length > 0 ) {
        return playBlock( t, l[ 0 ] );
    }
    var y = getGlobalBlocksWithIntent( t, getCurStory( t ), s, e, !0 );
    if ( y.length > 0 ) {
        return playBlock( t, y[ 0 ] );
    }
    if ( !s.catchAllChild ) {
        return playBlock( t, getBlockByAttribute( t, getCurStory( t ), "role", "fallback" ) );
    }
    var d = getBlockByAttribute( t, getCurStory( t ), "id", s.catchAllChild );
    return d ? playBlock( t, d ) : void 0;
}

function getGlobalBlocksWithIntent ( t, e, r, a, o ) {
    for ( var n = [], s = 0; s < e.length; s++ ) {
        e[ s ].isGlobal && checkIfBlockHasIntent( t, e[ s ], a, !0 ) && n.push( e[ s ] );
    }
    return n;
}

function getChildBlocksWithIntent ( t, e, r, a, o, n ) {
    var s = [], i = r.children;
    if ( i ) {
        for ( var l = 0; l < e.length; l++ ) {
            for ( var y = e[ l ], d = 0; d < i.length; d++ ) {
                i[ d ] == y.id && (checkIfBlockHasIntent( t, y, a, !0 ) || y.isInput && !n) && s.push( y );
            }
        }
    }
    return s;
}

function checkIfBlockHasIntent ( t, e, r, a ) {
    if ( "intents" in e ) {
        var o = t.data[ e.variableForIntents ] || r;
        if ( a ) {
            for ( var n = 0; n < e.intents.length; n++ ) {
                if ( o.replace( /['"‘’“”]/g, "" ).toLowerCase().indexOf( e.intents[ n ].replace( /['"‘’“”]/g, "" ).toLowerCase() ) > -1 ) {
                    return !0;
                }
            }
        }
    }
    return !1;
}

function getBlockContent ( t, e, r ) {
    if ( e.inputName && (t.data[ e.inputName ] = t.getRawInput()), r || (r = ""), !e.text ) {
        if ( !r && !e.goto ) {
            if ( e.isInput ) {
                var a = "";
                return t.data.lastUserMessage && (a = t.data.lastUserMessage), tryAdvanceStory( t, a, null, !0 );
            }
            return !1;
        }
        e.text = [ "" ];
    }
    var o = r + e.text.join( " " ), n = o.match( /(#[a-zA-Z]+#)/g ), s = o.match( /(\^[a-zA-Z0-9]+\^)/g );
    if ( n ) {
        for ( var i of n ) {
            var l = i.replace( /#/g, "" ), y = t.data.pickedRandoms[ l ];
            o = o.replace( i, y );
        }
    }
    if ( s ) {
        for ( var d of s ) {
            var c = d.replace( /\^/g, "" ), u = t.data[ c ];
            o = o.replace( d, u );
        }
    }
    var f = !1;
    if ( e.goto ) {
        if ( !useExperimentalGotos ) {
            return e.goto != e.title && playBlock( t, getBlockByAttribute( t, getCurStory( t ), "title", e.goto ) );
        }
        if ( e.goto == e.title ) {
            return !1;
        }
        var g = getBlockContent( t, getBlockByAttribute( t, getCurStory( t ), "title", e.goto ), o );
        e = g.block, o = g.text
    }
    return e.isEnd && (f = !0), { text : o, isEnd : f, block : e };
}

function playBlock ( t, e, r ) {
    var a = getBlockContent( t, e, r );
    if ( !a ) {
        return !1;
    }
    if ( a.isEnd ) {
        var o = '<break time="2s"/>';
        t.data.storyState.isPreview ? o += "That's the end of your story. You can restart it, or play another one of your stories." : o += "Want to play this story again?", a.text += o;
    }
    t.data.storyState.currentBlock = a.block, t.data.storyState.history.push( t.data.storyState.currentBlock ), respond( t, a.text, a.isEnd );
}

function respond ( t, e, r ) {
    finishedCallback( "<speak>" + e + "</speak>", t, r );
}

function getCurStory ( t ) {
    return t.data.storyState.story.blocks;
}

function getBlockByAttribute ( t, e, r, a ) {
    var o;
    isString( a ) && (a = a.toLowerCase());
    for ( var n = 0; n < e.length; n++ ) {
        if ( r in e[ n ] && (isString( o = e[ n ][ r ] ) && (o = o.toLowerCase()), o == a) ) {
            return e[ n ];
        }
    }
    return !1;
}

function isString ( t ) {
    return "string" == typeof t || t instanceof String;
}

function resetState ( t ) {
    t.data.storyState || (t.data.storyState = {}), t.data.storyState.history = [], t.data.storyState.storyStarted = !1, t.data.storyState.currentBlock = -1;
}

module.exports.isStoryPlaying = isStoryPlaying, module.exports.startStory = startStory, module.exports.tryAdvanceStory = tryAdvanceStory, module.exports.endStory = endStory, module.exports.setApp = setApp, module.exports.hasStoryEnded = hasStoryEnded;




///////////////////////////////