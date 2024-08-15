export default function includeHtml(dataInclude){
    const $dataInclude = document.querySelectorAll(dataInclude);

    const includeHTML = (el, url) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", (e) => {
                if(xhr.readyState !== 4) return;

                if(xhr.status >= 200 && xhr.status < 300) {
                    el.outerHTML = xhr.responseText;
                    resolve(); // Resuelve la promesa cuando se carga el contenido correctamente
                } else {
                    let message = xhr.statusText || "Error al cargar el archivo, verifica que estés haciendo la petición por http o https";
                    el.outerHTML = `<div><p>Error ${xhr.status}: ${message}</p></div>`;
                    reject(new Error(`Error ${xhr.status}: ${message}`)); // Rechaza la promesa en caso de error
                }
            });

            xhr.open("GET", url);
            xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");
            xhr.send();
        });
    };

    const promises = Array.from($dataInclude).map(el => includeHTML(el, el.getAttribute("data-include")));

    return Promise.all(promises); // Devuelve una promesa que se resuelve cuando todas las inclusiones HTML se han completado
}