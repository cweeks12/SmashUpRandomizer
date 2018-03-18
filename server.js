const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let expansions = {
    'Base Set': {
        selected: false,
        factions: [
        {name: "Zombies", selected: false},
        {name: "Wizards", selected: false},
        {name: "Tricksters", selected: false},
        {name: "Robots", selected: false},
        {name: "Ninjas", selected: false},
        {name: "Pirates", selected: false},
        {name: "Aliens", selected: false},
        {name: "Dinosaurs", selected: false},
        ]
    },
    'Awesome Level 9000': {
        selected: false,
        factions: [
        {name:     "Bear_Cavalry", selected: false},
        {name: "Ghosts", selected: false},
        {name: "Killer_Plants", selected: false},
        {name: "Steampunks", selected: false},
        ]
    },
    'The Obligatory Cthulu Set': {
        selected: false,
        factions: [
        {name:     "Elder_Things", selected: false},
        {name: "Innsmouth", selected: false},
        {name: "Cthulu_Cultists", selected: false},
        {name: "Miskatonic_University", selected: false},
        ]
    },
    'Science Fiction Double Feature': {
        selected: false,
        factions: [
        {name:     "Cyborg_Apes", selected: false},
        {name: "Shapeshifters", selected: false},
        {name: "Super_Spies", selected: false},
        {name: "Time_Travelers", selected: false},
        ]
    },
    'Monster Smash': {
        selected: false,
        factions: [
        {name:     "Giant_Ants", selected: false},
        {name: "Mad_Scientists", selected: false},
        {name: "Vampires", selected: false},
        {name: "Werewolves", selected: false},
        ]
    },
    'Pretty Pretty Smash Up': {
        selected: false,
        factions: [
        {name:     "Fairies", selected: false},
        {name: "Kitty_Cats", selected: false},
        {name: "Mythic_Horses", selected: false},
        {name: "Princesses", selected: false},
        ]
    },
    'It\'s Your Fault!': {
        selected: false,
        factions: [
        {name:     "Dragons", selected: false},
        {name: "Mythic_Greeks", selected: false},
        {name: "Sharks", selected: false},
        {name: "Tornadoes", selected: false},
        {name: "Superheroes", selected: false},
        ]
    },
    'Cease and Desist': {
        selected: false,
        factions: [
        {name:     "Star_Roamers", selected: false},
        {name: "Astro_Knights", selected: false},
        {name: "Changerbots", selected: false},
        {name: "Ignobles", selected: false},
        ]
    },
    'What Were We Thinking?': {
        selected: false,
        factions: [
        {name: "Teddy_Bears", selected: false},
        {name: "Grandmas", selected: false},
        {name: "Rockstars", selected: false},
        {name: "Explorers", selected: false},
        ]
    },
    'Big in Japan': {
        selected: false,
        factions: [
        {name:     "Kaiju", selected: false},
        {name: "Mystical_Girls", selected: false},
        {name: "Mega_Troopers", selected: false},
        {name: "Itty_Critters", selected: false},
        ]
    },
    'That \'70s Expansion': {
        selected: false,
        factions: [
        {name:     "Truckers", selected: false},
        {name: "Disco_Dancers", selected: false},
        {name: "Vigilantes", selected: false},
        {name: "Kung_Fu_Fighters", selected: false},
        ]
    },
    'Big Geeky Box': {
        selected: false,
        factions: [
        {name: "Geeks", selected: false},
        ]
    },
    'All Star Event Kit': {
        selected: false,
        factions: [
        {name:  "All_Stars", selected: false},
        ]
    },

    'Sheep Promo': {
        selected: false,
        factions: [
        {name:  "Sheep", selected: false},
        ]
    },
};

let selectedExpansions = [];
let selectedFactions = [];
let latestRandomDraws = [];

app.get('/api/expansions', (req, res) => {
    let expansionsList = [];
    for (let key in expansions){
        expansionsList.push({name: key, selected: expansions[key].selected});
    }
    res.send(expansionsList);
});

app.get('/api/factions', (req, res) => {
    let factions = [];
    for (let key in expansions){
        expansions[key].factions.forEach(element => {
            factions.push(element);
        });
    }
    res.send(factions.sort());
});

app.get('/api/factions/selected', (req, res) => {
    let factions = [];
    for (let key in expansions){
        if (expansions[key].selected){
            expansions[key].factions.forEach(element => {
                factions.push(element);
            });
        }
    }
    res.send(factions.sort((a, b) => {
        if (a.name < b.name){
            return -1;
        }
        else if (a.name > b.name){
            return 1;
        }
        return 0;
    }));
});

app.get('/api/factions/random/:players', (req, res) => {
    players = req.params.players;
    let factions = [];
    for (let key in expansions){
        if (expansions[key].selected){
            expansions[key].factions.forEach(element => {
                if (element.selected){
                    factions.push(element.name);
                }
            });
        }
    }

    let randomFactions = [];
    for (let i = 0; i < players * 2; i++){
        let randomNumber = Math.floor(Math.random() * factions.length);
        while (randomFactions.indexOf(randomNumber) > -1){
            randomNumber = Math.floor(Math.random() * factions.length);
        }
        randomFactions.push(randomNumber);
    }

    randomPlayerFactions = [];// reset it
    for (let i = 0; i < randomFactions.length; i+=2){
        // This nasty regex chain is to singularize any first factions. I think I'll write an API that does this some day.
        randomPlayerFactions.push(
                {first: factions[randomFactions[i]]      
                    .replace(/_/g,' ').replace(/ves$/, 'f').replace(/ies$/, 'y')
                        .replace(/sses$/, 'sss').replace(/o(e)?s$/,'o').replace(/s$/, '').replace(/^Zomby$/, 'Zombie') ,
                    second: factions[randomFactions[i+1]].replace(/_/g,' ')});
    }
    latestRandomDraws = randomPlayerFactions;
    res.send(randomPlayerFactions);
});

app.get('/api/factions/random/latest', (req, res) =>{
    res.send(latestRandomDraws);
});

app.put('/api/expansions', (req, res) => {
    let expansion = req.body.expansion;
    expansions[expansion].selected = !expansions[expansion].selected;
    if (!expansions[expansion].selected){
        expansions[expansion].factions.forEach( element => {
            element.selected = false;
        });
    }
    res.send(expansions[expansion]);
});

app.put('/api/factions', (req, res) => {
    let faction = req.body.faction;
    for (let key in expansions){
        expansions[key].factions.forEach(element => {
            if (element.name === faction){
                element.selected = !element.selected;
                res.send(expansions[key].factions[faction]);
                return;
            }
        });
    }

});

app.listen(3001, () => console.log('Server listening on port 3001!'))
