// STEP 05 - Container de exibição

// Ainda tudo igual ao 3 e ao 4


var _players = [
  { name: 'Jogador1', human: true },
  { name: 'Computador', human: false }
]

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

new Vue({
  el: "#board",
  data: {
    players: _players,
    elements: _elements
  }
})

