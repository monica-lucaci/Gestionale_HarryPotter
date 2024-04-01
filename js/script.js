const stampa = () => {
    let elenco = JSON.parse(localStorage.getItem('oggetti_bacchette'));

    let stringaTabella = '';
    for (let [idx, item] of elenco.entries()) {
        stringaTabella += `
            <tr class="position-relative text-white">
                <td class="align-middle">${idx + 1}</td>
                <td class="align-middle">${item.codice}</td>
                <td class="align-middle">${item.materiale}</td>
                <td class="align-middle">${item.nucleo}</td>
                <td class="align-middle">${item.lunghezza}</td>
                <td class="align-middle">${item.resistenza}</td>
                <td class="align-middle">${item.mago}</td>
                <td class="align-middle">${item.casata}</td>
                <td class="align-middle">
                    <img  class=" align-middle img-bacchetta position-relative"src='${item.foto}' width="50" height="50" alt='immagine bacchetta' />
                </td>
                <td class="text-right align-middle">
                    <button class="btn btn-outline-info" onclick="modifica(${idx})">
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
const generateCode = () => {
    let code = Math.random().toString(36).substring(2, 10).toUpperCase();
    return code;
}

$('#modaleInserimento').on('show.bs.modal', () => {
    let codice = generateCode();
    document.getElementById("input-codice").value = codice;
    document.getElementById("input-codice").readOnly = true;
});

const salva = () => {

    let codice = document.getElementById("input-codice").value;
    let materiale = document.getElementById("select-materiale").value;
    let nucleo = document.getElementById("select-nucleo").value;
    let lunghezza = document.getElementById("input-lunghezza").value;
    let resistenza = document.getElementById("select-resistenza").value;
    let mago = document.getElementById("input-mago").value;
    let casata = document.getElementById("select-casata").value;
    let foto = document.getElementById("input-foto").value;

    let ogg = {
        codice,
        materiale,
        nucleo,
        lunghezza,
        resistenza,
        mago,
        casata,
        foto
    }



    let elenco = JSON.parse(localStorage.getItem('oggetti_bacchette') || []); //Prendo il vecchio elenco decodificato sotto forma di oggetto
    elenco.push(ogg);                                               //Aggiungo l'elemento al vecchio elenco
    localStorage.setItem('oggetti_bacchette', JSON.stringify(elenco));    //Ricodifico l'elenco (sotto forma di stringa) per poterlo salvare nel Local Storage



    let elencoCasate = JSON.parse(localStorage.getItem('oggetti_casate')) || [];
    // Cerca la casata corrispondente
    let casataCorrispondente = elencoCasate.find(casataItem => casataItem.nome === casata);
    if (casataCorrispondente) {
        // Se la casata esiste, incrementa la quantità
        casataCorrispondente.quantita = (casataCorrispondente.quantita || 0) + 1;
    } else {
        // Se la casata non esiste, aggiungila all'elenco con la quantità iniziale
        elencoCasate.push({ nome: casata, descrizione: '', quantita: 1, logo: '' });
    }
    // Salva l'elenco aggiornato delle casate nel localStorage
    localStorage.setItem('oggetti_casate', JSON.stringify(elencoCasate));
    console.log(elencoCasate)

    document.getElementById("input-codice").value = "";
    document.getElementById("select-materiale").value = "";
    document.getElementById("select-nucleo").value = "";
    document.getElementById("input-lunghezza").value = "";
    document.getElementById("select-resistenza").value = "";
    document.getElementById("input-mago").value = "";
    document.getElementById("select-casata").value = "";
    document.getElementById("input-foto").value = "";




    stampa();

    $("#modaleInserimento").modal("hide");
}

const elimina = (indice) => {
    let elenco = JSON.parse(localStorage.getItem('oggetti_bacchette'));
    elenco.splice(indice, 1);
    localStorage.setItem('oggetti_bacchette', JSON.stringify(elenco));

    stampa();
}

const modifica = (indice) => {

    let elenco = JSON.parse(localStorage.getItem('oggetti_bacchette'));
    console.log(elenco[indice])

    document.getElementById("update-codice").readOnly = true;
    document.getElementById("update-codice").value = elenco[indice].codice;
    document.getElementById("update-materiale").value = elenco[indice].materiale;
    document.getElementById("update-nucleo").value = elenco[indice].nucleo;
    document.getElementById("update-lunghezza").value = elenco[indice].lunghezza;
    document.getElementById("update-resistenza").value = elenco[indice].resistenza;
    document.getElementById("update-mago").value = elenco[indice].mago;
    document.getElementById("update-casata").value = elenco[indice].casata;
    document.getElementById("update-foto").value = elenco[indice].foto;


    $("#modaleModifica").data("identificativo", indice)

    $("#modaleModifica").modal("show");
}

const update = () => {
    let codice = document.getElementById("update-codice").value;
    let materiale = document.getElementById("update-materiale").value;
    let nucleo = document.getElementById("update-nucleo").value;
    let lunghezza = document.getElementById("update-lunghezza").value;
    let resistenza = document.getElementById("update-resistenza").value;
    let mago = document.getElementById("update-mago").value;
    let casata = document.getElementById("update-casata").value;
    let foto = document.getElementById("update-foto").value;

    let ogg = {
        codice,
        materiale,
        nucleo,
        lunghezza,
        resistenza,
        mago,
        casata,
        foto
    }

    let indice = $("#modaleModifica").data("identificativo")

    let elenco = JSON.parse(localStorage.getItem('oggetti_bacchette'));
    elenco[indice] = ogg;
    localStorage.setItem('oggetti_bacchette', JSON.stringify(elenco));

    $("#modaleModifica").modal("hide");
}


//Creazione elenco se non esiste
let elencoString = localStorage.getItem('oggetti_bacchette');
if (!elencoString)
    localStorage.setItem('oggetti_bacchette', JSON.stringify([]));

setInterval(() => {
    stampa(); 
}, 5000);

stampa(); 