//arreglar puntaje maximo
const campo_juego = document.getElementById('campo_juego');
const puntaje = document.querySelector('.puntaje');
const maxScore = document.querySelector('.puntaje_max');

let foodX;
let foodY;
let snakeX = 5;
let snakeY = 7;
let snakeBody = [];

let obtenerMaxPuntaje = localStorage.getItem('puntajeMax') || 0;  //auxiliar
maxScore.textContent = "Máximo puntaje: "+obtenerMaxPuntaje;

const cambiar_posicion_comida = function () {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

    console.log("Comida en X: " + foodX);
    console.log("Comida en Y: " + foodY);
};

const juegoTerminado = () => {  //se ejecuta al terminar juego
    clearInterval(bucle);
    contador = 0;
    campo_juego.innerHTML = " ";
    campo_juego.classList.remove("game_field");
    campo_juego.classList.add("campo_gameover");
    const espacio = document.createElement('div');
    espacio.classList.add("esp-gameover");
    const par1 = document.createElement('p');
    par1.textContent = "Has perdido";
    par1.classList.add("par_gameover");
    espacio.appendChild(par1);
    const par2 = document.createElement('p');
    par2.textContent = "Da un click para romper tu récord";
    par2.classList.add("par2_gameover");
    espacio.appendChild(par2);
    campo_juego.appendChild(espacio);

    campo_juego.addEventListener('click', function () {
        location.reload();
    });
};


let velY = 0;
let velX = 0;
const moverCulebra = function (evento) {
    if (evento.key == "ArrowLeft" && velX != 1) {
        velX = -1;
        velY = 0;
    } else if (evento.key == "ArrowRight" && velX != -1) {
        velX = 1;
        velY = 0;
    } else if (evento.key == "ArrowUp" && velY != 1) {
        //el eje Y va invertido     
        velX = 0;
        velY = -1;
    } else if (evento.key == "ArrowDown" && velY != -1) {
        velX = 0;
        velY = 1;
    };
    // iniciarJuego();
};


let contador = 0;
const iniciarJuego = function () {
    //limpiar campo de juego
    campo_juego.innerHTML = "";

    if (foodX == 1 && foodY == 1) { //corregir bug comida en posicion 1, 1
        cambiar_posicion_comida();
    };

    for (let i = 0; i < snakeBody.length; i++) { //corregir bug comida en medio de la culebra
        if([foodY, foodX] == snakeBody[i]){
            cambiar_posicion_comida();
            console.log("Funcion ejecutada");
        };
    };

    //Creando comida
    const comida = document.createElement('div');
    comida.style.gridArea = `${foodY} / ${foodX}`; // en la propiedad grid area primero va el eje Y y luego el eje X
    comida.classList.add("color_comida");
    campo_juego.appendChild(comida);

    //cuando la serpiente pase por encima de la comida
    if (snakeX === foodX && snakeY === foodY) {
        cambiar_posicion_comida();
        snakeBody.push([foodY, foodX]);
        console.log(snakeBody);

        //contador
        contador++;
        puntaje.textContent = "Puntos: " + contador;

        //auxiliar
        let maximoPuntaje = (contador >= obtenerMaxPuntaje) ? contador : obtenerMaxPuntaje;
        let guardarMaxPuntaje = localStorage.setItem("puntajeMax", maximoPuntaje);
        maxScore.textContent = "Máximo puntaje: "+maximoPuntaje;
    };


    //hacer crecer en orden la snake
    for (let j = snakeBody.length - 1; j > 0; j--) {
        snakeBody[j] = snakeBody[j - 1];
    };
    snakeX += velX;
    snakeY += velY;
    snakeBody[0] = [snakeX, snakeY];


    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {  //chocar contra la pared
       juegoTerminado();
    };


    //Creando snake
    for (let i = 0; i < snakeBody.length; i++) {
        const snake = document.createElement('div');

        snake.style.gridArea = `${snakeBody[i][1]} / ${snakeBody[i][0]}`;
        snake.classList.add("color_snake");
        campo_juego.appendChild(snake);
    };

    for (let i = 0; i < snakeBody.length; i++) {
        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            juegoTerminado();
            console.log("Coalicion con el cuerpo");
        };
    };
};

let bucle = setInterval(iniciarJuego, 150);
cambiar_posicion_comida();
document.addEventListener("keydown", moverCulebra);


/*const flechaIzq = document.querySelector('.fle-izq');
const flechaArriba = document.querySelector('.fle-arriba');
const flechaAbajo = document.querySelector('.fle-abajo');
const flechaDer = document.querySelector('.fle-der');

flechaIzq.addEventListener('click', () => {
    if(velX != 1){
        velX = -1;
        velY = 0;
    };
});
flechaArriba.addEventListener('click', () =>{
    if(velY != 1) {
        velX = 0;
        velY = -1;
    };
});
flechaAbajo.addEventListener('click', () => {
    if(velY != -1) {
        velX = 0;
        velY = 1;
    };
});
flechaDer.addEventListener('click', () => {
    if(velX != -1) {
        velX = 1;
        velY = 0;
    };
});*/

/*const flechas = document.getElementById('conjunto-flechas');
flechas.addEventListener("click", (evento) => {

    let sentido = evento.target.getAttribute('id');
    if(sentido == 1 && velX != 1) {
        velX = -1;
        velY = 0;
    } else if(sentido == 2 && velY != 1) {
        velX = 0;
        velY = -1; 
    } else if(sentido == 3 && velY != -1) {
        velX = 0;
        velY = 1;
    } else if(sentido == 4 && velX != -1) {
        velX = 1;
        velY = 0;
    };
});*/




