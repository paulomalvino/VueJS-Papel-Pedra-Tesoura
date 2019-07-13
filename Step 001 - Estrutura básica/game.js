// STEP 01 - Estrutura Básica

/*
Author: [Seu nome]
Description: Módulo principal para o game Papel, Pedra e Tesoura
*/

/* o operador new é uma palavra reservada do Javascript que cria
uma instância de um tipo de objeto. Neste caso, esta criando uma
instância do Vue. O objeto VUE está definido no arquivo vue.js que
incorporamos ao documento.
*/
new Vue({
    el: "#board",
    data: {
        informacao: "Prazer, sou o Vue e aqui o controle é meu!"
    }
})

/* A instância do Vue recebe um parâmetro que é um objeto {}
 Esse objeto é composto por propriedades e a medida em que avançarmos
 vamos tratar de cada um deles. Por enquanto, temos as seguintes:
    el => id do elemento HTML que você definiu como raiz
    data => são os dados disponíveis para o VUE

 Importante! - Repare que no index.html há a declaração {{informacao}},
 que resultará em uma interpolação dos dados, renderizando na tela
 a mensagem/dado que a propriedade do objeto data possuir.
 
 Mas se você está atento, precebeu que na tela não declarei {{data.informacao}}
 e sim apenas {{informacao}}. Isso porque o VUE faz um 'proxy' para facilitar
 a gente, levando o conteúdo de data para a sua raiz.

*/