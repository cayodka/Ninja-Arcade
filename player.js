const play = document.getElementById("play");
const musiquinha = new Audio("/assets/audio/click.mp3");
const telaum = document.getElementById("telaum");
const papelparede = document.getElementById("papelparede");
const music = new Audio("/assets/audio/bgm.mp3");
const ninjasound = new Audio("/assets/audio/ninja.mp3")
const ninjavoz = new Audio("/assets/audio/domo.mp3")
const ninja = document.getElementById("logo")
const morte = new Audio("/assets/audio/morte.mp3")
const espada1 = new Audio("/assets/audio/espada1.mp3")
const espada2 = new Audio("/assets/audio/espada2.mp3")
const explosão = document.getElementById("explosão")
const somexplosão = new Audio("/assets/audio/somexplosão.mp3")

music.loop = true;

document.addEventListener("mousemove", () => {
    if (music.paused) music.play();
});

ninja.addEventListener("click", () => {
    ninjasound.play();

    setTimeout(() => {
        explosão.style.visibility = "visible";
        ninjavoz.play();
        somexplosão.play();
        setTimeout(() => {
            somexplosão.play();
            explosão.style.visibility = "hidden";
        }, 7000);
    }, 4000);
});

play.addEventListener("click", () => {
    musiquinha.play();
    telaum.remove();

    setTimeout(() => {

        papelparede.style.opacity = "1";
        papelparede.style.transition = "opacity 2s";

        setTimeout(() => {

            papelparede.style.opacity = "0";
        }, 5000);
    }, 100);
});

let healthPlayer1 = 100;
let healthPlayer2 = 100;
let numeroAtual = 0;
let partidaIniciada = false;
let intervalo;

const aleatoriedade = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

const escolherJogador = () => Math.random() < 0.5 ? 1 : 2;

const atualizaVida = (player, health) => {
    const barra = document.getElementById(player === 1 ? "vida1" : "vida2");
    if (barra) {
        barra.style.width = `${health}%`;
    }
};

const aplicarDanoComNumero = () => {
    if (!partidaIniciada) return;

    const dano = numeroAtual;
    const jogadorEscolhido = escolherJogador();

    if (jogadorEscolhido === 1) {
        healthPlayer1 = Math.max(0, healthPlayer1 - dano);
        atualizaVida(1, healthPlayer1);
        animarJogador("p1");
        espada1.play();
        tocarSom(1);
    } else {
        healthPlayer2 = Math.max(0, healthPlayer2 - dano);
        atualizaVida(2, healthPlayer2);
        animarJogador("p2");
        espada2.play();
        tocarSom(2);
    }
    verificarVitoria();
};

const animarJogador = (playerId) => {
    const player = document.getElementById(playerId);
    if (player) {
        player.classList.add("shakeAndRotate");
        setTimeout(() => {
            player.classList.remove("shakeAndRotate");
        }, 500);
}};

const verificarVitoria = () => {
    if (healthPlayer1 === 0) {
        morte.play(); 
        setTimeout(() => {
            alert("Jogador 2 venceu!");
            reiniciarPartida();
        }, 1000); 
    } else if (healthPlayer2 === 0) {
        morte.play();
        setTimeout(() => {
            alert("Jogador 1 venceu!");
            reiniciarPartida();
        }, 1000);
    }
};

const reiniciarPartida = () => {
    healthPlayer1 = 100;
    healthPlayer2 = 100;
    atualizaVida(1, healthPlayer1);
    atualizaVida(2, healthPlayer2);

    document.getElementById("inputdado").value = "";
    clearInterval(intervalo);
    partidaIniciada = false;

    if (bgPlaying) {
        music.pause();
        bgPlaying = false;
    }
};

const tocarSom = (jogador) => {
    let som;

    if (jogador === 1) {
        som = new Audio(`/assets/audio/red.mp3`);
    } else if (jogador === 2) {
        som = new Audio(`/assets/audio/blue.mp3`);
    }

    som.play();
};

let bgPlaying = false;


document.getElementById("start").addEventListener("click", () => {
    if (partidaIniciada) {
        clearInterval(intervalo);
        partidaIniciada = false;
        if (bgPlaying) {
            bgPlaying = false;
        }
        musiquinha.play();
    } else {
        const inputdado = document.getElementById("inputdado");
        inputdado.style.visibility = "visible";

        partidaIniciada = true;

        intervalo = setInterval(() => {
            numeroAtual = aleatoriedade(5, 20);
            inputdado.value = numeroAtual;
            aplicarDanoComNumero();
        }, 2000);
        musiquinha.play();
    }
});
