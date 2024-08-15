const d = document;

export default function votacion(fullArticle, formVoto, voteButton){
    const $fullArticle = d.querySelector(fullArticle),
        $formVoto = d.querySelector(formVoto),
        $voteButton = d.querySelector(voteButton);
    
    let token = "patSayCyp1K4wrINc.931a03881ffa72b5b83653db6cd299cda7180c606a96125ce7b9afe8e8703fb3",
        baseId = "appwGLdS7V8Elw35y",
        tableId = "tblYuIt5JIo4FQlMq",
        airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

    let idFullArticle = $fullArticle.getAttribute("data-id");

    const miStorage = window.localStorage;

    // let votoEmitido = false;

    // (() => {
    //     fetch(airtableUrl, {
    //         method: 'GET',
    //         headers: { 'Authorization': 'Bearer ' + token }
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         if (data.records && Array.isArray(data.records)) {            
    //             let articleBD = data.records.find(record => record.fields.ArticleID == idFullArticle);
    //             if (articleBD && articleBD.fields.Votes !== undefined) {
    //                 $voteDisplay.textContent = articleBD.fields.Votes;
    //             }
    //         } else {
    //             console.error('No se encontraron registros en la respuesta de la API.');
    //         }
    //     })
    //     .catch(error => console.error('Error:', error));
    // })();

    let verMiVoto = () => {
        for (let [key, value] of Object.entries(localStorage)) {
            if(key === "idArticulo"){
                if(value === idFullArticle){
                    // creo la imagen de voto emitido
                    const $imgVotoEmitido = d.createElement('img');
                    $imgVotoEmitido.setAttribute("src", "../tisanatur/assets/img/coffee-lover.svg");
                    $imgVotoEmitido.setAttribute("alt", "Amante del café");
                    $imgVotoEmitido.classList.add("img-voto-emitido");
                    // creo el texto de voto emitido
                    const $textVotoEmitido = d.createElement('p');
                    $textVotoEmitido.classList.add("texto-voto-emitido");
                    $textVotoEmitido.textContent = "¡Ya has votado!";
                    // creo el contenedor
                    const $contain = d.createElement("div");
                    $contain.appendChild($imgVotoEmitido);
                    $contain.appendChild($textVotoEmitido);

                    $formVoto.replaceChildren($contain);
                    break;
                }
            }
        }
        // if(miVoto != null){
        //     $voteButton.disabled = true;
        // }
    };

    let darMiVoto = (idArticulo) => {  
        miStorage.setItem("idArticulo", idArticulo);      
    };

    verMiVoto();

    function updateVotes(recordId, voteCount) {
        fetch(`${airtableUrl}/${recordId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fields: { Votes: voteCount } })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            darMiVoto(data.fields.ArticleID);
            // $voteDisplay.textContent = data.fields.Votes;
            alert('Voto registrado correctamente.');           
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    }

    function createVoteRecord() {
        fetch(airtableUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fields: { ArticleID: fullArticle, Votes: 1 } })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // $voteDisplay.textContent = data.fields.Votes;
            alert('Voto registrado correctamente.');
            darMiVoto(data.fields.ArticleID);
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    }

    d.addEventListener("click", (e) => {
        if(e.target === $voteButton || e.target === $voteButton.children[0]){
            let recaptchaResponse = grecaptcha.getResponse();
            if (recaptchaResponse.length === 0) {
                alert('Por favor, completa el CAPTCHA.');
                return;
            }

            fetch(airtableUrl, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.records && Array.isArray(data.records)) {
                    let article = data.records.find(record => record.fields.ArticleID == idFullArticle);
                    if (article && article.fields.Votes !== undefined) {
                        let voteCount = article.fields.Votes + 1;
                        updateVotes(article.id, voteCount);
                    } else {
                        createVoteRecord();
                    }
                } else {
                    console.error('No se encontraron registros en la respuesta de la API.');
                    createVoteRecord();  // Crear el registro si no se encontraron registros
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
}
