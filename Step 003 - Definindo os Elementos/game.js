// STEP 03 - Definindo os elementos do jogo

/*
O jogo tem 3 elementos: "Pedra, Papel e Tesoura".
Cada qual com sua força e característica visual.
Assim como fizemos com os jogadores, vamos criar um array de objetos
para defini-los também.

Porém antes, vamos refatorar o código anterior para que ele fique menos verboso.
Ou seja, onde antes tínhamos:

var _player1 = { name: 'Jogador1', human: true }
var _cpu = { name: 'Computador', human: false }
var _players = [ _player1, _cpu ]

Vamos alterar para:
*/

// é exatamente o mesmo código que o anterior, só sem as variáveis privadas _player1 e _cpu
// Mas claro, não ?! Você pode continuar trabalhando da maneira anterior. Isso realmente é uma
// questão de gosto e organização. O importante é que entenda.
var _players = [
  { name: 'Jogador1', human: true },
  { name: 'Computador', human: false }
]

// Mais uma vez vamos criar uma variável array e acrescentar 03 objetos a ela, com as 
// propriedades "name" e "value"
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

// Vamos colocar a variável privada "_elements" em data na propriedade "elements"
new Vue({
  el: "#board",
  data: {
    players: _players,
    elements: _elements
  }
})

/* 
  Se o texto "Pedra 1" estiver visível para você, as coisas AINDA andam bem.
  Troque o indice para ver os demais elementos.

*/

