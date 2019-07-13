// STEP 06 - Container de exibição

/* Para criar essa nova propriedade, observe que foi necessário alterar
a ordem de criação dos arrays _players e _elements, pelo simples fato que
faço referência ao array _elements dentro de _players. E para tal, ele tem
que já estar definido.

Precedência em Javascript é importante (mas há exceções).

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

// Criando a propriedade que irá indicar qual elemento está selecionado
// Por default estou indicando o elemento 0, que é Pedra já que ele é o 
// primeiro
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


/*
Além das propriedade "el" e "data" o VUE tem também a propriedade
"methods". Nela vamos declarar os métodos (funções) que queremos utilizar.

Os métodos serão funções anônimas que executam algum procedimento e podem ou não
retornarem algum valor. Segue abaixo a sintaxe de uma função anônima:

// a instrução 'return' é que identifica se será devolvido um valor ou não
objeto.nomeDapropriedade : function(param1, param2){
    return param1 + param2;
}

*/
new Vue({
  el: "#board",

  data: {
    players: _players,
    elements: _elements
  },
  methods: {
    // Este método irá receber como parâmetro o player e o elemento selecionado
    onClickExecute: function (player, element) {
      // garante que a seleção somente ocorrerá para o player humano
      // Experimente sem essa condição e verá que ambas os players serão afetados
      if (player.human) {
        player.elementSelected = this.nextElement(element.value);
      }
    },

    // Verificará os limites do array e devolverá o próximo elemento
    // Se o indice passado for maior que 3 ele retornará o objeto
    nextElement: function (index) {
      var _index = index + 1
      var _nextIndex = (_index > 3 ? 1 : _index) - 1
      return this.elements[_nextIndex];
    }
  }

})

