// STEP 09 - Resultado do round
// Inalterado (só retirado os comentários)

var _elements = [
  {
    name: 'Pedra',
    value: 1,
    elementWins: 3,  // pedra ganha de tesoura
    elementLoses: 2  // pedra perde para papel

  },
  {
    name: 'Papel',
    value: 2,
    elementWins: 1, // papel ganha de pedra
    elementLoses: 3 // papel perde para tesoura
  },
  {
    name: 'Tesoura',
    value: 3,
    elementWins: 2, // tesoura ganha de papel
    elementLoses: 1 // tesoura perde para pedra
  }
];

var _players = [
  {
    id: 1,
    name: 'Jogador1',
    human: true,
    elementSelected: _elements[0],
    score: 0
  },
  {
    id: 2,
    name: 'Computador',
    human: false,
    elementSelected: _elements[0],
    score: 0
  }
]

new Vue({
  el: "#board",

  data: {
    players: _players,
    elements: _elements,
    game: {
      roundStarted: false,
      speed: 200,
      tokenTime: null,
      message: null
    }
  },
  methods: {
    onClickExecute: function (player, element) {
      if (player.human) {
        player.elementSelected = this.nextElement(element.value);

        if (!this.game.roundStarted) {
          this.autoSelection(this.players[1])
        }
      } else {
        if (this.game.roundStarted) {
          this.reset()

          var player = this.players[0]
          var computer = this.players[1]

          var winner = this.checkWinner(player, computer)

          this.updateScore(winner)

          this.showMessages(winner, player, computer)
          console.log(this.game.message)
        }
      }
    },
    nextElement: function (index) {
      var _index = index + 1
      var _nextIndex = (_index > 3 ? 1 : _index) - 1
      return this.elements[_nextIndex];
    },
    autoSelection: function (player) {
      this.game.roundStarted = true;

      var self = this;

      this.game.tokenTime = setTimeout(
        function (p) {
          p.elementSelected = self.nextElement(p.elementSelected.value);
          self.autoSelection(p)
        },
        this.game.speed, player)
    },
    reset: function () {
      clearTimeout(this.game.tokenTime)

      this.game.roundStarted = false
    },
    hasWinner: function (player, computer) {
      return player.elementSelected.elementWins == computer.elementSelected.value ? player : null
    },
    hasLoser: function (player, computer) {
      return player.elementSelected.elementLoses == computer.elementSelected.value ? computer : null
    },
    checkWinner: function (player, computer) {
      return this.hasWinner(player, computer) || this.hasLoser(player, computer)

    },
    updateScore: function (pWinner) {
      if (pWinner != null) {
        pWinner.score++
      }
    },
    showMessages: function (pWinner, player, computer) {
      var message = '<b>Empate</b>!';

      if (pWinner != null) {
        message = 'Vitória do <b>'
          + pWinner.name
          + '</b>! <br/>'
          + player.elementSelected.name
          + (pWinner.id == player.id ? ' ganha de ' : ' perde para ')
          + computer.elementSelected.name + ' '
      }

      this.game.message = message
        + '<strong>('
        + player.score
        + ' x '
        + computer.score
        + ')</strong>'
    }
  }

})

