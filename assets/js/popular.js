const d = document;

export default function popular(popular, listPopular){
    const $popular = d.querySelector(popular),
        $listPopular = d.querySelector(listPopular),
        $fragment = d.createDocumentFragment();

    const urlParams = new URLSearchParams(window.location.search),
        slugMain = urlParams.get('slug');

    let contador = 0;

    // Configuración de Airtable
    const token = 'patBgLsvsDoVxdymR.5557c17fe7337c6837c330996dd2c745d4a6b0b2f6198cd990d8cc8086d7c4fc',
        BASE_ID = 'appwGLdS7V8Elw35y',
        TABLE_ID = 'tblYuIt5JIo4FQlMq',
        url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;

    async function fetchVotes() {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.records.map(record => ({
            id: record.fields.ArticleID,
            votes: record.fields.Votes
        }));
    }

    async function fetchArticles() {
        const response = await fetch('posts.json');
        const articles = await response.json();
        return articles;
    }

    async function main() {
        try {
            const votes = await fetchVotes();
            const articles = await fetchArticles();

            // Ordenar votos de mayor a menor
            votes.sort((a, b) => b.votes - a.votes);

            // Crear un mapa de artículos para fácil acceso por ID
            const articlesMap = new Map();
            articles.forEach(article => {
                articlesMap.set(article.id, {
                    titulo: article.titulo,
                    categoria: article.categoria
                });
            });

            // Crear la lista de resultados
            //votes.forEach(vote => {
            for(const vote of votes){
                if(vote.votes != 0){
                /**console.log(vote.id);
                console.log(articlesMap.get(vote.id));*/
                    if(contador === 5){ // número de articulos máximo más populares que quiero mostrar
                        break;
                    }else{
                        const article = articlesMap.get(vote.id);
                        
                        if (article) {
                            if((slugMain === null) || ((slugMain !== null) && (article.categoria === slugMain))){
                            //if(article.categoria === slugMain){
                                const $li = d.createElement("li");
                                $li.classList.add("item-popular");
                                const $a = d.createElement("a");
                                let slug = article.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                $a.href = `ver-articulo.html?slug=${slug}`;
                                $a.textContent = article.titulo;
                                $li.appendChild($a);
                                $fragment.appendChild($li);

                                contador++;
                            } else {
                                continue;
                            }                      
                        }                 
                    }   
                }             

                /*$template.querySelector("p").textContent = articlesMap.get(vote.id);
                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);*/
            }
            $listPopular.appendChild($fragment);
            //$popular.appendChild($fragment);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Ejecutar la función principal
    main();
}