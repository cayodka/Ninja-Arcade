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
        tocarSom(1);
    } else {
        healthPlayer2 = Math.max(0, healthPlayer2 - dano);
        atualizaVida(2, healthPlayer2);
        animarJogador("p2");
        tocarSom(2); 
    }
    verificarVitoria();
};

const animarJogador = (playerId) => {
    const player = document.getElementById(playerId);
    if (player) {
        player.classList.add("damage-animation");
        setTimeout(() => {
            player.classList.remove("damage-animation");
        }, 500);
    }
};

const verificarVitoria = () => {
    if (healthPlayer1 === 0) {
        alert("Jogador 2 venceu!");
        reiniciarPartida();
    } else if (healthPlayer2 === 0) {
        alert("Jogador 1 venceu!");
        reiniciarPartida();
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

const music = new Audio("/assets/audio/bgm.mp3"); 
const clickSound = new Audio("/assets/audio/click.mp3");

const Musica = () => {
    if (bgPlaying) {
        music.pause(); 
        bgPlaying = false; 
    } else {
        music.currentTime = 0; 
        music.play(); 
        bgPlaying = true; 
    }
};


document.getElementById("start").addEventListener("click", () => {
    if (partidaIniciada) {
        
        clearInterval(intervalo);
        partidaIniciada = false;
        if (bgPlaying) {
            music.pause();
            bgPlaying = false;
        }
    } else {
        const dado = document.getElementById("dado");
        const inputdado = document.getElementById("inputdado");

        dado.style.visibility = "visible";
        inputdado.style.visibility = "visible";

        partidaIniciada = true;

        intervalo = setInterval(() => {
            numeroAtual = aleatoriedade(5, 20); 
            inputdado.value = numeroAtual;
            aplicarDanoComNumero(); 
        }, 2000);

        Musica(); 
        clickSound.play();
    }
});
