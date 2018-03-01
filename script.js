var app = new Vue({
    el: '#app',
    data: {
        factionSets: 
        {
            Zombies: 'Base Set',
            Wizards: 'Base Set',
            Tricksters: 'Base Set',
            Robots: 'Base Set',
            Ninjas: 'Base Set',
            Pirates: 'Base Set',
            Aliens: 'Base Set',
            Dinosaurs: 'Base Set',
            Bear_Cavalry: 'Awesome Level 9000',
            Ghosts: 'Awesome Level 9000',
            Killer_Plants: 'Awesome Level 9000',
            Steampunks: 'Awesome Level 9000',
            Elder_Things: 'The Obligatory Cthulu Set',
            Innsmouth: 'The Obligatory Cthulu Set',
            Cthulu_Cultists: 'The Obligatory Cthulu Set',
            Miskatonic_University: 'The Obligatory Cthulu Set',
            Cyborg_Apes: 'Science Fiction Double Feature',
            Shapeshifters: 'Science Fiction Double Feature',
            Super_Spies: 'Science Fiction Double Feature',
            Time_Travelers: 'Science Fiction Double Feature',
            Giant_Ants: 'Monster Smash',
            Mad_Scientists: 'Monster Smash',
            Vampires: 'Monster Smash',
            Werewolves: 'Monster Smash',
            Fairies: 'Pretty Pretty Smash Up',
            Kitty_Cats: 'Pretty Pretty Smash Up',
            Mythic_Horses: 'Pretty Pretty Smash Up',
            Princesses: 'Pretty Pretty Smash Up',
            Dragons: 'It\'s Your Fault!',
            Mythic_Greeks: 'It\'s Your Fault!',
            Sharks: 'It\'s Your Fault!',
            Tornadoes: 'It\'s Your Fault!',
            Superheroes: 'It\'s Your Fault!',
            Star_Roamers: 'Cease and Desist',
            Astro_Knights: 'Cease and Desist',
            Changerbots: 'Cease and Desist',
            Ignobles: 'Cease and Desist',
            Teddy_Bears: 'What Were We Thinking?',
            Grandmas: 'What Were We Thinking?',
            Rockstars: 'What Were We Thinking?',
            Explorers: 'What Were We Thinking?',
            Kaiju: 'Big in Japan',
            Mystical_Girls: 'Big in Japan',
            Mega_Troopers: 'Big in Japan',
            Itty_Critters: 'Big in Japan',
            Truckers: 'That \'70s Expansion',
            Disco_Dancers: 'That \'70s Expansion',
            Vigilantes: 'That \'70s Expansion',
            Kung_Fu_Fighters: 'That \'70s Expansion',
            Geeks: 'Big Geeky Box',
            All_Stars: 'All_Star Event Kit',
            Sheep: 'Sheep Promo',
        },

        factions: [ 
            'Zombies', 'Wizards', 'Tricksters', 'Robots', 'Ninjas', 'Pirates', 'Aliens', 'Dinosaurs',
            'Bear_Cavalry', 'Ghosts', 'Killer_Plants', 'Steampunks', 'Elder_Things', 'Innsmouth', 'Cthulu_Cultists',
            'Miskatonic_University', 'Cyborg_Apes', 'Shapeshifters', 'Super_Spies', 'Time_Travelers', 'Giant_Ants',
            'Mad_Scientists', 'Vampires', 'Werewolves', 'Fairies', 'Kitty_Cats', 'Mythic_Horses', 'Princesses',
            'Dragons', 'Mythic_Greeks', 'Sharks', 'Tornadoes', 'Superheroes', 'Star_Roamers', 'Astro_Knights',
            'Changerbots', 'Ignobles', 'Teddy_Bears', 'Grandmas', 'Rockstars', 'Explorers', 'Kaiju', 'Mystical_Girls',
            'Mega_Troopers', 'Itty_Critters', 'Truckers', 'Disco_Dancers', 'Vigilantes', 'Kung_Fu_Fighters',
            'Geeks', 'All_Stars', 'Sheep',
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
                return this.selectedExpansions.indexOf(this.factionSets[faction]) > -1;
            }).sort();
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
                    if ((!(this.selectedExpansions.indexOf(this.factionSets[faction]) > -1)) && (this.selectedFactions.indexOf(faction) > -1)){
                        this.selectedFactions.splice(this.selectedFactions.indexOf(faction), 1);
                    }
                });
            }
            else {
                this.selectedExpansions.push(event.srcElement.value);
                this.selectedExpansions.sort();
                // add the factions that go with that expansion
                this.factions.forEach((faction) => {
                    if (this.factionSets[faction] === event.srcElement.value){
                        this.selectedFactions.push(faction);
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
                this.selectedFactions.sort();
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
