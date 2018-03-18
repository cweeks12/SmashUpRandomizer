var app = new Vue({
    el: '#app',
    data: {
        selectedExpansions: [],
        playerTextEntry : "2",
        randomPlayerFactions: [],
        expansions: [],
        factions: [],
    },

    created: function() {
        this.getExpansions();
        this.getFactions();
        this.getLatest();
    },
    computed: {
        players: function(){
            return parseInt(this.playerTextEntry);
        },
        selectedFactions: function(){
            let count = 0;
            this.factions.forEach( element => {
                if (element.selected){
                    count++;
                }
            });
            return count;
        }
    },
    methods: {
        selectExpansion: function(expansionName){
            axios.put("/api/expansions",  {expansion: expansionName }).then(response => {
                this.getExpansions();
                this.getFactions();
            });
        },
        selectFaction: function (factionName) {
            axios.put("/api/factions",  {faction: factionName}).then(response => {
                this.getExpansions();
                this.getFactions();
            });
        },

        randomizeFactions: function() {
            if (isNaN(this.players) || this.players < 1){
                alert("Please choose a valid number of players");
                return;
            }

            axios.get('/api/factions/random/' + this.players).then(response => {
                this.randomPlayerFactions = response.data;
            });

        },

        getExpansions: function(){
            axios.get("/api/expansions").then(response => {
                this.expansions = response.data;});
        },
        getFactions: function(){
            axios.get("/api/factions/selected").then(response => {
                this.factions = response.data;});
        },
        getLatest: function() {
            axios.get('/api/factions/random/latest').then(response => {
                this.randomPlayerFactions = response.data;
            });
        }
    },
    watch: {},
});
