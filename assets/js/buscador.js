const d = document;

export default function buscador(search, busqueda, searchClose, busquedaTemplate, sectionBusqueda){
    const $search = d.querySelector(search),
        $busqueda = d.querySelector(busqueda),
        $searchClose = d.querySelector(searchClose),
        $template = d.querySelector(busquedaTemplate).content,
        $fragment = d.createDocumentFragment(),
        $sectionBusqueda = d.querySelector(sectionBusqueda);

    d.addEventListener("click", (e) => {    
        // Botón Cerrar Buscador
        if(e.target === $searchClose || e.target === $searchClose.children[0]) {
            if (window.innerWidth >= 1024) {
                d.querySelectorAll("body *").forEach(el => {
                    el.style.filter = "none";
                });
                d.querySelector("html").style.overflow = "auto";
                $search.classList.remove("activo-desktop");
            } else
                $search.classList.remove("activo");
            // borro cualquier rastro de búsqueda
            $busqueda.value = "";
            $sectionBusqueda.innerHTML = "";
            // $sectionBusqueda.style.backgroundColor = "transparent";
        }
    });

    d.addEventListener("focusin", (e) => {     
        if(e.target === $busqueda){
            if (window.innerWidth >= 1024){
                d.querySelectorAll("body *").forEach(el => {
                    if (el.id !== "busqueda" && !el.contains(e.target) && !el.classList.contains("search") && !el.contains($searchClose.children[0]) && !el.contains($sectionBusqueda)) {
                        el.style.filter = "blur(10px) grayscale(60%)";
                    }
                });
                d.querySelector("html").style.overflow = "hidden";
                $search.classList.add("activo-desktop");
                //(window.innerWidth <= 1024) ? $search.classList.add("activo") : $search.classList.add("activo-desktop");
            } else {
                $search.classList.add("activo");
            }
            
        }
    });

    d.addEventListener("focusout", (e) => {
        // if(e.target === $busqueda){
        //     if (window.innerWidth >= 1024) {
        //         d.querySelectorAll("body *").forEach(el => {
        //             el.style.filter = "none";
        //         });
        //         d.querySelector("html").style.overflow = "auto";
    
        //         // borro cualquier rastro de búsqueda
        //         e.target.value = "";
        //         $sectionBusqueda.innerHTML = "";
        //         $sectionBusqueda.style.backgroundColor = "transparent";
        //         $search.classList.remove("activo-desktop");
        //     } 
        // }
    });

    d.addEventListener("search", (e) => {
        if(e.target === $busqueda) {
            $sectionBusqueda.innerHTML = "";
            // $sectionBusqueda.style.backgroundColor = "transparent";
        }
    });

    d.addEventListener("keyup", (e) => {
        if(e.target === $busqueda){
            if(e.key === "Escape") {
                e.target.value = "";
                $sectionBusqueda.innerHTML = "";
            }                

            const palabra = $busqueda.value;

            if(palabra.length > 5){ // cuando el nº de caracteres del buscador sea suficiente, busco en la BD
                async function getData() {
                    try{
                        let res = await fetch("posts.json"),
                        json = await res.json();

                        if (!res.ok) throw { status: res.status, statusText: res.statusText };

                        let match = false, encontrado = false;

                        json.forEach((el) => {
                            if(el.titulo.toLowerCase().includes(palabra.toLowerCase())){ // hay una coincidencia{
                                // busco en 'section-busqueda' si ya existe para ignorarlo y evitar duplicados en el DOM
                                for(const ele of $sectionBusqueda.children) {
                                    if(ele.dataset.id == el.id) {
                                        match = true;
                                        break;
                                    }
                                }
                                if(!match){
                                    encontrado = true;
                                    /* *** Uso de la template *** */
                                    $template.querySelector(".articulo-busqueda").setAttribute("data-id", `${el.id}`);

                                    // imagen
                                    let articulo = el.articulo;
                                    let regex = /<img\b[^>]*>/;
                                    let match = articulo.match(regex);
                                    let imagen = match ? match[0] : '';
                                    $template.querySelector(".imagen").innerHTML = imagen;

                                    // título
                                    $template.querySelector(".title-h3").textContent = el.titulo;

                                    // creo el slug
                                    let slug = el.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                    $template.querySelector(".button-link").setAttribute("href", `ver-articulo.html?slug=${slug}`);
                                    

                                    // añado finalmente el template al fragmento
                                    let $clone = d.importNode($template, true);
                                    $fragment.appendChild($clone);

                                }
                            }
                        });

                        // añado finalmente el fragmento con el articulo al contenedor de búsqueda
                        if(!match && encontrado) {
                            $sectionBusqueda.appendChild($fragment);
                            // $sectionBusqueda.style.backgroundColor = "#fff";
                        }

                    } catch (err) {
                        let message = err.statusText || "Ocurrió un error";
                        // $sectionBusqueda.style.backgroundColor = "#fff";
                        $sectionBusqueda.innerHTML = `Error ${err.status}: ${message}`;
                    }
                }
                getData();
            } else {
                $sectionBusqueda.innerHTML = "";
                // $sectionBusqueda.style.backgroundColor = "transparent";
            }
        }
    });
}