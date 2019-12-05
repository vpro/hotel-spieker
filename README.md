# hotel-spieker

Engine for Google Home game Hotel Spieker

This code is the webhook for the 'Hotel-Spieker' agent created in https://console.dialogflow.com (using VPRO digitaal account, works best in chrome)

The flow of the agent + webhook corresponds with the scenario as defined in:
https://docs.google.com/document/d/1D46ujIePTsNuZVTFygzjZLFUIEaobNxsUcoks41mAOw/edit?ts=5c98e215#
(intent names are noted in this document in as much places much as possible)

The main game flow is also described in the flowchart in the root of this project.

For now, placeholder audio is used...

Basic functionality:
- Intents are created in Google Dialogflow (intents are utterances that the agent should reply to), with corresponding trainings-sentences.
- Each intent is configured to use a 'webhook fullfilment', meaning the code in this project should handle the intent, instead of whatever is determined in dialogflow.
- The code determines which audio to play, and to which point in the game we should jump (if needed).
- We can use 'actions' to trigger intents by code, instead of by user-input. See the default welcome intent for example. You define the name of the action in the intent you want to trigger
- To jump between different parts of the game, you can use contexts: 
For instance, if the users triggers the system by saying "A", you can define an OUTPUT-context in the intenthandler for "intent A". That means that de next utterance by the user will only trigger intents that have INPUT-context with the same name as the previously defined OUTPUT-context 
- Some yes/no questions are defined as follow-up intents within dialogflow, creating a tree of intents. This automatically gives these intents input- and output-contexts. These context make sure that the users 'yes/no' response triggers that specific intent only. Note: when multiple yes/no intents follow eachother, we sometimes have to force clear the previous intent.
- Other intents can be global, so they respond to their training-sentences in all situations, even if you're in a specific tree. (for instance, the getRoom intent always works, so you can always say 'speel kamer X' )


------------------------
To test the game with local code:
- npm install
- use ngrok to start url-forwarding: `ngrok http 8080`
- start server using the resulting ngrok url, for instance:`URL=https://c2025dcd.ngrok.io npm run start` (ALWAYS USE HTTPS)
- configure fullfilment in dialogflow (set fullfillement url to `https://d90a3f22.ngrok.io/app`)

When using 'test in Google assistant': 
- be sure to set surface to 'speaker', other interfaces expect text-output as well as audio-output, which is currently not configured in this code

When deploying to binnenkort-op.vpro.nl:
- make sure to set the fullfilment URL in dialoglow to https://binnenkort-op.vpro.nl/hotel-spieker/app

------------

Status:
De app is 'ready' for submission in the Google store, although we've submitted it twice now and it has been rejected twice, but on which grounds is a bit unclear. See https://jira.vpro.nl/browse/CCA-196 voor most recent communication.
