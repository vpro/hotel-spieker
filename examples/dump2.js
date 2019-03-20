var storyData = {
    "actors" : {},
    "randoms" : {},
    "meta" : {
        "sortTitle" : "hotel spieker 1 - de kroonvink van kamer zes",
        "author" : "Elly Scheele & Daan Windhorst",
        "docID" : "199b1sojdAKYE-lMvek6va-B9jYUKtb_Km4Gx4Ne5jhk",
        "startFound" : true,
        "title" : "Hotel Spieker 1 - De kroonvink van kamer zes",
        "sortAuthor" : "elly scheele & daan windhorst"
    },
    "blocks" : [ {
        "role" : "Intro",
        "indentation" : 0,
        "children" : [ 1, 2 ],
        "rawInstruction" : "Intro",
        "id" : 0,
        "text" : [ "Welkom bij Hotel Spieker, een interactief puzzelspel van de VPRO. Dit spel kan je alleen of met meerdere personen spelen. Je speelt samen tegen het spel, dus zorg ervoor dat iedereen dit geluid - mijn stem, hoi hoi - goed kan horen. Neem de tijd om goed met elkaar te overleggen voordat jullie keuzes maken in het spel, want elke keuze heeft invloed op het spel. Daarnaast zijn er nog een aantal commando’s die je ten allen tijde mag geven in het spel en die geen invloed hebben op je score of het verloop van het spel. Die commando’s zijn ‘Pauze’, ‘Verder’, ‘Herhaal’ en ‘Help’. ‘Pauze’, ‘Verder’, ‘Herhaal’ en ‘Help’. ", "Het wordt aangeraden om tijdens het spel aantekeningen te maken op papier, een laptop of in een voice-recorder, wat jij het prettigst vindt. ", "Heb je iets om notities mee te maken?" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 0,
        "intents" : [ "nee" ],
        "indentation" : 36,
        "goto" : "Test",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"nee\"",
        "id" : 1,
        "text" : [ "Pak maar even.", "" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 0,
        "intents" : [ "ja" ],
        "indentation" : 36,
        "children" : [ 3, 4 ],
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"ja\"",
        "id" : 2,
        "text" : [ "Dan gaan we bijna beginnen. Vergeet niet: ‘Pauze’, ‘Verder’, ‘Herhaal’ en ‘Help’.", "Ben je er klaar voor?" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 2,
        "intents" : [ "nee" ],
        "indentation" : 72,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"nee\"",
        "id" : 3,
        "text" : [ "\tNou laat dan maar.", "" ],
        "numberOfTabs" : 1,
        "isEnd" : true
    }, {
        "parent" : 2,
        "intents" : [ "ja" ],
        "indentation" : 72,
        "children" : [ 5, 6, 7, 8 ],
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"ja\"",
        "id" : 4,
        "text" : [ "Ahhh, daar lig je dan. Eindelijk even gestrekt. Jij bent privédetective J.J. Roosenboom en na twee jaar non-stop detectivewerk ben je eindelijk op je zuurverdiende vakantie. Lekker alleen een weekendje weg, zonder mensen om je heen. Daarom heb je voor dit hypermoderne hotel gekozen. Bijna alles kan je in dit hotel bestellen of aansturen met je stem. Je hebt kortom niet te maken met opdringerig personeel of chagrijnige barmensen: heerlijk! Je hebt net een lange wandeling gemaakt door het bosrijke gebied om het hotel heen, maar toen het weer harder begon te sneeuwen, ben je maar naar je hotelkamer gegaan voor een middagdutje.", "En nu ontwaak je, ruw, omdat er op de deur wordt gebonsd door iemand. Vreemd, want los van de andere gasten heb je nog geen levend mens gezien in dit hotel. Je doet de deur open en een man met een natte, zweterige hand geeft je een hand.", "‘Hai hoi hallo, ik ben Henk, ik ben de conciërge van dit hotel. Of ik zeg conciërge, maar ik bedoel eigenlijk systeembeheerder. Het spijt me verschrikkelijk u te storen, maar er is net een diefstal geweest. Hier, op verdieping één van ons hotel! De politie is gebeld, maar door de sneeuw gaat het nog wel even duren voordat zij hier kunnen zijn. We hebben uw hulp hard nodig!’", "Je twijfelt: loop je met deze vreemde, gebochelde man mee?" ],
        "numberOfTabs" : 1
    }, {
        "parent" : 4,
        "intents" : [ "nee" ],
        "indentation" : 108,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"nee\"",
        "id" : 5,
        "text" : [ "Je slaat de deur dicht in het gezicht van het mannetje en gaat terug naar bed.", "\t" ],
        "numberOfTabs" : 1,
        "isEnd" : true
    }, {
        "parent" : 4,
        "intents" : [ "ja", "oké", "oke" ],
        "indentation" : 108,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"ja\" or \"oké\" or \"oke\"",
        "id" : 6,
        "text" : [ "Je denkt ‘waarom ook niet’ – je bent nu toch al wakker – en je loopt achter Henk aan door de lange gang. Langs het standbeeld zonder hoofd dat midden in de gang staat, richting de trap. Daar gaat je rust. Jullie komen langs de lounge bij de ingang waar een oudere vrouw met onwaarschijnlijk glimmend zilver haar wordt getroost door twee jongere vrouwen. Haar dochters misschien? Jullie stoppen niet. Henk neemt je nog verder mee naar beneden, naar zijn kantoor in de kelder.", "Er piept van alles in deze rare serverruimte. ", "Henk: ‘We nemen al het geluid op in de kamers. Zodat de stembesturing werkt, bedoel ik. Normaal wordt dat iedere 90 seconden gewist, maar bij melding van een misdaad wordt het noodprotocol ingesteld. ", "Dus die mevrouw Bellamy in kamer 6 roept dat haar vogel is gestolen, en het systeem gaat meteen op slot. Alle deuren dicht, tot de politie er is. Maar ja, sneeuwstorm, kan nog wel even duren.", "Ik dacht, misschien kunnen wij een begin maken. Hier hebben we van alle 30 kamers op de eerste verdieping de laatste anderhalve minuut audio, die dus niet gewist is. De 90 seconden waarin die vogel gestolen moet zijn. Is trouwens niet zomaar een vogel, hoorde ik van die vent in kamer 29. Heel dure vogel. Ik dacht al: zit ie in een gouden kooitje of zo, dat je een vogel jat. Het was een kraanvink, koningsvink? Kroonvink? Zoiets. Goed, ik kan je van elke kamer op de verdieping, even kant of oneven kant, de audio laten horen. Roep maar ‘Henk’ als een kamer wil horen, dan zet ik ‘m voor je aan. O ja. Je mag maar acht opnames luisteren, daarna worden de schijven gewist. Heel onhandig, maar dat is ons privacyprotocol. Wat dat ook moge zijn.", "Dus? Wil je ons helpen?" ],
        "numberOfTabs" : 1
    }, {
        "parent" : 4,
        "intents" : [ "ja", "oké", "oke", "jawel" ],
        "indentation" : 108,
        "goto" : "kamerkeuze",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\t\t\tIf you say \"ja\" or \"oké\" or \"oke\" or \"jawel\"",
        "id" : 7,
        "text" : [ "Top. Die mevrouw van kamer 6, Bellamy, heeft er heel veel geld voor over om haar vogel terug te krijgen. Ze had een heel goeie band… met deze vogel.", "\t" ],
        "numberOfTabs" : 3
    }, {
        "parent" : 4,
        "intents" : [ "nee" ],
        "indentation" : 108,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\t\t\tIf you say \"nee\"",
        "id" : 8,
        "text" : [ "\tNou, dan niet.", "\t\t" ],
        "numberOfTabs" : 3,
        "isEnd" : true
    }, {
        "intents" : [ "Henk" ],
        "indentation" : 0,
        "goto" : "kamerkeuze",
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Henk\"",
        "id" : 9,
        "text" : [ "" ],
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "children" : [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ],
        "id" : 10,
        "text" : [ "Welke kamer wil je horen?" ],
        "title" : "Kamerkeuze",
        "numberOfTabs" : 0,
        "catchAllChild" : 22
    }, {
        "parent" : 10,
        "intents" : [ "4", "vier" ],
        "indentation" : 36,
        "goto" : "Kamer 4",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"4\" or \"vier\"",
        "id" : 11,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "6", "zes" ],
        "indentation" : 36,
        "goto" : "Kamer 6",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"6\" or \"zes\"",
        "id" : 12,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "8", "acht" ],
        "indentation" : 36,
        "goto" : "Kamer 8",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"8\" or \"acht\"",
        "id" : 13,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "10", "tien" ],
        "indentation" : 36,
        "goto" : "Kamer 10",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"10\" or \"tien\"",
        "id" : 14,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "13", "dertien" ],
        "indentation" : 36,
        "goto" : "Kamer 13",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"13\" or \"dertien\"",
        "id" : 15,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "20", "twintig" ],
        "indentation" : 36,
        "goto" : "Kamer 20",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"20\" or \"twintig\"",
        "id" : 16,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "21", "eenentwintig" ],
        "indentation" : 36,
        "goto" : "Kamer 21",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"21\" or \"eenentwintig\"",
        "id" : 17,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "28", "achtentwintig" ],
        "indentation" : 36,
        "goto" : "Kamer 28",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"28\" or \"achtentwintig\"",
        "id" : 18,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "29", "negenentwintig" ],
        "indentation" : 36,
        "goto" : "Kamer 29",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"29\" or \"negenentwintig\"",
        "id" : 19,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "30", "dertig" ],
        "indentation" : 36,
        "goto" : "Kamer 30",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "If you say \"30\" or \"dertig\"",
        "id" : 20,
        "text" : [ "\t" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 10,
        "intents" : [ "lobby", "restaurant", "foyer", "bar", "café", "gang" ],
        "indentation" : 36,
        "goto" : "Kamerkeuze",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"lobby\" or \"restaurant\" or \"foyer\" or \"bar\" or \"café\" or \"gang\"",
        "id" : 21,
        "text" : [ "\tDaar maakt het hotel geen opnames helaas.", "\t" ],
        "numberOfTabs" : 1
    }, {
        "parent" : 10,
        "indentation" : 36,
        "goto" : "Kamerkeuze",
        "id" : 22,
        "text" : [ "\tIn die kamer zit dit weekend niemand.", "\t" ],
        "isCatchAll" : true,
        "numberOfTabs" : 1
    }, {
        "indentation" : 0,
        "children" : [ 24, 25, 26 ],
        "id" : 23,
        "text" : [ "En? Weet je al wie het gedaan heeft?" ],
        "title" : "Weet je het?",
        "numberOfTabs" : 0,
        "catchAllChild" : 26
    }, {
        "parent" : 23,
        "intents" : [ "nee", "nog niet" ],
        "indentation" : 36,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"nee\" or \"nog niet\"",
        "id" : 24,
        "text" : [ "\tOké. Roep me maar als je nog een kamer wil horen. Ik heet Henk.", "\tJe mag nog X kamers aanvragen." ],
        "numberOfTabs" : 1
    }, {
        "parent" : 23,
        "intents" : [ "ja" ],
        "indentation" : 36,
        "goto" : "Eindes",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"ja\"",
        "id" : 25,
        "text" : [ "\tHenk springt op van zijn stoel. ‘Echt?’ ", "\t" ],
        "numberOfTabs" : 1
    }, {
        "parent" : 23,
        "indentation" : 36,
        "goto" : "Weet je het?",
        "id" : 26,
        "text" : [ "\tIk snap je niet helemaal.", "\t" ],
        "isCatchAll" : true,
        "numberOfTabs" : 1
    }, {
        "indentation" : 0,
        "children" : [ 28, 29 ],
        "id" : 27,
        "text" : [ "Wil je iemand beschuldigen?" ],
        "title" : "Eindes",
        "numberOfTabs" : 0
    }, {
        "parent" : 27,
        "intents" : [ "nee" ],
        "indentation" : 72,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\t\tIf you say \"nee\"",
        "id" : 28,
        "text" : [ "\t\tDenk er nog maar even goed over na." ],
        "numberOfTabs" : 2
    }, {
        "parent" : 27,
        "intents" : [ "ja" ],
        "indentation" : 72,
        "children" : [ 30, 31 ],
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\t\tIf you say \"ja\"",
        "id" : 29,
        "text" : [ "\t\tWie denk je dat het gedaan heeft?" ],
        "numberOfTabs" : 2,
        "catchAllChild" : 31
    }, {
        "parent" : 29,
        "intents" : [ "Emma", "Emma Bellamy" ],
        "indentation" : 108,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\t\tIf you say \"Emma\" or \"Emma Bellamy\"",
        "id" : 30,
        "text" : [ "\t\tHenk: ‘O ja, joh? Haar eigen dochter? Rare Limburgers ook altijd’", "Jullie lopen de trap op, de oudere vrouw - Silvia - en haar dochter en", "schoondochter - Emma en Joan - zijn verdwenen uit de lobby, dus lopen", "door naar de eerste verdieping, naar kamer 8 en kloppen op de deur.", "Joan doet open.", "\t\tJoan: ‘Hallo? Kan ik jullie ergens mee helpen?’", "\t\tHenk: ‘Wij hebben redenen om aan te nemen dat Emma Bellamy de", "kroonvink uit kamer 6 heeft gestolen.’", "\tEmma: ‘Die kutvogel? Wat zou ik daar mee moeten? Doorzoek onze", "kamer maar, hier is geen vogel te bekennen.’", "Joan: ‘Emma? Waarom word jij ineens zo rood?’", "Je zucht diep en oppert dat jullie misschien maar even gaan zoeken naar de vogel in kamer 20 van haar broer Steve en dan zwicht Emma snel.", "Emma: ‘Oke, oke, oke! Daar staat James inderdaad. Ik kon er een goed prijsje voor krijgen bij Thierry, maar nu dus geen chocoladefontein meer op onze bruiloft, Joan! Mama vindt die kutvogel nog belangrijker dan al haar drie kinderen bij elkaar! [ze huilt een beetje]", "Joan: ‘Nou, nou, nou, Emma, je bent weer een beetje aan het overdrijven he? Het is maar een vogeltje, he? En als dat jouw moeder nou zo gelukkig maakt, dan gunnen we dat haar toch gewoon? Hee, waar is die man nou heen? Jullie waren toch net nog met z’n tweeën?’", "[Er gaat een groot alarm af]", "Systeemstem: ‘Onze systeembeheerder heeft het noodprotocol ingeschakeld. Blijft u allen waar u bent. U loopt mogelijk gevaar. Zodra wij meer weten, zullen wij u informeren. De politie is onderweg.’", "Stem van ver weg: ‘AAH! EEN LIJK!’", "Nou, die vakantie kun jij, privedetective J.J. Roosenboom nu echt wel vergeten, want als je door het raam kijkt, zie je dat het nog harder is gaan sneeuwen. Maar Silvia Bellamy, die krijgt haar vogel tenminste terug. Dank voor het spelen van Hotel Spieker en we hopen dat we ook op jou kunnen rekenen bij het oplossen van deze moord in de volgende, uitgebreidere editie van Hotel Spieker!", "\t\t\t" ],
        "numberOfTabs" : 2,
        "isEnd" : true
    }, {
        "parent" : 29,
        "indentation" : 108,
        "id" : 31,
        "text" : [ "\t\tNee, da’s fout.", "\t\t\t" ],
        "isCatchAll" : true,
        "numberOfTabs" : 3,
        "isEnd" : true
    }, {
        "role" : "Fallback",
        "indentation" : 0,
        "rawInstruction" : "Fallback",
        "id" : 32,
        "text" : [ "Sorry, ik snap je niet helemaal." ],
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 33,
        "text" : [ "Kamer vier staat op naam van Jonne en Evert Beenhakker.", "In die kamer hoor je een vrouwenstem met het systeem praten. Ze wil graag een klacht indienen. Die pubers in kamer 10 hebben haar een bitch genoemd, dat vindt ze niet oké. Het systeem belooft dat er werk van wordt gemaakt.", "Dan, na vijftig seconden, hoor je vier piepjes, en de deur die opengaat. De vrouw vraagt aan haar man waar hij was. Hij is zweterig, en rood, en een beetje nerveus, zegt ze.", "‘Ja nee, ik was bij Bob,’ zegt hij. ‘Die zit helemaal aan het eind van de gang, bij de lift, dus dat is een heel stuk lopen.’", "Zijn vrouw gelooft er niets van. Dan hoort het koppel, glashelder van de gang een oude vrouwenstem roepen: ‘James! James!’", "" ],
        "title" : "Kamer 4",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 34,
        "text" : [ "Kamer zes staat op naam van Silvia Bellamy.\r\rIn die kamer hoor je vier piepjes, een kooi die wordt weggehaald, een deur die dichtvalt.", "Dan het geluid van een toilet dat doorspoelt. Dan de WC-deur die opengaat, en iemand die geschokt ademhaalt.", "Een oude vrouwenstem zegt: ‘James? James? James waar ben je? Hallo? Systeem?’", "Dan een robotstem: ‘waar kan ik u mee helpen mevrouw Bellamy?’", "De vrouw: ‘mijn vogel – bel mijn dochter. Ze zit in de kamer hiernaast. James is gestolen. Hij is al veertien jaar bij mij en nu – hallo?’", "Dan een robotstem: ‘Wilt u melding doen van diefstal?’", "De vrouw: ‘James is gestolen! Waarom doet u niets? Iemand, hallo?’", "We horen de deur opengaan, en de vrouw de gang op sprinten: ‘James? James?’", "Dan, de robotstem weer: ‘Melding van diefstal geregistreerd. Protocol vier wordt uitgevoerd. Politie ingeschakeld. Deuren vergrendeld.’", "" ],
        "title" : "Kamer 6",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 35,
        "text" : [ "Kamer acht staat op naam van Joan Mathijssen en Emma Bellamy.", "We horen een vrouw met een lage stem praten met het systeem.", "Ze zegt: ‘kunnen we de dinerreservering voor vanavond aanpassen? Mijn zwager is vanmorgen gaan skieën met zijn vrouw en door het slechte weer kunnen ze hier vanavond niet meer komen. Dus we zijn met twee minder. De reservering staat op zijn kamer denk ik, 21.’", "Het systeem beantwoordt het verzoek positief. Dan, na vijftig seconden, horen we vier piepjes en gaat de deur open. De lage vrouwenstem zegt als grapje: ‘Emma Bellamy! Waar hebben wij uitgehangen? Zat je weer met die vent aan de bar waar je gisterenavond ook de hele avond mee zat? Worden we opeens hetero nu ik je ten huwelijk heb gevraagd?’", "Emma: ‘Nee, ik zat te blowen met de kinderen in de kamer hiernaast, nu goed. Wat een wietlucht. En met die man gisteren was puur zakelijk, dat weet je toch wel, he?’", "Joan: ‘Tuurlijk liefje, was maar een grapje. Hé, wat vind jij, moeten we je moeder wel vertellen van onze verloving als Steve er niet bij is vanavond?’", "Emma zegt tegen haar verloofde: ‘Joan, vanavond moeten we het aankondigen. Bovendien: Steve weet het al. Ik wil niet langer liegen tegen mijn moeder.’", "Dan horen ze geschreeuw op de gang. Joan: ‘Is dat je moeder?’", "" ],
        "title" : "Kamer 8",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 36,
        "text" : [ "Kamer tien staat op naam van Esmee Rocha, Marian Wijling en Pien Dirks.", "We horen twee pubermeisjes giechelen. De een doet vogelgeluiden na. De ander zegt dat die man zo’n nerd was. Die vogelman in kamer… ‘niet zeggen! Ongeluksgetal bitch!’ Weer gegiechel.", "Dan na vijftig seconden klinken er vier piepjes, en komt een derde pubermeisje binnen. ‘Pien, wat heb je daar onder je t-shirt?’ ‘Niks,’ zegt Pien. Maar daar willen de andere twee niets van weten. Ze blijven doorvragen, tot we horen dat Pien dan toch maar toont wat ze onder haar shirt heeft.", "De andere twee: \"niet! Dat kan je niet maken man! Hotel wordt fakking pissed!’", "Pien: ‘Ging per ongeluk!’", "" ],
        "title" : "Kamer 10",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 37,
        "text" : [ "Kamer dertien staat op naam van Thierry Niemann.", "In kamer dertien hoor je een man op zachte toon bellen met zijn partner. Hij zegt dat hij toch een dag later terugkomt dan beloofd. Dat hij halverwege de terugreis van de conferentie gestrand is. En dat de conferentie heel saai was, maar dat hij misschien alsnog een grote klapper kan maken. Een prachtige vrouw met wie hij gisteren aan de bar zat bood hem een bijzonder exemplaar aan. Het is prima verder, zegt hij. Het sneeuwt. Hij is niet de enige vogelkenner, dat is wel leuk. Wel de enige handelaar, verder, maar een man vertelde vanmiddag bij de lunch dat hij de hele nacht niet had geslapen, omdat hij dacht dat hij een vogel hoorde. Het bleek het piepje van de lift te zijn, hij had de kamer net naast de lift, helemaal aan het einde van de gang. Ja, ik hou ook van jou. Tot snel.", "Dan horen we geschreeuw op de gang.", "" ],
        "title" : "Kamer 13",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 38,
        "text" : [ "Kamer twintig staat op naam van Steve Bellamy en Eva Line Smulders.", "We horen vier piepjes, iemand die de kamer binnenkomt met iets groots vast, iets van metaal. Dan het geluid van een vogel. Na een seconde of dertig horen we degene die de vogel heeft geplaatst de kamer weer verlaten. Even is het stil, los van de geluiden van de vogel. Dan horen we opnieuw vier piepjes, en horen we een kinderstem die zegt ‘Huh?! Een vogel.’", "Dan geschreeuw op de gang.", "" ],
        "title" : "Kamer 20",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 39,
        "text" : [ "Kamer 21 staat op naam van Bobby en Zelda van Harkum.", "We horen vier piepjes, gevolgd door het geluid van twee kinderstemmen. Een jongensstem en een meisjesstem. De meisjesstem zegt dat het standbeeld op de gang onthoofd is, en dat ze een schatkaart heeft gevonden. Ze overhandigt hem het briefje (‘dit is geen kaart, dit is gewoon een briefje’).", "Hij leest voor wat er op het briefje staat:", "De jongen zegt tegen het meisje: kom we gaan! Ze lopen de deur uit. En tien seconden later klinkt er geschreeuw op de gang.", "" ],
        "title" : "Kamer 21",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 40,
        "text" : [ "Kamer 28 staat op naam van Gerard en Jannet van Harkum.", "In de kamer horen we twee mensen tegen elkaar schreeuwen, een mannen– en een vrouwenstem. De vrouwenstem zegt dat ze niks fout heeft gedaan, maar daar wil de mannenstem in kwestie niets van weten. Zij heeft, wat hem betreft, een MISDAAD begaan. Zij heeft de nacho’s bij de bar vanmiddag op een ander kamernummer laten zetten!", "Maar, zegt zij, de mensen in kamer 20 zijn er toch niet. Die zijn vanmorgen vertrokken op skivakantie. En weet je hoe duur dit kuthotel wel niet is?", "Dit is, schreeuwt hij terug, misdadig! MISDADIG! En dat waar onze kinderen bij zijn. Jij gaat nu naar de kinderen, Jannet, en je biecht aan hen op wat je fout hebt gedaan. Je klopt op deur 21 en je zegt: ik, jullie moeder, ik ben een misdadiger!", "Zij schreeuwt terug. Door het heen en weer-geschreeuw horen we het schreeuwen op de gang amper. ", "" ],
        "title" : "Kamer 28",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 41,
        "text" : [ "Kamer 29 staat op naam van Bob Romeijn.", "In de kamer horen we vogelgeluiden. Tot na ongeveer dertig seconden de robotstem zegt ‘wil je nog een uur meditatiegeluiden horen voor maar 6,95?’", "Bob begrijpt niet helemaal dat het een robotstem is en praat terug. Ja, hij is eenzaam. Tuurlijk is hij eenzaam. Hij snapt niet waarom zo’n vogelhandelaar als die van kamer dertien een hele avond met zo’n lekker wijf aan de bar kan zitten. Als er iets is wat hij als vogelkenner wel weet is dat vogels niet sexy zijn. Ja, hij heeft wel eens het idee dat hij faalt. Als hij dan zo’n gezin ziet, zoals die kinderen vier deuren verderop. Die kinderen hebben hun eigen kamer! Hun eigen kamer! Toen hij hun leeftijd was, was hij nog nooit in een hotel geweest. Nou ja, het gaat zoals het gaat.", "Op de gang klinkt, zachtjes, geschreeuw.", "" ],
        "title" : "Kamer 29",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "goto" : "Weet je het?",
        "id" : 42,
        "text" : [ "Kamer dertig staat op naam van Puk Bellamy.", "We horen het geluid van twee mensen die klaarkomen. Dan iemand die zijn broek aantrekt, terwijl hij (dezelfde stem als in kamer 4) zegt: ‘ging jij niet trouwen?’", "‘Ik? Nooit,’ zegt de vrouwenstem. ‘Mijn zus gaat trouwen. Tenminste, dat moet ik nog maar zien, want ze hebben helemaal geen geld om een bruiloft van te betalen. Zul je zien dat mijn moeder die kutvogel weer mee wil nemen als haar plus één. Deed ze op de bruiloft van Steve ook – jij gaat weer terug naar kamer vier?’", "Hij zegt: ‘misschien kunnen we elkaar vanavond nog even zien? Als m’n vrouw d’r yoga doet?’", "‘Joe,’ roept zij, en we horen haar een sigaret aansteken. De robotstem waarschuwt dat ze hier niet mag roken. Puk vraagt aan het systeem om een raam open te doen, en we horen zacht geruzie van de kamer hiernaast. Niet te verstaan. ", "‘Doe het raam maar weer dicht,’ zegt Puk. En op de gang hoort ze zachtjes haar moeder gillen.", "" ],
        "title" : "Kamer 30",
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "id" : 43,
        "text" : [ "Henk snuift. ‘Helaas, dit was het. Nu zijn de schijven gewist. Acht kamers. Ik hoop zo dat je weet wie het is.’", "[[Eindes]]" ],
        "title" : "Teller op",
        "numberOfTabs" : 0
    }, {
        "intents" : [ "Help" ],
        "indentation" : 0,
        "children" : [ 45, 46 ],
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Help\"",
        "id" : 44,
        "text" : [ "Ben je op zoek naar een hint?" ],
        "numberOfTabs" : 0
    }, {
        "parent" : 44,
        "intents" : [ "ja" ],
        "indentation" : 36,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"ja\"",
        "id" : 45,
        "text" : [ "De gang in het hotel heeft een even en een oneven kant.", "Alle kamers beslaan dezelfde negentig seconden. Dus als je iemand in één kamer hoort, kan die persoon niet op hetzelfde moment ergens anders zijn.", "Hou een lijst bij van elke kamer die genoemd wordt. Soms vind je hints in onverwachte kamers.", "Een goede detective bezoekt altijd het plaats delict.", "Wie zou er een motief hebben om een dure vogel te stelen? En als je zo’n vogel hebt gestolen, wat doe je er vervolgens mee?" ],
        "numberOfTabs" : 1
    }, {
        "parent" : 44,
        "intents" : [ "nee" ],
        "indentation" : 36,
        "children" : [ 47, 48 ],
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"nee\"",
        "id" : 46,
        "text" : [ "In Hotel Spieker onderzoek je de verdwijning van de kroonvink van kamer zes door te luisteren naar de 90 seconden geluid in elke kamer op de eerste verdieping. Je kan de verschillende kamers aanroepen door te vragen naar de conciërge. Die heet Henk. Je mag maximaal 8 kamers luisteren. Als je denkt dat je weet wie het heeft gedaan, zeg je ‘Henk, ik weet wie het gedaan heeft.\"", "Je kan kamers altijd opnieuw beluisteren, door ‘herhaal’ te zeggen, of door nog een keer naar de kamer te vragen. Als je de intro nog eens wil horen zeg je \"herhaal intro.’", "Geeft dat antwoord op je vraag?" ],
        "numberOfTabs" : 1
    }, {
        "parent" : 46,
        "intents" : [ "yes" ],
        "indentation" : 72,
        "goto" : "kamerkeuze",
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\tIf you say \"yes\"",
        "id" : 47,
        "text" : [ "\tTop.", "\t" ],
        "numberOfTabs" : 1
    }, {
        "parent" : 46,
        "intents" : [ "no" ],
        "indentation" : 72,
        "isGlobal" : false,
        "variableForIntents" : false,
        "rawInstruction" : "\t\tIf you say \"no\"",
        "id" : 48,
        "text" : [ "Heb je een andere vraag, of loop je tegen technische problemen aan? Neem dan contact op met het VPRO Medialab op medialab@vpro.nl. " ],
        "numberOfTabs" : 2
    }, {
        "intents" : [ "Herhaal intro", "Herhaal begin" ],
        "indentation" : 0,
        "goto" : "Test",
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Herhaal intro\" or \"Herhaal begin\"",
        "id" : 49,
        "text" : [ "" ],
        "numberOfTabs" : 0
    }, {
        "intents" : [ "Henk, ik weet wie het gedaan heeft", "Henk, ik weet wie het heeft gedaan", "Henk, ik weet wie het is", "Henk, ik weet wie de vogel heeft" ],
        "indentation" : 0,
        "goto" : "Weet je het?",
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Henk, ik weet wie het gedaan heeft\" or \"Henk, ik weet wie het heeft gedaan\" or \"Henk, ik weet wie het is\" or \"Henk, ik weet wie de vogel heeft\"",
        "id" : 50,
        "text" : [ "" ],
        "numberOfTabs" : 0
    }, {
        "intents" : [ "Hoeveel kamers zijn er" ],
        "indentation" : 0,
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Hoeveel kamers zijn er?\"",
        "id" : 51,
        "text" : [ "Er zijn op deze verdieping dertig kamers en er is een even en een oneven kant." ],
        "numberOfTabs" : 0
    }, {
        "intents" : [ "Wat is de plattegrond", "Wat is de kamerverdeling", "waar zitten de kamers" ],
        "indentation" : 0,
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Wat is de plattegrond?\" or \"Wat is de kamerverdeling?\" or \"waar zitten de kamers?\"",
        "id" : 52,
        "text" : [ "Daar kan ik je helaas niet mee helpen. Er zijn op deze verdieping dertig kamers en er is een even en een oneven kant." ],
        "numberOfTabs" : 0
    }, {
        "intents" : [ "Uit welke kamer is de vogel gestolen", "waar is de vogel gestolen" ],
        "indentation" : 0,
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Uit welke kamer is de vogel gestolen?\" or \"waar is de vogel gestolen?\"",
        "id" : 53,
        "text" : [ "De vogel is gestolen uit kamer zes, die staat op naam van Silvia Bellamy." ],
        "numberOfTabs" : 0
    }, {
        "intents" : [ "Is er een lijst met gasten", "waar zit welke gast" ],
        "indentation" : 0,
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Is er een lijst met gasten?\" or \"waar zit welke gast?\"",
        "id" : 54,
        "text" : [ "Om privacyredenen kunnen we je helaas niet onze hele gastenlijst geven." ],
        "numberOfTabs" : 0
    }, {
        "intents" : [ "Wat moeten we met die codes", "waar zijn de codes voor" ],
        "indentation" : 0,
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Wat moeten we met die codes?\" or \"waar zijn de codes voor?\" ",
        "id" : 55,
        "text" : [ "Je hebt geen codes nodig om de kamers te beluisteren. Alleen om de kamers te betreden, maar daar heb je toch geen toestemming voor." ],
        "numberOfTabs" : 0
    }, {
        "intents" : [ "Wie is James" ],
        "indentation" : 0,
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"Wie is James?\"",
        "id" : 56,
        "text" : [ "Ik denk dat mevrouw Bellamy in kamer zes daar meer over weet." ],
        "numberOfTabs" : 0
    }, {
        "intents" : [ "waar is de vogel" ],
        "indentation" : 0,
        "isGlobal" : true,
        "variableForIntents" : false,
        "rawInstruction" : "Anytime you say \"waar is de vogel?\"",
        "id" : 57,
        "text" : [ "Denk je dat ik je zo maar ga vertellen waar de vogel is? Dat is het hele spel, flapdrol." ],
        "numberOfTabs" : 0
    }, {
        "indentation" : 0,
        "id" : 58,
        "text" : [ "Hier moeten we iets voor bedenken" ],
        "title" : "Test",
        "numberOfTabs" : 0
    } ]
};
var functions = require( "firebase-functions" );
const DialogflowApp = require( "actions-on-google" ).DialogflowApp;
exports.dialogflowFirebaseFulfillment = functions.https.onRequest( function ( t, e ) {
    console.log( "begin function" );
    var r = new DialogflowApp( { request : t, response : e } ), a = r.getRawInput(),
        o = [ "yes", "yeah", "sure", "okay" ], n = [ "no", "nope", "never", "rather not", "don't think so" ];
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
    return !!(t.data && t.data.storyState && t.data.storyState.storyStarted) && !hasStoryEnded( t )
}

function hasStoryEnded ( t ) {
    if ( t && t.data && t.data.storyState && t.data.storyState.history ) {
        for ( var e = t.data.storyState.history, r = 0; r < e.length; r++ ) {
            if ( e[ r ].isEnd ) {
                return !0;
            }
        }
    }
    return !1
}

function startStory ( t, e, r, a, o ) {
    finishedCallback = r, resetState( t ), a || (a = ""), e.randoms && parseRandoms( t, e.randoms ), t.data.storyState.story = e, t.data.storyState.storyStarted = !0, t.data.storyState.isPreview = o, playBlock( t, getBlockByAttribute( t, getCurStory( t ), "role", "intro" ), a )
}

function parseRandoms ( t, e ) {
    var r = Object.keys( e ), a = tracery.createGrammar( e );
    for ( var o of(t.data.pickedRandoms = {}, r) ) {
        t.data.pickedRandoms[ o ] = a.flatten( "#" + o + "#" )
    }
}

function tryAdvanceStory ( t, e, r, a ) {
    if ( t.data.lastUserMessage = e, r && (finishedCallback = r), e.toLowerCase().indexOf( "reset data" ) > -1 ) {
        return resetState( t ), respond( t, "resetting data" );
    }
    advanceStory( t, e, a, r )
}

function endStory ( t ) {
    isStoryPlaying( t ) && resetState( t )
}

function advanceStory ( t, e, r, a, o, n ) {
    t.data.storyState.storyStarted = !0;
    var s = t.data.storyState.currentBlock;
    if ( !s.children || 0 == s.children.length ) {
        for ( var i = t.data.storyState.history.length - 1; i >= 0; i-- ) {
            if ( t.data.storyState.history[ i ].children && t.data.storyState.history[ i ].children.length > 0 ) {
                s = t.data.storyState.history[ i ];
                break
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
    return d ? playBlock( t, d ) : void 0
}

function getGlobalBlocksWithIntent ( t, e, r, a, o ) {
    for ( var n = [], s = 0; s < e.length; s++ ) {
        e[ s ].isGlobal && checkIfBlockHasIntent( t, e[ s ], a, !0 ) && n.push( e[ s ] );
    }
    return n
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
    return s
}

function checkIfBlockHasIntent ( t, e, r, a ) {
    if ( "intents" in e ) {
        var o = t.data[ e.variableForIntents ] || r;
        if ( a ) {
            for ( var n = 0; n < e.intents.length; n++ ) {
                if ( o.replace( /['"‘’“”]/g, "" ).toLowerCase().indexOf( e.intents[ n ].replace( /['"‘’“”]/g, "" ).toLowerCase() ) > -1 ) {
                    return !0
                }
            }
        }
    }
    return !1
}

function getBlockContent ( t, e, r ) {
    if ( e.inputName && (t.data[ e.inputName ] = t.getRawInput()), r || (r = ""), !e.text ) {
        if ( !r && !e.goto ) {
            if ( e.isInput ) {
                var a = "";
                return t.data.lastUserMessage && (a = t.data.lastUserMessage), tryAdvanceStory( t, a, null, !0 )
            }
            return !1
        }
        e.text = [ "" ]
    }
    var o = r + e.text.join( " " ), n = o.match( /(#[a-zA-Z]+#)/g ), s = o.match( /(\^[a-zA-Z0-9]+\^)/g );
    if ( n ) {
        for ( var i of n ) {
            var l = i.replace( /#/g, "" ), y = t.data.pickedRandoms[ l ];
            o = o.replace( i, y )
        }
    }
    if ( s ) {
        for ( var d of s ) {
            var c = d.replace( /\^/g, "" ), u = t.data[ c ];
            o = o.replace( d, u )
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
    return e.isEnd && (f = !0), { text : o, isEnd : f, block : e }
}

function playBlock ( t, e, r ) {
    var a = getBlockContent( t, e, r );
    if ( !a ) {
        return !1;
    }
    if ( a.isEnd ) {
        var o = '<break time="2s"/>';
        t.data.storyState.isPreview ? o += "That's the end of your story. You can restart it, or play another one of your stories." : o += "Want to play this story again?", a.text += o
    }
    t.data.storyState.currentBlock = a.block, t.data.storyState.history.push( t.data.storyState.currentBlock ), respond( t, a.text, a.isEnd )
}

function respond ( t, e, r ) {
    finishedCallback( "<speak>" + e + "</speak>", t, r )
}

function getCurStory ( t ) {
    return t.data.storyState.story.blocks
}

function getBlockByAttribute ( t, e, r, a ) {
    var o;
    isString( a ) && (a = a.toLowerCase());
    for ( var n = 0; n < e.length; n++ ) {
        if ( r in e[ n ] && (isString( o = e[ n ][ r ] ) && (o = o.toLowerCase()), o == a) ) {
            return e[ n ];
        }
    }
    return !1
}

function isString ( t ) {
    return "string" == typeof t || t instanceof String
}

function resetState ( t ) {
    t.data.storyState || (t.data.storyState = {}), t.data.storyState.history = [], t.data.storyState.storyStarted = !1, t.data.storyState.currentBlock = -1
}

module.exports.isStoryPlaying = isStoryPlaying, module.exports.startStory = startStory, module.exports.tryAdvanceStory = tryAdvanceStory, module.exports.endStory = endStory, module.exports.setApp = setApp, module.exports.hasStoryEnded = hasStoryEnded;