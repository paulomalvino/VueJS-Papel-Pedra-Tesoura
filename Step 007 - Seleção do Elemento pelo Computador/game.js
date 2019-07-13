// STEP 07 - Seleção de Elemento pelo Computador

/*
Para fazer o computador selecionar uma imagem, vamos fazer como uma roleta,
que ficará girando as imagens contínuamente até que o jogador humano
decida parar. Esse será o desafio do jogo... parar no elemento certo para a vitória.

Para isso, usaremos uma função do javascript chamada setTimeout. Essa função executa
uma outra função a cada x milésimos de segundos.

Sintaxe:
setTimeout(function, miliseconds, param1, param2,...)

Dando continuidade, iremos introduzir um novo objeto no jogo, que será responsável
por controlar o jogo. Só que desta vez não vamos utilizar uma variável privada. Vamos
criá-lo diretamente na instância Vue.

Atenção!!!
Sempre que formos nos referenciar a membros do VUE temos que usar a palavra reservada
this.


*/


var _elements = [
  {
    name: 'Pedra',
    value: 1
  },
  {
    name: 'Papel',
    value: 2
  },
  {
    name: 'Tesoura',
    value: 3
  }
];

var _players = [
  {
    name: 'Jogador1',
    human: true,
    elementSelected: _elements[0]
  },
  {
    name: 'Computador',
    human: false,
    elementSelected: _elements[0]
  }
]



new Vue({
  el: "#board",

  data: {
    players: _players,
    elements: _elements,
    /* 
    Criando o objeto game. 
    Ele terá incialmente uma propriedade para indicar se um novo round
    foi iniciado e outra para indicar a velocidade da seleção do computador.
    */
    game: {
      roundStarted: false,
      speed: 200,
    }
  },
  methods: {
    /* 
    Este método está sendo invocado tanto para o Jogador quanto para o Computador.
    Porém a verificação do tipo (se humano), impede qualquer ação para o Computador.
    Vamos alterar isso, pois queremos que quando o usuário clique sobre o elemento
    do computador, dispare o processo de seleção automática para o mesmo.
    */
    onClickExecute: function (player, element) {
      if (player.human) {
        player.elementSelected = this.nextElement(element.value);

        // quando o jogador iniciar a escolha dele, iniciamos o round
        // essa não é a maneira ideal de se fazer usando o VUE, mas vamos
        // fazer assim para depois entendermos a diferença
        if (!this.game.roundStarted) {
          this.autoSelection(this.players[1])
        }
      } 
    },
    nextElement: function (index) {
      var _index = index + 1
      var _nextIndex = (_index > 3 ? 1 : _index) - 1
      return this.elements[_nextIndex];
    },
    autoSelection: function (player) {
      // inicia o round
      this.game.roundStarted = true;

      /* this é o VUE, porém quando estivermos executando dentro da função
      setTimeout, this assumirá o seu contexto. Para contornar isso, inputamos
      o valor de this em uma variável auxiliar (self) para podermos acessar
      aos métodos do VUE. Essa é uma boa prática e muito comum quando trabalhamos
      em contextos javascripts.
      */
      var self = this;

      setTimeout(
        function (p) {
          p.elementSelected = self.nextElement(p.elementSelected.value);
          self.autoSelection(p)
        },
        this.game.speed, player)
      /* 
      Repare que para acessar o método nextElement  usamos o recurso da variável auxiliar,
      pois estamos dentro do escopo (corpo) da função setTimeout.
      Já para acessar a propriedade game.speed, que está fora, voltamos acessar usando o this.
      
      Outro ponto importante a considerar neste método é que ele é recursivo. Ou seja, ele
      chama a si mesmo, com um intervalo de tempo definido pela propriedade speed.

      O método seleciona o próximo elemento. A interface por sua vez, detecta a mudança da
      propriedade elementSelected e substiui a figura da tela pela indicada como selecionada
      no objeto. Então após aguardar um tempo, o método chama a si mesmo reiniciando
      todo processo.

      Esse processo de substiuir a figura, remover e inserir outra é custosa. Existe outra
      opção que veremos depois no processo de refatoração. 

      No próximo passo, enfim, veremos como verificar o vencedor do round.

      */
    }
  }

})

