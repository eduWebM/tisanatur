const enlaces = document.querySelector('.menu');
const ham = document.querySelector('.ham');
const barras = document.querySelectorAll('.ham span');
const contenedor = document.querySelector('.capaSubmenus');

ham.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    contenedor.classList.toggle('activado');
    barras.forEach(child => {child.classList.toggle('animado')});   
});