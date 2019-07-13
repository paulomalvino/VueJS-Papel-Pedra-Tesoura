var _elements = [
    {
        name: 'Pedra',
        value: 1,
        image: 'images/pedra.png',
        style: 'stone',
        gainOf: 3,
        losesFor: 2,
    },
    {
        name: 'Papel',
        value: 2,
        image: 'images/papel.png',
        style: 'paper',
        gainOf: 1,
        losesFor: 3,
    },
    {
        name: 'Tesoura',
        value: 3,
        image: 'images/tesoura.png',
        style: 'scissors',
        gainOf: 2,
        losesFor: 1,
    }
];


var _players = [
    {
        name: 'Jogador1',
        score: 0,
        human: true,
        elementSelected: _elements[0]
    },
    {
        name: 'Computer1',
        score: 0,
        human: false,
        elementSelected: _elements[0]

    }
]

var _game = {
    name: 'Papel, Pedra e Tesoura',
    version: '2.0',
    author: 'Eduardo Cardoso dos Santos',
    running: false
};

new Vue({
    el: '#app',
    data: {
        game: _game,
        players: _players,
        elements: _elements
    },
    methods: {
        nextElement: function (index) {
            var _index = index + 1
            return this.elements[(_index > 3 ? 1 : _index) - 1];
        },

        isVisible: function (player, element) {
            return player.elementSelected.value == element.value;
        },

        executeAction: function (player) {
            if (player.human) {
                this.selectElement(player)
            }else{
                
            }

        },
        selectElement: function(player){
            debugger;
            player.elementSelected = this.nextElement(player.elementSelected.value);
            if (!this.running) {
                this.autoSelect(this.players[1])
            }
        },
        autoSelect: function (computer) {
            let self = this;
            this.running = true;
            setTimeout(function () {
                self.selectElement(computer)
                self.autoSelect(computer)
            }, 100);
        }

    }
}); 