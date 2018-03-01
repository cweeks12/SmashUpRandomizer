var app = new Vue({
    el: '#app',
    data: {
        factions: [
        {
            name: 'Zombies',
            set: 'Base Set',
        },
        {
            name: 'Wizards',
            set: 'Base Set',
        },
        {
            name: 'Tricksters',
            set: 'Base Set',
        },
        {
            name: 'Robots',
            set: 'Base Set',
        },
        {
            name: 'Ninjas',
            set: 'Base Set',
        },
        {
            name: 'Pirates',
            set: 'Base Set',
        },
        {
            name: 'Aliens',
            set: 'Base Set',
        },
        {
            name: 'Dinosaurs',
            set: 'Base Set',
        },
        {
            name: 'Bear Cavalry',
            set: 'Awesome Level 9000',
        },
        {
            name: 'Ghosts',
            set: 'Awesome Level 9000',
        },
        {
            name: 'Killer Plants',
            set: 'Awesome Level 9000',
        },
        {
            name: 'Steampunks',
            set: 'Awesome Level 9000',
        },
        {
            name: 'Elder Things',
            set: 'The Obligatory Cthulu Set',
        },
        {
            name: 'Innsmouth',
            set: 'The Obligatory Cthulu Set',
        },
        {
            name: 'Cthulu Cultists',
            set: 'The Obligatory Cthulu Set',
        },
        {
            name: 'Miskatonic University',
            set: 'The Obligatory Cthulu Set',
        },
        {
            name: 'Cyborg Apes',
            set: 'Science Fiction Double Feature',
        },
        {
            name: 'Shapeshifters',
            set: 'Science Fiction Double Feature',
        },
        {
            name: 'Super Spies',
            set: 'Science Fiction Double Feature',
        },
        {
            name: 'Time Travelers',


            set: 'Science Fiction Double Feature',
        },
        {
            name: 'Giant Ants',
            set: 'Monster Smash',
        },
        {
            name: 'Mad Scientists',
            set: 'Monster Smash',
        },
        {
            name: 'Vampires',
            set: 'Monster Smash',
        },
        {
            name: 'Werewolves',
            set: 'Monster Smash',
        },
        {
            name: 'Fairies',
            set: 'Pretty Pretty Smash Up',
        },
        {
            name: 'Kitty Cats',
            set: 'Pretty Pretty Smash Up',
        },
        {
            name: 'Mythic Horses',
            set: 'Pretty Pretty Smash Up',
        },
        {
            name: 'Princesses',
            set: 'Pretty Pretty Smash Up',
        },
        {
            name: 'Dragons',
            set: 'It\'s Your Fault!',
        },
        {
            name: 'Mythic Greeks',
            set: 'It\'s Your Fault!',
        },
        {
            name: 'Sharks',
            set: 'It\'s Your Fault!',
        },
        {
            name: 'Tornadoes',
            set: 'It\'s Your Fault!',
        },
        {
            name: 'Superheroes',
            set: 'It\'s Your Fault!',
        },
        {
            name: 'Star Roamers',
            set: 'Cease and Desist',
        },
        {
            name: 'Astro Knights',
            set: 'Cease and Desist',
        },
        {
            name: 'Changerbots',
            set: 'Cease and Desist',
        },
        {
            name: 'Ignobles',
            set: 'Cease and Desist',
        },
        {
            name: 'Teddy Bears',
            set: 'What Were We Thinking?',
        },
        {
            name: 'Grandmas',
            set: 'What Were We Thinking?',
        },
        {
            name: 'Rockstars',
            set: 'What Were We Thinking?',
        },
        {
            name: 'Explorers',
            set: 'What Were We Thinking?',
        },
        {
            name: 'Kaiju',
            set: 'Big in Japan',
        },
        {
            name: 'Mystical Girls',
            set: 'Big in Japan',
        },
        {
            name: 'Mega Troopers',
            set: 'Big in Japan',
        },
        {
            name: 'Itty Critters',
            set: 'Big in Japan',
        },
        {
            name: 'Truckers',
            set: 'That \'70s Expansion',
        },
        {
            name: 'Disco Dancers',
            set: 'That \'70s Expansion',
        },
        {
            name: 'Vigilantes',
            set: 'That \'70s Expansion',
        },
        {
            name: 'Kung Fu Fighters',
            set: 'That \'70s Expansion',
        },
        {
            name: 'Geeks',
            set: 'Big Geeky Box',
        },
        {
            name: 'All-Stars',
            set: 'All-Star Event Kit',
        },
        {
            name: 'Sheep',
            set: 'Sheep Promo',
        },
        ],

        expansions: [
            'Base Set',
            'Awesome Level 9000',
            'The Obligatory Cthulu Set',
            'Science Fiction Double Feature',
            'Monster Smash',
            'Pretty Pretty Smash Up',
            'It\'s Your Fault!',
            'Cease and Desist',
            'What Were We Thinking?',
            'Big in Japan',
            'That \'70s Expansion',
            'Big Geeky Box',
            'All-Star Event Kit',
            'Sheep Promo',
        ],
        selectedFactions: [],
        selectedExpansions: [],
        playerTextEntry : "2",
        randomPlayerFactions: [],
    },
    computed: {
        players: function(){
            return parseInt(this.playerTextEntry);
        },

        availableFactions: function(){
            return this.factions.filter((faction) => {
                return this.selectedExpansions.indexOf(faction.set) > -1;
            }).sort((a,b) => {
                let aName = a.name.toUpperCase();
                let bName = b.name.toUpperCase();
                if (aName < bName){
                    return -1;
                }
                else if (bName < aName) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }

    },
    methods: {
        selectExpansion: function(event){
            if (this.selectedExpansions.indexOf(event.srcElement.value) > -1){
                //remove it
                let index = this.selectedExpansions.indexOf(event.srcElement.value);
                this.selectedExpansions.splice(index,1);
                // remove any factions from active factions too
                this.factions.forEach((faction) => {
                    if ((!(this.selectedExpansions.indexOf(faction.set) > -1)) && (this.selectedFactions.indexOf(faction.name) > -1)){
                        this.selectedFactions.splice(this.selectedFactions.indexOf(faction.name, 1));
                    }
                });
            }
            else {
                this.selectedExpansions.push(event.srcElement.value);
                this.selectedExpansions.sort();
                // add the factions that go with that expansion
                this.factions.forEach((faction) => {
                    if (faction.set === event.srcElement.value){
                        this.selectedFactions.push(faction.name);
                    }
                });
                this.selectedFactions.sort();
            }

        },
        selectFaction: function (event) {
            if (this.selectedFactions.indexOf(event.srcElement.value) > -1){
                //remove it
                let index = this.selectedFactions.indexOf(event.srcElement.value);
                this.selectedFactions.splice(index,1);
            }
            else {
                this.selectedFactions.push(event.srcElement.value);
                this.selectedFactions.sort((a,b) => {
                    let aName = a.name.toUpperCase();
                    let bName = b.name.toUpperCase();
                    if (aName < bName){
                        return -1;
                    }
                    else if (bName < aName) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
            }
        },
        randomizeFactions: function() {
            if (isNaN(this.players) || this.players < 2 || this.players > 10 ){
                alert("Please choose a valid number of players");
                return;
            }

            if (this.selectedFactions.length < this.players * 2){
                alert("You don't have enough factions selected to play with this many people");
                return;
            }

            let randomFactions = [];
            for (let i = 0; i < this.players * 2; i++){
                let randomNumber = Math.floor(Math.random() * this.selectedFactions.length);
                while (randomFactions.indexOf(randomNumber) > -1){
                    randomNumber = Math.floor(Math.random() * this.selectedFactions.length);
                }
                randomFactions.push(randomNumber);
            }

            this.randomPlayerFactions = [];// reset it
            for (let i = 0; i < randomFactions.length; i+=2){
                this.randomPlayerFactions.push({first: this.selectedFactions[randomFactions[i]], second: this.selectedFactions[randomFactions[i+1]]});
            }
            console.log(this.randomPlayerFactions);
        }
    },
    watch: {},
});
