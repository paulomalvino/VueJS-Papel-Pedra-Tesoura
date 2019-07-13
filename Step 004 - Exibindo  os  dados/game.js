// STEP 04 - Exibindo os dados

// Nada mudou por aqui


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

