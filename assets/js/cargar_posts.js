const d = document;

export default function cargarPosts(latest, postTemplate, fondo, next, prev) {
    const urlParams = new URLSearchParams(window.location.search),
        slugMain = urlParams.get('slug');

    (() => {
        switch(slugMain){
            case 'plantas':
                d.querySelector(".menu-bar li:nth-of-type(1)").classList.add("activado");
                break;
            case 'alimentos':
                d.querySelector(".menu-bar li:nth-of-type(2)").classList.add("activado");
                break;
            case 'ejercicio':
                d.querySelector(".menu-bar li:nth-of-type(3)").classList.add("activado");
                break;
            case 'bienestar':
                d.querySelector(".menu-bar li:nth-of-type(4)").classList.add("activado");
                break;
        }
    })();

    const $latest = d.querySelector(latest),
        $fondo = d.querySelector(fondo),
        $template = d.querySelector(postTemplate).content,
        $fragment = d.createDocumentFragment(),
        $prevButton = d.querySelector(prev),
        $nextButton = d.querySelector(next),
        $pageInfo = d.getElementById('page-info');

    let exito = false;
    let currentPage = 1;
    const articlesPerPage = 3;
    let articles = [];

    function truncateText(text, minLength) {
        let truncated = text.substring(0, minLength);
        const rest = text.substring(minLength);
        const endIndex = rest.indexOf('.');
        if (endIndex !== -1) {
            truncated += rest.substring(0, endIndex + 1);
        } else {
            truncated += '...';
        }
        return truncated;
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    async function getData() {
        const mostrarMensajeCarga = () => {
            $fondo.classList.toggle("ocultar");
            console.info("Cargando...");
        };

        const ocultarMensajeCarga = () => {
            $fondo.classList.toggle("ocultar");
            console.log("Documento cargado...");
        };

        mostrarMensajeCarga();
        setTimeout(() => {
            ocultarMensajeCarga();
        }, 2000);

        try {
            let res = await fetch("posts.json"),
                json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            // Filtrar y almacenar los artículos con fechas en un array
            articles = json.filter(el => {
                return (slugMain === null) || (slugMain !== null && el.categoria === slugMain);
            }).map(el => ({
                ...el,
                parsedDate: parseDate(el.fecha)
            }));

            // Ordenar los artículos por fecha
            articles.sort((a, b) => b.parsedDate - a.parsedDate);

            // Verificar el orden de los artículos después de ordenar
            articles.forEach(el => {
                console.log(`Artículo Ordenado: ${el.titulo}, Fecha: ${el.parsedDate}`);
            });

            // Renderizar la primera página
            renderPage(currentPage);
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $latest.innerHTML = `Error ${err.status}: ${message}`;
        }
    }

    function parseDate(dateString) {
        const [day, month, year] = dateString.split(' de ');
        const months = {
            'enero': '01',
            'febrero': '02',
            'marzo': '03',
            'abril': '04',
            'mayo': '05',
            'junio': '06',
            'julio': '07',
            'agosto': '08',
            'septiembre': '09',
            'octubre': '10',
            'noviembre': '11',
            'diciembre': '12'
        };
        return new Date(`${year}-${months[month]}-${day}`);
    }

    function renderPage(page) {
        $latest.innerHTML = '';  // Limpiar artículos anteriores
        $fragment.innerHTML = '';  // Limpiar fragmento

        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const pageArticles = articles.slice(startIndex, endIndex);

        pageArticles.forEach(el => {
            $template.querySelector(".title-h3").textContent = el.titulo;
            $template.querySelector(".title-h4").textContent = formatDate(el.parsedDate);

            let articulo = el.articulo;
            let regex = /<p>(.*?)<\/p>/;
            let match = articulo.match(regex);
            let parrafo = match ? match[1] : '';

            $template.querySelector(".description").innerHTML = truncateText(parrafo, 100);

            let slug = el.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            $template.querySelector(".button-link").href = `ver-articulo.html?slug=${slug}`;

            let $clone = d.importNode($template, true);
            $fragment.prepend($clone);
            //$fragment.appendChild($clone);
        });

        $latest.appendChild($fragment);
        updatePaginationInfo();
    }

    function updatePaginationInfo() {
        const totalPages = Math.ceil(articles.length / articlesPerPage);
        $pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        $prevButton.disabled = currentPage === 1;
        $nextButton.disabled = currentPage === totalPages;
    }

    d.addEventListener("click", (e) => {
        if(e.target === $prevButton){
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
            }
        }
        if(e.target === $nextButton){
            const totalPages = Math.ceil(articles.length / articlesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
            }
        }
    });

    exito = getData();
    return exito;
}