/* ---- PARTICLES ---- */
particlesJS('particles-js', {
    particles: {
        number: { value: 60 },
        color: { value: '#00ffcc' },
        shape: { type: 'circle' },
        opacity: { value: 0.4 },
        size: { value: 3 },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ffcc',
            opacity: 0.3,
            width: 1
        },
        move: { enable: true, speed: 2 }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
        }
    }
});

/* ---- MODO CLARO ---- */
const btnTema = document.getElementById('btn-tema');
const iconoTema = document.getElementById('icono-tema');

btnTema.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        iconoTema.textContent = 'dark_mode';
        window.pJSDom[0].pJS.particles.color.value = '#ff0000';
        window.pJSDom[0].pJS.particles.line_linked.color = '#3366ff';
        window.pJSDom[0].pJS.fn.particlesRefresh();
    } else {
        iconoTema.textContent = 'light_mode';
        window.pJSDom[0].pJS.particles.color.value = '#ff0000';
        window.pJSDom[0].pJS.particles.line_linked.color = '#9900ff';
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
});

/* ---- CAMBIO DE COLOR PARTICULAS ---- */
const colores = ['#ff0000', '#00ffcc', '#0066ff', '#9900ff'];
let colorIndex = 0;

setInterval(function() {
    colorIndex = (colorIndex + 1) % colores.length;
    const color = colores[colorIndex];
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = color;
    pJS.particles.line_linked.color = color;
    pJS.particles.array.forEach(function(p) {
        p.color.value = color;
    });
}, 5000);

/* ---- MODAL PROYECTOS ---- */
function abrirModal(id, boton) {
    const card = boton.closest('.card__proyect');
    const img = card ? card.querySelector('.card__front img') : null;
    const modal = document.getElementById(id);
    if (img) modal.querySelector('.modal__img').src = img.src;
    modal.classList.add('modal--activo');
}

function cerrarModal(id) {
    document.getElementById(id).classList.remove('modal--activo');
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('modal--activo');
    }
});

/* ---- TYPEWRITER EFFECT ---- */
const elemento = document.getElementById('typewriter');
const textos = ['Desarrollador Frontend'];
let textoIndex = 0;
let charIndex = 0;
let escribiendo = true;

function typewriter() {
    const textoActual = textos[textoIndex];
    if (escribiendo) {
        elemento.textContent = textoActual.substring(0, charIndex + 1) + '_';
        charIndex++;
        if (charIndex === textoActual.length) {
            escribiendo = false;
            setTimeout(typewriter, 2000);
            return;
        }
    } else {
        elemento.textContent = textoActual.substring(0, charIndex - 1) + '_';
        charIndex--;
        if (charIndex === 0) {
            escribiendo = true;
            textoIndex = (textoIndex + 1) % textos.length;
        }
    }
    setTimeout(typewriter, escribiendo ? 80 : 40);
}

typewriter();

/* ---- BOTONES CARRUSEL ---- */
const carrusel = document.querySelector('.categorias-carrusel');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const cardWidth = 240 + 20;

btnNext.addEventListener('click', () => {
    carrusel.scrollBy({ left: cardWidth, behavior: 'smooth' });
});

btnPrev.addEventListener('click', () => {
    carrusel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

/* ---- DOTS CARRUSEL ---- */
const dotsContainer = document.getElementById('dots-proyectos');
const cards = document.querySelectorAll('.card__proyect:not(:first-child)');

cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('activo');
    dot.addEventListener('click', () => {
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    dotsContainer.appendChild(dot);
});

carrusel.addEventListener('scroll', () => {
    const index = Math.round(carrusel.scrollLeft / cardWidth);
    document.querySelectorAll('.carrusel-dots .dot').forEach((d, i) => {
        d.classList.toggle('activo', i === index);
    });
});

/* ---- BOTONES CARRUSEL SKILLS ---- */
const carruselSkills = document.querySelector('.carrucel-skills');
const btnPrevSkills = document.getElementById('btn-prev-skills');
const btnNextSkills = document.getElementById('btn-next-skills');
const skillCardWidth = 200 + 24; // ancho skill-card (200px) + gap (1.5rem = 24px)

btnNextSkills.addEventListener('click', () => {
    carruselSkills.scrollBy({ left: skillCardWidth, behavior: 'smooth' });
});

btnPrevSkills.addEventListener('click', () => {
    carruselSkills.scrollBy({ left: -skillCardWidth, behavior: 'smooth' });
});

/* ---- FORMULARIO ---- */
const form = document.querySelector('.form__form');
const mensaje = document.querySelector('.form__mensaje');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'accept': 'application/json' }
    });
    if (response.ok) {
        form.style.display = 'none';
        mensaje.style.display = 'block';
    } else {
        alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    }
});

document.querySelectorAll('.card__proyect:not(:first-child)').forEach(function(card) {
    let timeout;
    card.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        card.classList.add('card__proyect--girada');
    });
    card.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            card.classList.remove('card__proyect--girada');
        }, 100); // 100ms de gracia antes de desgirar
    });
});