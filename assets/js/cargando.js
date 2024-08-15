const d = document;

export default function cargando(){
    const $background = document.createElement("div"),
        $containCarga = document.createElement("div"),
        $imgLoader = document.createElement("img"), 
        $spanCarga = document.createElement("span"),
        $textCarga = document.createTextNode("Cargando ...");
    
        $imgLoader.setAttribute("src", "assets/img/te.gif");
        $imgLoader.setAttribute("alt", "loader");
        $imgLoader.classList.add("img-carga")
        $spanCarga.classList.add("text-carga");
        $spanCarga.appendChild($textCarga);

        $containCarga.appendChild($imgLoader);
        $containCarga.appendChild($spanCarga);        
        $containCarga.classList.add("contain-carga");

        $background.appendChild($containCarga);
        $background.classList.add("fondo");
    
        d.querySelector("body").prepend($background);
}