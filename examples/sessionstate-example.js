// AoG features: In-dialog data persistence, Custom entities

// Follow steps 1️⃣ to 4️⃣ below to run the Action for the first time.
// Then come back to extend and customize the Action by following the rest of
// the instructions.

// Step 1️⃣: Change the name of the action used in the welcome prompt:
const name = 'Rooms Adventure';

// Step 2️⃣: Change the introductory prompt used after the welcome message:
const introPrompt = 'In this choose-your-own adventure game, you explore various rooms and pick which doors to open.';

// Step 3️⃣: Change the content used in the action:
const data = {
    "room1" : {
        "description" : "You are in a small room with 2 doors.",
        "optionsText" : "Which door would you like to open?",
        "options" : {
            "room2" : "green door", // Changes to room names need to be added to the
            "room3" : "blue door" // 'option' entity under the Entities menu on the left.
        }
    },
    "room2" : {
        "description" : "You are in a green room with 2 doors.",
        "optionsText" : "Which door now?",
        "options" : {
            "room4" : "yellow door",
            "room5" : "white door"
        }
    },
    "room3" : {
        "description" : "You are in a blue room with 2 doors.",
        "optionsText" : "Which door?",
        "options" : {
            "room2" : "green door",
            "room4" : "yellow door"
        }
    },
    "room4" : {
        "description" : "You are in a yellow room with a treasure chest.<audio src='https://storage.googleapis.com/actionsresources/HarpGlissUpDwn_1.wav'/>You are rich!<break time='500ms'/>And that's the end of the game."
    },
    "room5" : {
        "description" : "You are in a white room with 2 doors.",
        "optionsText" : "What is your choice?",
        "options" : {
            "room4" : "yellow door",
            "room3" : "blue door"
        }
    }
};

// 4️⃣ Testing:
// 🔹 Save any updates you have made to this code by clicking the Deploy button
//    at the bottom of this page.
// 🔹 Test this action in the Actions Console simulator by selecting
//    'Integrations/Google Assistant/Test' from the Dialogflow menu on the left.

// ℹ️ Ideas for extending and customizing this Action:
// 🔹 Instead of hardcoding the data, use a Firebase database: https://github.com/actions-on-google/dialogflow-quotes-nodejs
// 🔹 Invoke an external API to get the data: https://github.com/actions-on-google/dialogflow-quotes-nodejs
// 🔹 Learn more about advanced SSML: https://medium.com/google-developers/advanced-ssml-for-actions-on-google-5cea45d868c9

// ℹ️ Resources:
// 🔹 Actions on Google documentation: https://developers.google.com/actions/
// 🔹 More sample code on Github: https://github.com/actions-on-google
// 🔹 G+ community: https://plus.google.com/communities/105684267327487893574

////////////////////////////////////////////////////////////////////////////////

// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/* Fulfillment for a choose-your-own adventure action.
 * The action allows the user to ask for more.
 * https://developers.google.com/actions/dialogflow/fulfillment#building_fulfillment_response
 */

// Import the Dialogflow module from the Actions on Google client library.
// https://github.com/actions-on-google/actions-on-google-nodejs
const { dialogflow, Suggestions } = require( 'actions-on-google' );
// Import the firebase-functions package for Cloud Functions for Firebase fulfillment.
const functions = require( 'firebase-functions' );

// Instantiate the Dialogflow client with debug logging enabled.
const app = dialogflow( {
    debug : true
} );

// Do common tasks for each intent invocation
app.middleware( ( conv, framework ) => {
    console.log( `Intent=${conv.intent}` );
    console.log( `Type=${conv.input.type}` );
    // Determine if the user input is by voice
    conv.voice = conv.input.type === 'VOICE';
    if ( !(conv.intent === 'Default Fallback Intent' || conv.intent === 'No-input') ) {
        // Reset the fallback counter for error handling
        conv.data.fallbackCount = 0;
    }
} );

// Prompts used for responding to the user.
// Each prompt type can have multiple alternatives. A prompt is selected
// randomly to make the conversation more natural.
const prompts = {
    'welcome' : [
        `Welcome to ${name}.`,
        `Hi! It's time for ${name}.`
    ],
    'welcome_back' : [
        `Welcome back to ${name}.`,
        `Hi again. Welcome back to ${name}.`
    ],
    'intro' : [
        'Here we go.',
        `Let's get started.`
    ],
    'confirmation' : [
        'Sure.',
        'OK.',
        'Okay.',
        'Sure thing.',
        'Alright.'
    ],
    'quit' : [
        'Bye for now. Hope to see you soon.',
        'OK. Come back soon.',
        `Okay, let's try this again later.`,
        'OK. Hope to talk to you again soon.'
    ],
    'no_input1' : [
        'Sorry, what was that?',
        `Sorry, I didn't hear that.`,
        `If you said something, I didn't hear it.`
    ],
    'no_input2' : [
        `Sorry, I didn't catch that. Could you repeat yourself?`,
        `If you're still there, say that again.`
    ],
    'no_input3' : [
        `Okay let's try this again later.`,
        'We can stop here. See you soon.'
    ],
    'fallback1' : [
        `I didn't quite get that. What do you want to choose?`,
        `I didn't understand that. Which do you want to choose?`
    ],
    'fallback2' : [
        `Hmmm. Since I'm still having trouble, I'll stop here, but let's play again soon.`,
        `Since I'm still having trouble, I'll stop here. Try again in a few minutes.`,
        `Since I'm still having trouble, I'll stop here. Bye for now.`
    ],
    'help' : [
        'You can ask to repeat the options, go back, or quit. What do you want to do?',
        'You can ask for the options to be repeated or you can ask to go back. What do you want to do now?'
    ],
    'repeat' : [
        'Here it is again: ',
        'Let me repeat that: '
    ],
    'again' : [
        'Do you want to play the game again?',
        'Do you want to do that again?',
        'Do you want to try that again?',
        'Do you want to go again?',
        'Do you want to start the game over?'
    ],
    'options' : [
        'You can say: ',
        'You can pick from: ',
        'You can choose from: '
    ]
};

// Overwrite the default intro prompts with configured prompts above.
if ( introPrompt ) {
    if ( Array.isArray( introPrompt ) ) {
        prompts.intro = introPrompt;
    } else {
        prompts.intro = [ introPrompt ];
    }
}

// Suggestion chips to let the user pick options on screens
// https://developers.google.com/actions/assistant/responses#suggestion_chip
const suggestions = new Suggestions( 'Yes', 'No' );

// SSML tag to add a break in the response output
// https://developers.google.com/actions/reference/ssml
const breakTag = '<break time="1000ms"/>';

// Add sounds to responses by using the SSML <audio> tag
// Find more sounds in the AoG Sound Library:
// https://developers.google.com/actions/tools/sound-library/
const introSound = 'https://storage.googleapis.com/actionsresources/intro4norm.ogg';
const backgroundSound = 'https://actions.google.com/sounds/v1/ambiences/ambient_hum_air_conditioner.ogg';
const endSound = 'https://storage.googleapis.com/actionsresources/outro4norm.ogg';
const reactionSound = 'https://actions.google.com/sounds/v1/doors/wood_door_open_close.ogg';

// Timing of beginning prompt to slightly overlap with end of introSound
const introBegin = '2.0s';

// Utility to get a random item from an array
const getRandomItem = ( array ) => {
    return array[ Math.floor( Math.random() * (array.length) ) ];
};

// Utility to get a random prompt without sequential repeats
function getRandomPrompt ( conv, prompt ) {
    let availablePrompts = prompts[ prompt ];
    // Select a new prompt by avoiding prompts used previously in the session
    if ( conv.data.prompts ) {
        if ( typeof (conv.data.prompts[ prompt ]) !== 'undefined' ) {
            availablePrompts = availablePrompts.filter( word => word !== conv.data.prompts[ prompt ] );
        }
    } else {
        conv.data.prompts = {};
    }
    // Persist selected prompt in session storage
    if ( availablePrompts.length > 0 ) {
        conv.data.prompts[ prompt ] = getRandomItem( availablePrompts );
    } else {
        conv.data.prompts[ prompt ] = prompts[ prompt ][ 0 ];
    }
    return conv.data.prompts[ prompt ];
}

// Utility to generate SSML markup for the response
// https://developers.google.com/actions/reference/ssml
const makeSsml = ( conv, options ) => {
    if ( options.intro ) {
        // Introduction prompt
        conv.close( `<speak>
      <par>
        <media xml:id="introSound" begin="0.0s" soundLevel="5dB" fadeOutDur="1.0s">
          <audio
            src="${introSound}"/>
        </media>
        <media xml:id="intro" begin="${introBegin}">
          <speak>${options.prompt1}<break time="500ms"/>${options.prompt2}<break time="1000ms"/></speak>
        </media>
      </par>
    </speak>` );
        conv.close( `<speak>
      <par>
        <media xml:id="data">
          <speak>${options.prompt3}</speak>
        </media>
        <media xml:id="backgroundSound" begin="intro.begin-0.0s" end="data.end-0.0s" fadeOutDur="1.0s" soundLevel="-5dB">
          <audio
            src="${backgroundSound}"/>
        </media>
      </par>
    </speak>` );
    } else if ( options.end ) {
        // End the conversation
        conv.close( `<speak>
      <par>
        <media xml:id="intro">
          <speak>${options.prompt1}</speak>
        </media>
        <media xml:id="endSound" begin="intro.end-0.0s">
          <audio
            src="${endSound}"/>
        </media>
      </par>
    </speak>` );
    } else {
        // Not intro or end
        conv.ask( `<speak>
      <par>
        <media xml:id="reactionSound">
          <audio
            src="${reactionSound}"/>
        </media>
        <media xml:id="intro" begin="reactionSound.end+2.0s">
          <speak>${options.prompt1}<break time="500ms"/></speak>
        </media>
      </par>
    </speak>` );
        conv.ask( `<speak>
      <par>
        <media xml:id="data">
          <speak>${options.prompt2}</speak>
        </media>
        <media xml:id="more" begin="data.end+1.0s">
          <speak>${options.prompt3}</speak>
        </media>
        <media xml:id="backgroundSound" begin="intro.begin-0.0s" end="more.end-0.0s" fadeOutDur="1.0s" soundLevel="-5dB">
          <audio
            src="${backgroundSound}"/>
        </media>
      </par>
    </speak>` );
    }
};

// Default intent for handling the start of the action
app.intent( 'Default Welcome Intent', ( conv ) => {
    console.log( `Welcome: ${conv.user.last.seen}` );
    reset( conv );
    const response = selectOption( conv, null );
    const config = {
        intro : true,
        prompt1 : conv.user.last.seen ? getRandomItem( prompts.welcome_back ) : getRandomItem( prompts.welcome ),
        prompt2 : getRandomPrompt( conv, 'intro' ),
        prompt3 : !conv.voice ? `${response.description} ${response.optionsText}` : `${response.description} <break time="500ms"/>${response.options}`
    };
    makeSsml( conv, config );
    // Add suggestions to continue the conversation
    conv.ask( response.suggestions );
} );

// Fallback intent to handle user responses that aren't handled by other intents
app.intent( 'Default Fallback Intent', ( conv ) => {
    console.log( `Fallback: fallbackCount=${conv.data.fallbackCount}` );
    console.log( `Fallback: raw=${conv.input.raw}` );
    // Track the fallback count in session storage
    conv.data.fallbackCount = parseInt( conv.data.fallbackCount, 10 );
    conv.data.fallbackCount++;
    // Try to recover the conversation twice before ending the action
    if ( conv.data.fallbackCount === 1 ) {
        return conv.ask( getRandomPrompt( conv, 'fallback1' ) );
    }
    conv.close( getRandomPrompt( conv, 'fallback2' ) );
} );

// Handle the Option intent for user selection
app.intent( 'Option', ( conv, { option } ) => {
    console.log( `Option: option=${option}` );
    const keys = Object.keys( conv.data.options );
    for ( let key of keys ) {
        if ( conv.data.options[ key ] === option ) {
            option = key;
        }
    }
    const response = selectOption( conv, option );
    if ( response.options ) {
        const config = {
            prompt1 : response.description,
            prompt2 : '',
            prompt3 : !conv.voice ? response.optionsText : response.options
        };
        makeSsml( conv, config );
        conv.ask( response.suggestions );
    } else {
        // Final room
        reset( conv );
        makeSsml( conv, {
            prompt1 : response.description,
            prompt2 : '',
            prompt3 : getRandomPrompt( conv, 'again' )
        } );
        conv.ask( suggestions );
    }
} );

// Handle the More/Yes/Next/Again intents
app.intent( [ 'More', 'Yes', 'Next', 'Again' ], ( conv ) => {
    console.log( `More: fallbackCount=${conv.data.fallbackCount}` );
    const response = selectOption( conv, null );
    const config = {
        prompt1 : getRandomPrompt( conv, 'confirmation' ),
        prompt2 : '',
        prompt3 : !conv.voice ? `${response.description} ${response.optionsText}` : `${response.description} <break time="500ms"/>${response.options}`
    };
    makeSsml( conv, config );
    conv.ask( response.suggestions );
} );

// Handle the Repeat intent
app.intent( 'Repeat', ( conv ) => {
    console.log( `Repeat: ${conv.data.options}` );
    const response = selectOption( conv, conv.data.current );
    if ( response.options ) {
        const config = {
            prompt1 : getRandomPrompt( conv, 'repeat' ),
            prompt2 : response.description,
            prompt3 : !conv.voice ? response.optionsText : response.options
        };
        makeSsml( conv, config );
        conv.ask( response.suggestions );
    } else {
        // Final room
        reset( conv );
        makeSsml( conv, {
            prompt1 : getRandomPrompt( conv, 'confirmation' ),
            prompt2 : response.description,
            prompt3 : getRandomPrompt( conv, 'again' )
        } );
        conv.ask( suggestions );
    }
} );

// Handle the Previous intent
app.intent( 'Previous', ( conv ) => {
    console.log( `Previous: ${conv.data.options}` );
    const response = selectOption( conv, conv.data.previous );
    if ( response.options ) {
        const config = {
            prompt1 : getRandomPrompt( conv, 'confirmation' ),
            prompt2 : response.description,
            prompt3 : !conv.voice ? response.optionsText : response.options
        };
        makeSsml( conv, config );
        conv.ask( response.suggestions );
    } else {
        // Final room
        reset( conv );
        makeSsml( conv, {
            prompt1 : getRandomPrompt( conv, 'confirmation' ),
            prompt2 : response.description,
            prompt3 : getRandomPrompt( conv, 'again' )
        } );
        conv.ask( suggestions );
    }
} );

// Handle the No/Cancel/Don't know intent by closing the conversation
app.intent( [ 'No', 'Cancel', `Don't know` ], ( conv ) => {
    makeSsml( conv, {
        end : true,
        prompt1 : getRandomPrompt( conv, 'quit' )
    } );
} );

// Handle the Help intent
app.intent( 'Help', ( conv ) => {
    conv.ask( `${getRandomPrompt( conv, 'help' )}` );
} );

// Handle no-inputs from the user
// https://developers.google.com/actions/assistant/reprompts
app.intent( 'No-input', ( conv ) => {
    const repromptCount = parseInt( conv.arguments.get( 'REPROMPT_COUNT' ) );
    console.log( `No-input: repromptCount=${repromptCount}` );
    if ( repromptCount === 0 ) {
        conv.ask( getRandomPrompt( conv, 'no_input1' ) );
    } else if ( repromptCount === 1 ) {
        let options = [];
        if ( data[ conv.data.current ].options ) {
            for ( let key of Object.keys( data[ conv.data.current ].options ) ) {
                options.push( data[ conv.data.current ].options[ key ] );
            }
        }
        conv.ask( `${getRandomPrompt( conv, 'no_input2' )} ${getRandomPrompt( conv, 'options' )} ${makeOxfordCommaList( options )}.` );
    } else if ( conv.arguments.get( 'IS_FINAL_REPROMPT' ) ) {
        // Last no-input allowed; close conversation
        conv.close( getRandomPrompt( conv, 'no_input3' ) );
    }
} );

// Utility to make a list of options separated with an Oxford comma
const makeOxfordCommaList = ( options ) => {
    let joined = options.join( ', ' );
    const lastComma = joined.lastIndexOf( ',' );
    if ( lastComma !== -1 ) {
        joined = `${joined.substring( 0, lastComma )}, or ${joined.substring( lastComma + 1 )}`;
    }
    return joined;
};

// Take the user response, based on a custom entity, and select new options
const selectOption = ( conv, option ) => {
    const keys = Object.keys( data );
    const response = {};
    if ( keys.length > 0 ) {
        // Persist the selected option to allow for repeats and back tracking.
        conv.data.previous = conv.data.current;
        if ( option && keys.includes( option ) ) {
            conv.data.current = option;
        } else {
            conv.data.current = keys[ 0 ];
        }
        conv.data.options = data[ conv.data.current ].options;
        response.description = data[ conv.data.current ].description;
        if ( data[ conv.data.current ].options ) {
            response.optionsText = data[ conv.data.current ].optionsText
            const optionsKeys = Object.keys( data[ conv.data.current ].options );
            let options = [];
            for ( let key of optionsKeys ) {
                options.push( data[ conv.data.current ].options[ key ] );
            }
            response.suggestions = new Suggestions( options );
            response.options = `${getRandomPrompt( conv, 'options' )} ${makeOxfordCommaList( options )}.`;
        }
    } else {
        console.error( 'not enough data' );
    }
    return response;
};

// Reset all the session data about the game
const reset = ( conv ) => {
    conv.data.current = null;
    conv.data.previous = null;
    conv.data.options = null;
};

// Cloud Functions for Firebase handler for HTTPS POST requests.
// https://developers.google.com/actions/dialogflow/fulfillment#building_fulfillment_responses
exports.dialogflowFirebaseFulfillment = functions.https.onRequest( app );
