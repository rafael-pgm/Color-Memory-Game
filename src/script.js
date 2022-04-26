let order = [];
let clickedOrder = [];
let score = 0;

const points = document.getElementById('score');
let maxPoints = document.getElementById('maxScore');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const red = document.querySelector('.red');

let lighting = (slice, time) => {
    time = time * 500;
    setTimeout(() => { slice.classList.add('selected'); }, time - 300);
    setTimeout(() => { slice.classList.remove('selected') }, time - 50);
}

let randomOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    // Iterando pela sequência armazenada e iluminando os respectivos botões
    for (let sequence = 0; sequence < order.length; sequence++) {
        lighting(buttonColor(order[sequence]), sequence + 1)
    }
}

let choice = (color) => {

    clickedOrder[clickedOrder.length] = color;

    buttonColor(color).classList.add('selected');
    setTimeout(() => {
        buttonColor(color).classList.remove('selected');
        check();
    }, 250);
}

let check = () => {
    let gameContinue = true;

    if (clickedOrder.length > order.length) {
        alert('Clique no botão Start para começar uma nova partida!');
        return;
    }

    for (let sequence = 0; sequence < clickedOrder.length; sequence++) {
        if (clickedOrder[sequence] != order[sequence]) {
            gameContinue = false;
            gameOver();
            break;
        }
    }

    if (clickedOrder.length == order.length && gameContinue) {
        score += 100;
        points.innerHTML = score;
        alert(`Você acertou! Pontuação: ${score} \n\nIniciando próximo nível.`);
        randomOrder();
    }
}

let buttonColor = (color) => {
    if (color == 0) return green;
    if (color == 1) return red;
    if (color == 2) return yellow;
    if (color == 3) return blue;
}

let gameOver = () => {
    // Atualiza a pontuação máxima caso a atual a ultrapasse
    if (score > parseInt(maxPoints.textContent)) maxPoints.innerHTML = score;
    alert(`Você Perdeu! Pontuação final: ${score}! \n\nClique no botão start para reiniciar.`);
    order = [];
    clickedOrder = [];
    score = 0;
}

let newGame = () => {
    alert(`Bem-vindo Color Memory Game!`)
    score = 0;
    order = [];
    clickedOrder = [];
    points.innerHTML = 0;
    randomOrder();
}

green.onclick = () => choice(0);
red.onclick = () => choice(1);
yellow.onclick = () => choice(2);
blue.onclick = () => choice(3);