const d = document,
    ls = localStorage;

export default function darkTheme(btn, classDark) {
    const $themeBtn = d.querySelector(btn);

    let moon = "🌕",
        sun = "☀️";

    const lightMode = () => {
        // $selectors.forEach((el) => el.classList.remove(classDark));

        for(const el of d.querySelectorAll("body > *")){
            if (el.classList.contains("header-nav") || el.classList.contains("dark-theme-btn")) {
                // el.classList.remove("dark-mode-header");
                // d.querySelector(".nav-bar").classList.remove("dark-mode-header");
                // d.querySelector(".ham").setAttribute("src", "/assets/img/ham-menu.svg");
                // d.querySelector("#logo").setAttribute("src", "/assets/img/tisanatur_oscuro.svg");
                continue;
            } else {
                el.classList.remove(classDark);
            }
        }
        d.querySelectorAll(".fuentes a").forEach((el) => el.classList.remove("dark-mode-sources"));

        $themeBtn.textContent = moon;
        $themeBtn.setAttribute("title", "Oscurecer");
        ls.setItem("theme", "light");
    }

    const darkMode = () => {

        for(const el of d.querySelectorAll("body > *")){
            if (el.classList.contains("header-nav") || el.classList.contains("dark-theme-btn")) {
                // el.classList.add("dark-mode-header");
                // d.querySelector(".nav-bar").classList.add("dark-mode-header");
                // d.querySelector(".ham").setAttribute("src", "/assets/img/ham-menu-blanco.svg");
                // d.querySelector("#logo").setAttribute("src", "/assets/img/tisanatur_claro.svg");
                continue;                
            } else {
                el.classList.add(classDark);
            }
        }

        // $selectors.forEach((el) => el.classList.add(classDark));
        // for(const el of $selectors){
        //     if(el.children.length > 0){
        //         if(el.children[1].classList.contains("header-nav")) continue;
        //     }
        //     el.classList.add(classDark);
        // }

        d.querySelectorAll(".fuentes a").forEach((el) => el.classList.add("dark-mode-sources"));

        $themeBtn.textContent = sun;
        $themeBtn.setAttribute("title", "Aclarar");
        ls.setItem("theme", "dark");
    }

    d.addEventListener("mouseover", (e) => {
        if(e.target === $themeBtn) {
            if($themeBtn.textContent === moon){
                $themeBtn.classList.toggle("dia");
            } else if($themeBtn.textContent === sun){
                $themeBtn.classList.toggle("noche");            
            }
        }
    });

    d.addEventListener("mouseout", (e) => {
        if(e.target === $themeBtn) {
            $themeBtn.classList.remove("dia");
            $themeBtn.classList.remove("noche");
        }
    });

    d.addEventListener("click", (e) => {
        if(e.target.matches(btn)) {
            if($themeBtn.textContent === moon) {
                $themeBtn.classList.remove("dia");
                darkMode();
            } else {
                $themeBtn.classList.remove("noche");
                lightMode();
            }
        }
    });

    
    if(ls.getItem("theme") === null) ls.setItem("theme", "light");
    if(ls.getItem("theme") === "light") lightMode();
    if(ls.getItem("theme") === "dark") darkMode();
    
}