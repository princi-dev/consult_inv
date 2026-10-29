// 1. SOLOY ETO ILAY WEB APP URL AVY AMIN'NY GOOGLE APPS SCRIPT
const googleAppScriptURL = "https://script.google.com/macros/s/AKfycbwFoOaG6P0ogBrrjL2zd-tMzUvrB4Px678a0NhpXSO2lTRHkrQl7b865eoluCKXyT-v2Q/exec";

// 2. SOLOY ETO ILAY URL-N'NY GOOGLE SHEETS-NAO HANOKARANA AZY
const googleSheetsURL = "https://docs.google.com/spreadsheets/d/1wcsS4WncyeBF_GVz-El1vzfdMyn9DN9tOhHszG_K4sM/edit?usp=sharing";

// 3. ETO NY MENIMIAFINA (PASSWORD) - AZO OVAINA AMIN'IZAY TIANAO
const kaodyMarina = "4545"; 

const inputRef = document.getElementById('txt-ref');
const btnTadiavo = document.getElementById('btn-tadiavo');
const btnSheets = document.getElementById('btn-sheets');

const tondroTissu1 = document.getElementById('lbl-tissu1');
const tondroAccessoire = document.getElementById('lbl-accessoire');
const tondroTissu2 = document.getElementById('lbl-tissu2');

// Rehefa tsindrina ilay bokotra Google Sheets
btnSheets.addEventListener('click', fidiranaSheets);

// Rehefa tsindrina ny bokotra Validé
btnTadiavo.addEventListener('click', karohyData);

// Fikarohana amin'ny bokotra Enter
inputRef.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        karohyData();
    }
});

function fidiranaSheets() {
    // Vata mangataka kaody alohan'ny hitarihana any amin'ny sheets
    const kaodyNampidirina = prompt("Apidiro ny teny miafina azafady :");
    
    if (kaodyNampidirina === null) {
        return; // Manafoana raha tsindrina ny "Annuler"
    }
    
    if (kaodyNampidirina === kaodyMarina) {
        alert("Marina ny kaody! Handeha any amin'ny Google Sheets ianao izao.");
        window.open(googleSheetsURL, '_blank'); // Manokatra ny sheets amin'ny tabilao vaovao
    } else {
        alert("Diso ny kaody nampidirinao! Tsy afaka mijery ny sheets ianao.");
    }
}

function karohyData() {
    const refNofidina = inputRef.value.trim();
    
    if (!refNofidina) {
        alert("Azafady, soraty ilay daty ho jerena!");
        return;
    }
    
    tondroTissu1.innerText = "...";
    tondroAccessoire.innerText = "...";
    tondroTissu2.innerText = "...";
    
    fetch(`${googleAppScriptURL}?ref=${encodeURIComponent(refNofidina)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                faozyNySaha("-");
                return;
            }

            if (data.hita) {
                tondroTissu1.innerText = data.tissu1 !== "" ? data.tissu1 : "-";
                tondroAccessoire.innerText = data.accessoire !== "" ? data.accessoire : "-";
                tondroTissu2.innerText = data.tissu2 !== "" ? data.tissu2 : "-";
            } else {
                faozyNySaha("Tsy hita");
            }
        })
        .catch(error => {
            console.error("Nisy olana:", error);
            faozyNySaha("Error");
            alert("Tsy nahomby ny fampifandraisana.");
        });
}

function faozyNySaha(hafatra) {
    tondroTissu1.innerText = hafatra;
    tondroAccessoire.innerText = hafatra;
    tondroTissu2.innerText = hafatra;
}
