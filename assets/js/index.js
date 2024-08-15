import cargando from "./cargando.js";
import btnHam from "./button_ham.js";
import cargarPosts from "./cargar_posts.js";
import includeHtml from "./include_html.js";
import leerPost from "./leer_post.js";
import votacion from "./votacion.js";
import popular from "./popular.js";
import buscador from "./buscador.js";
import darkTheme from "./tema_oscuro.js";

const d = document,
    w = window;

// Obtener la ruta del archivo HTML actual
const path = w.location.pathname;

d.addEventListener("DOMContentLoaded", async(e) => {
    cargando();
    try{
        await includeHtml("[data-include]");

        // Resto del código a continuación
        btnHam('.ham', 'search', '.menu-icons', '.nav-bar');

    } catch (error) {
        console.error("Error al cargar el archivo HTML:", error);
    }

    buscador("search", "#busqueda", ".contain-search-close", "#busqueda-template", ".section-busqueda");
    console.log(path);
    if (path === '/' || path === '/index.html' || path === '/categoria.html') {
        cargarPosts(".latest", "#post-template", ".fondo", "#next", "#prev");
        popular(".popular", ".list-popular");
    } else {
        await leerPost("#full-article", ".categoria", ".fondo");
        setTimeout(() => {
            votacion("#full-article", ".form-voto", "#voteButton");
        }, 1000);
    }
});

setTimeout(() => {
    darkTheme(".dark-theme-btn", "dark-mode");
}, 2000);
