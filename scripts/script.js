// Tic-Tac-Toe Design Pattern Singleton
const tic_tac_toe = {

    // Atributos
    // Construção do tabuleiro com 9 posições vazias
    board: ['','','','','','','','',''],
    // Símbolos usados dos tabuleiro
    symbols: {
        options: ['X','O'], //&#10060 ou &#9899;
        turn_index: 0,
        // função que controla a troca de turno 
        change(){
            this.turn_index = ( this.turn_index === 0 ? 1:0 );
        }
    },

    
    container_element: null,
    
    gameover: false,
    
    // matriz de sequencia de vitórias
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    // Funções
    // Init recebe como parâmetro o container_element null para associar o container html
    init(container) {
        this.container_element = container;
    },

    // função que executa a jogada
    make_play(position) {
        // verificar se o jogo ja terminou (gameover) e qual a posição do elemento a ser inserido no tabuleiro
        if (this.gameover || this.board[position] !== '') return false;

        // const que recebe a troca de símbolos baseado no index do turno
        const currentSymbol = this.symbols.options[this.symbols.turn_index];

        // imprimi no tabuleiro os símbolos a cada troca de turno
        this.board[position] = currentSymbol;
        this.draw();

        // const que recebe qual foi a sequencia vencedora
        const winning_sequences_index = this.check_winning_sequences(currentSymbol);

        if (this.is_game_over()){
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
        } else {
            this.symbols.change();
        }

        return true;
    },

    // estilização do vencedor
    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    // Verifica qual sequencia foi a vencedora baseado na matriz de vitórias e exibe na tela o vencedor
    check_winning_sequences(symbol) {

        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == symbol  &&
                this.board[ this.winning_sequences[i][1] ] == symbol &&
                this.board[ this.winning_sequences[i][2] ] == symbol) {
                console.log('winning sequences INDEX:' + i);
                window.alert(`Fim de Jogo! Player "${this.board[this.winning_sequences[i][0]]}" é o vencedor!`);
                return i;
            }
        };
        return -1;
    },

    // função que verifica se o jogo terminou
    game_is_over() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    is_game_over() {
        return !this.board.includes('');
    },

    // função de inicio que preenche todo o array com um espaço vazio -> fill('')
    start() {
        this.board.fill('');
        this.draw();
        this.gameover = false;       
    },

    // função para reiniciar o jogo ao clicar no botão da interface
    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
        } else if (confirm('Você quer reiniciar o jogo?')) {
            this.start();
        }
    },

    // função que posiciona os símbolos baseado no click do tabuleiro
    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};