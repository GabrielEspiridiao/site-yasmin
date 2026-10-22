
/* ==============================
   1. ELEMENTOS DA CARTA
================================ */

const envelope = document.querySelector('#envelope');
const botaoAbrir = document.querySelector('#botao-abrir');
const carta = document.querySelector('#carta');

const botaoContinuar = document.querySelector(
    '#botao-continuar'
);

const nossaHistoria = document.querySelector(
    '#nossa-historia'
);

const tituloHistoria = document.querySelector(
    '#nossa-historia h2'
);


/* ==============================
   2. ABRIR A CARTA
================================ */

if (envelope && botaoAbrir && carta) {

    botaoAbrir.addEventListener('click', function () {

        envelope.classList.add('aberto');

        botaoAbrir.setAttribute(
            'aria-expanded',
            'true'
        );

        carta.removeAttribute('inert');

        carta.setAttribute(
            'aria-hidden',
            'false'
        );

    });

}


/* ==============================
   3. CONTINUAR PARA A HISTÓRIA
================================ */

if (
    botaoContinuar &&
    nossaHistoria &&
    tituloHistoria
) {

    botaoContinuar.addEventListener('click', function () {

        nossaHistoria.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        tituloHistoria.focus({
            preventScroll: true
        });

    });

}


/* ==============================
   4. ANIMAÇÃO DAS SEÇÕES
================================ */

const secoes = document.querySelectorAll('.secao');

const prefereMovimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

if (
    'IntersectionObserver' in window &&
    !prefereMovimentoReduzido
) {

    const observador = new IntersectionObserver(

        function (entradas, observadorAtual) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add('visivel');

                    observadorAtual.unobserve(
                        entrada.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    secoes.forEach(function (secao) {

        secao.classList.add('animar-entrada');

        observador.observe(secao);

    });

}



/* ==============================
   5. MENSAGEM EXTRA EM VÍDEO
================================ */

const botaoVideo = document.querySelector('#botao-video');
const videoFinal = document.querySelector('#video-final');
const videoPessoal = document.querySelector('#video-pessoal');

if (botaoVideo && videoFinal && videoPessoal) {

    botaoVideo.addEventListener('click', function () {

        const estaAberto = videoFinal.classList.contains('aberto');

        if (estaAberto) {

            // Fecha o vídeo e interrompe a reprodução.
            videoPessoal.pause();

            videoFinal.classList.remove('aberto');
            videoFinal.setAttribute('aria-hidden', 'true');
            videoFinal.setAttribute('inert', '');

            botaoVideo.setAttribute('aria-expanded', 'false');
            botaoVideo.textContent = 'Assistir à mensagem ♡';

        } else {

            // Revela o vídeo sem reproduzi-lo automaticamente.
            videoFinal.classList.add('aberto');
            videoFinal.removeAttribute('inert');
            videoFinal.setAttribute('aria-hidden', 'false');

            botaoVideo.setAttribute('aria-expanded', 'true');
            botaoVideo.textContent = 'Fechar mensagem ♡';

        }

    });

}
