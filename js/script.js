let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

let score = 0;

let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Define o intervalo do movimento
let jogo = setInterval(iniciarJogo, 150);

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida(){
    context.fillStyle = "rgb(155, 18, 18)";    
    context.fillRect(comida.x, comida.y, box, box)
}

//Identifica a açao de mudar de direcão solicitada pelo jogador
document.addEventListener("keydown", update);

//Se acionadas as teclas de direçao a cobrinha deverá movimentar
function update(event){

    //Verifica se não foi solicitado sair do jogo
    if(event.keyCode == 27){
        var sair = confirm("Deseja sair do jogo?");
        if(sair == true){
            clearInterval(jogo);            
            alert("Até a próxima! :) ");
        }
    }    
    //Identifica a direção acionada
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){

    /*setScore(0)*/

    //Define os limites dentro do background, recomeçando do lado oposto
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0  && direction == "up") snake[0].y = 16 * box;
    
    //Encerrar o jogo caso a cobrinha se esbarre
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game over! :( ");
        }

    }

    //Define o background
    criarBG();

    //Define a cobrinha
    criarCobrinha();

    //Criar Comida aleatoriamente no background
    criarComida();

    //Posiciona a cobrinha no background
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Define as direções da cobrinha
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Aumentando a cobrinha após comer
    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    }
    else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;

        //Atualiza o score
        score = score + 1;
        document.getElementById('score').innerHTML = score;
    }

    //Cria a cabeça na nova posiçao na qual a cobrinha está se movimentando.
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}
