const d = document;

export default function btnHam(hamburguer, search, menuIcons, navBar){
    const $ham = d.querySelector(hamburguer),
        $search = d.querySelector(search),
        $menuIcons = d.querySelector(menuIcons),
        $navBar = d.querySelector(navBar);

    d.addEventListener("click", (e) => {
        if(e.target === $ham){
            /*$enlacesContenedor.classList.toggle('activado');
            $userCartIcons.classList.toggle('user-cart-icons-activado');
            $menuIcons.classList.toggle('menu-icons-activado');*/
            $ham.classList.toggle('rotar');
            // Escuchar el evento de transición
            $ham.addEventListener('transitionend', function() {
                // Eliminar la clase que realiza la transformación
                $ham.classList.remove('rotar');

                // Cambio la imagen del botón hamburguesa
                let open = $ham.getAttribute("data-open");
                if(open == 0){
                    $ham.setAttribute("src", "../assets/img/close-menu.svg");
                    $ham.setAttribute("data-open", "1");
                    $search.style.display = "none";
                    
                } else {
                    $ham.setAttribute("src", "../assets/img/ham-menu.svg");
                    $ham.setAttribute("data-open", "0");
                    $search.style.display = "block";

                }
                $menuIcons.classList.toggle("menu-icons-activado");
                
            }, { once: true });

            $navBar.classList.toggle('activado');
        }
    });
}