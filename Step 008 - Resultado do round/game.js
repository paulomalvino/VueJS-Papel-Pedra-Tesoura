// STEP 08 - Resultado do round

/*
Depois da seleção do Jogador, o Computador deve selecionar a sua opção.
Isso irá acontecer quando ocorrer um clique sobre uma das figuras do 
computador que estão sendo monstradas sequencialmente.

Em seguida, deve ser verificado qual o elemento ganhou, informando
aos jogadores e contabilizando o score.

*/


var _elements = [
  {
    name: 'Pedra',
    value: 1,
    // criaremos mais duas propriedades para indicar de qual elemento
    // este elemento ganha e para qual ele perde
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
    // criaremos uma propriedade de nome 'score' com valor inicial 0
    // para amarzenamos a pontuação dos jogadores
    score: 0
  },
  {
    id: 2,
    name: 'Computador',
    human: false,
    elementSelected: _elements[0],
    // criaremos uma propriedade de nome 'score' com valor inicial 0
    // para amarzenamos a pontuação dos jogadores
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
      // inciaremos criando uma nova propriedade chamada tokenTime com o valor nulo
      tokenTime: null,
      // nova propriedade para mensagens
      message: null
    }
  },
  methods: {
    /* 
      Para parar a sequência de imagens e realizar a seleção
    */
    onClickExecute: function (player, element) {
      if (player.human) {
        player.elementSelected = this.nextElement(element.value);

        if (!this.game.roundStarted) {
          this.autoSelection(this.players[1])
        }
      } else { // adicionaremos uma condição para quando o click ocorrer em um player não humano
        if (this.game.roundStarted) { // e se o round já tiver sido iniciado (ou seja a auto seleção está ocorrendo)

          // forçar a parada da função recursiva autoSelection e informar que o round terminou
          this.reset()

          var player = this.players[0]
          var computer = this.players[1]

          // checa o vencedor 
          var winner = this.checkWinner(player, computer)

          // atualiza o score
          this.updateScore(winner)

          // formata mensagen
          this.showMessages(winner, player, computer)

          // exibe a mensagem no log
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

      // armazenaremos o token retornado na propriedade que criamos recentemente
      // isso permitirá a função clearTimeout funcionar corretamente
      this.game.tokenTime = setTimeout(
        function (p) {
          p.elementSelected = self.nextElement(p.elementSelected.value);
          self.autoSelection(p)
        },
        this.game.speed, player)

    },
    reset: function () {
      // para isso temos que usar a função clearTimeout. Essa função faz uso do token
      // gerado pelo setTimeout de maneira que ela possa identificá-lo.
      clearTimeout(this.game.tokenTime)

      // indicamos que o round terminou
      this.game.roundStarted = false
    },
    // verifica se o elemento do player GANHA o elemento selecionado pelo computador
    // caso negativo, retorna nulo
    // caso positivo retorna o objeto PLAYER
    hasWinner: function (player, computer) {
      return player.elementSelected.elementWins == computer.elementSelected.value ? player : null
    },
    // verifica se o elemento do player PERDE o elemento selecionado pelo computador
    // caso negativo, retorna nulo
    // caso positivo retorna o objeto COMPUTER
    hasLoser: function (player, computer) {
      return player.elementSelected.elementLoses == computer.elementSelected.value ? computer : null
    },
    // avalia se a primeira função teve algum retorno diferente de nulo
    // caso não, avalia a segunda
    checkWinner: function (player, computer) {
      return this.hasWinner(player, computer) || this.hasLoser(player, computer)

    },
    // Se foi retornado algum objeto (PLAYER ou COMPUTER), acresce o seu respectivo score
    updateScore: function (pWinner) {
      if (pWinner != null) {
        pWinner.score++
      }
    },
    // concatena mensagem informativa e armazena em propriedade do objeto game
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

