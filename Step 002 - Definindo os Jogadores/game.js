// STEP 02 - Definindo os jogadores

/*
O confronto no jogo permite 02 jogadores. 
01 jogador humano e o outro será o próprio computador.
Sendo assim, vamos criar esses carinhas.
*/

// criando um objeto para conter as informações dos meus jogadores
// Esse objeto inicialmente terá uma propriedade para conter o nome (name)
// e outra para o tipo (human)
// por convenção coloco um underline (_) na frente das variáveis privadas.
// Este conceito será aplicado no momento oportuno.

var _player1 = { name: 'Jogador1', human: true }
var _cpu = { name: 'Computador', human: false }


// Agora vamos criar uma variável do tipo array (inicia e termina com colchetes) 
// para conter esses dois objetos
// array é um tipo de dado que permite múltiplos elementos
var _players = [ _player1, _cpu ]


// Este comando permite executar um "print" no console do navegador
console.log(_players)

/* 
  Se você rodar a aplicação neste momento e abrir o console (F12), conseguirá
  ver o array dos jogadores
*/


// Vamos definir a nossa instância Vue e criar a nossa propriedade players,
// que receberá a variável privada _players

new Vue({
    el: "#board",
    data: {
        players: _players
    }
})

/* Se você viu aparecer na tela o texto 'Jogador1' é sinal que tudo funcionou
adequadamente. NÃO SE HABITUE-SE a isso, porque o normal é sempre não funcionar
rsss
*/

/* Ao observar o Index.html, você deve ter reparado na expressão 
 {{ players[0].name }}. Como falei antes, _players foi definido como um array
 e como tal permite a inserção de vários elementos, tendo como chave um índice
 que sempre começará a partir do zero. Ou seja o elemento 1 será 0, o 2 será 1
 e dai por diante.
 
 No próximo passo vamos definir os elementos do jogo.
 */



