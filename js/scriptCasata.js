const stampa = () => {
    let elenco = JSON.parse( localStorage.getItem('oggetti_casate') );
    

    let stringaTabella = '';
    for(let [idx, item] of elenco.entries()){
        stringaTabella += `
        <tr class="position-relative text-white">
                <td>${idx + 1}</td>
                <td class="">
                     <img  class="align-middle img-logo    position-relative" src='${item.logo}'  alt='immagine bacchetta' />
                </td>
                <td class="align-middle">${item.nome}</td>
                <td class="align-middle">${item.descrizione}</td>
                <td class="align-middle">${item.quantita}</td>
               
                <td class="text-right align-middle">
                    <button class="btn btn-outline-info" onclick="modificaCasata(${idx})">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="elimina(${idx})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("corpo-tabella").innerHTML = stringaTabella;
}

const salvaCasata = () => {
    let nome = document.getElementById("select-nome").value;
    let descrizione = document.getElementById("input-descrizione").value;
    // let quantita = document.getElementById("input-quantita").value;
    let logo = document.getElementById("input-logo").value;

    let ogg = {
       nome,
       descrizione,
    //    quantita,
       logo
    }
    console.log(ogg);


    let elenco = JSON.parse( localStorage.getItem('oggetti_casate') ); //Prendo il vecchio elenco decodificato sotto forma di oggetto
    elenco.push(ogg);                                               //Aggiungo l'elemento al vecchio elenco
    localStorage.setItem('oggetti_casate', JSON.stringify(elenco));    //Ricodifico l'elenco (sotto forma di stringa) per poterlo salvare nel Local Storage


    document.getElementById("select-nome").value = "";
    document.getElementById("input-descrizione").value = "";
  
    document.getElementById("input-logo").value = "";
  
    stampa();
    console.log(elenco)

    $("#modaleInserimentoCasata").modal("hide");
    
}

const elimina = (indice) => {
    let elenco = JSON.parse( localStorage.getItem('oggetti_casate') );
    elenco.splice(indice, 1);
    localStorage.setItem('oggetti_casate', JSON.stringify(elenco));

    stampa();
}

const modificaCasata = (indice) => {

    let elenco = JSON.parse( localStorage.getItem('oggetti_casate') );
    console.log(elenco[indice])

    document.getElementById("update-nome").value = elenco[indice].nome;
    document.getElementById("update-descrizione").value = elenco[indice].descrizione;
    document.getElementById("update-logo").value = elenco[indice].logo;


    $("#modaleModificaCasata").data("identificativo", indice)

    $("#modaleModificaCasata").modal("show");
}

const updateCasata = () => {
    let nome = document.getElementById("update-nome").value;
    let descrizione = document.getElementById("update-descrizione").value;
    let logo = document.getElementById("update-logo").value;
  
    let ogg = {
       nome,
       descrizione,
       logo
    }

    let indice = $("#modaleModificaCasata").data("identificativo")

    let elenco = JSON.parse( localStorage.getItem('oggetti_casate') );
    elenco[indice] = ogg;
    localStorage.setItem('oggetti_casate', JSON.stringify(elenco));

    $("#modaleModificaCasata").modal("hide");
}


const inizializzaCasate = () => {
    let elenco = JSON.parse(localStorage.getItem('oggetti_casate'));
    if (!elenco || elenco.length === 0) {
        // imizializza le 4 casate
        let defaultCasate = [
            { nome: "Gryffindor", descrizione: "Courage and bravery", quantita: 0, logo: "./immagini/gryffindor.png"},
            { nome: "Hufflepuff", descrizione: "Hard work and loyalty", quantita: 0, logo: "./immagini/hufflepuff.png" },
            { nome: "Ravenclaw", descrizione: "Wit and learning", quantita: 0, logo: "./immagini/ravenclaw.png" },
            { nome: "Slytherin", descrizione: "Ambition and cunning", quantita: 0, logo: "./immagini/slytherin.png" }
        ];
        localStorage.setItem('oggetti_casate', JSON.stringify(defaultCasate));
        elenco = defaultCasate;
    }
    return elenco;
}

inizializzaCasate();

setInterval(() => {
    stampa(); 
}, 5000);

stampa(); 