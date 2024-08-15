const d = document;

export default function leerPost(fullArticle,categoria,fondo){
    const urlParams = new URLSearchParams(window.location.search),
        slug = urlParams.get('slug'),
        $fondo = d.querySelector(fondo),
        $fullArticle = d.querySelector(fullArticle),
        $categoria = d.querySelector(categoria),
        $fragment = d.createDocumentFragment();

        // Muestra el mensaje de carga
        const mostrarMensajeCarga = () => {
            // Implementación para mostrar el mensaje de carga
            $fondo.classList.toggle("ocultar");
            console.info("Cargando...");
        };

        // Oculta el mensaje de carga
        const ocultarMensajeCarga = () => {
            // Implementación para ocultar el mensaje de carga
            $fondo.classList.toggle("ocultar");
            console.log("Documento cargado...");
        };

        mostrarMensajeCarga();
        setTimeout(() => {
            ocultarMensajeCarga();
        }, 2000);

        function convertirFecha(fecha) {
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            
            // Descomponer la fecha en partes
            const [anio, mes, dia] = fecha.split('-');
            
            // Convertir mes a índice y obtener el nombre del mes
            const nombreMes = meses[parseInt(mes, 10) - 1];
            
            // Formatear la fecha
            return `${parseInt(dia, 10)} de ${nombreMes} de ${anio}`;
        }

        fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            const article = data.find(a => a.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === slug);
            
            return new Promise((resolve) => {
                if (article) {
                    // escribo la categoría en las 'migas'
                    $categoria.textContent = article.categoria;
                    $categoria.parentNode.setAttribute("href", `/categoria.html?slug=${article.categoria}`);

                    // título del artículo
                    const $titleArticle = d.createElement('h1');
                    $titleArticle.textContent = article.titulo;
                    $fragment.appendChild($titleArticle);

                    // fecha del artículo
                    const $fechaArticle = d.createElement('h2');
                    $fechaArticle.classList.add("fecha-article");
                    $fechaArticle.textContent = convertirFecha(article.fecha);
                    $fragment.appendChild($fechaArticle);

                    // contenido del artículo
                    const $contentArticle = d.createElement('article');
                    $contentArticle.classList.add("content-article");
                    $contentArticle.innerHTML = article.articulo;
                    $fragment.appendChild($contentArticle);
               
                    // 'data-id' del artículo
                    $fullArticle.setAttribute("data-id", article.id);
                    $fullArticle.appendChild($fragment);
                    resolve(); // Resolver la promesa una vez que se haya asignado el data-id
                } else {
                    $fullArticle.innerHTML = '<p>Artículo no encontrado</p>';
                    resolve(); // Resolver la promesa incluso si el elemento no se encuentra para evitar que se quede pendiente
                }
            });            
        });
}