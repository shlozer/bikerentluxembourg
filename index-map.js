//fonction générique d' appel a une API
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

var listeStations;
//Création map leaflet avec layer openstreetmap
var map = L.map('map-container').setView([49.61242773030638, 6.129667758297996], 13); 
var tile = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 6
}).addTo(map);

var icon_open = L.icon({
    //iconUrl: 'marker-icon-green.png'
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconAnchor: [13, -3]
})
var icon_close = L.icon({
    //iconUrl: 'marker-icon-red.png'
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconAnchor: [13, -3]
})

var nom_station = document.getElementById('nom_station');
var adresse_station = document.getElementById('adresse_station');
var velos_station = document.getElementById('velos_station');
var btn_reserver = document.getElementById('reservation-valider');
//marker.bindPopup("Hello world! ").openPopup();
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=luxembourg&apiKey=6db7bea3e02aefe0ccb4012dd78fcc44ed1304e5",
function(reponse){
    listeStations = JSON.parse(reponse);

    listeStations.forEach(element => {

        if (element.status === "OPEN" && element.available_bikes > 0){
            var marker = L.marker([Number(element.position.lat), Number(element.position.lng)], {icon: icon_open}).addTo(map);
        } else{
            var marker = L.marker([Number(element.position.lat), Number(element.position.lng)], {icon: icon_close}).addTo(map);
        }
        marker.bindPopup(element.name.slice(7) + '<br />' + 
            element.address + '<br />' +
            'Vélos disponibles: ' + element.available_bikes
        );

        marker.addEventListener('click', e => {
            nom_station.innerHTML = element.name.slice(7);
            adresse_station.innerHTML = element.address;

            if (element.status === "OPEN" && element.available_bikes > 0){
                velos_station.style.color = '';
                velos_station.style.fontSize = '';
                velos_station.innerHTML = element.available_bikes;
                btn_reserver.disabled = test_btn_reserver();
            }
            else {
                velos_station.style.color = 'red';
                velos_station.style.fontSize = '1.25rem';
                velos_station.innerHTML = 'Aucun vélo disponible';
                btn_reserver.disabled = test_btn_reserver();
            }
        })
    })
})


var btn_conditions = document.getElementById("reservation-conditions");
var reservation_name = document.getElementById("reservation_name");
var reservation_surname = document.getElementById("reservation_surname");
var signature_exist = false;

function test_btn_reserver(){
    if ((nom_station.innerHTML != "" ||
    adresse_station.innerHTML != "") &&
    velos_station.innerHTML > 0 &&
    reservation_name.value != "" &&
    reservation_surname.value != "" &&
    btn_conditions.checked &&
    signature_exist){
    //console.log("cond1");
    return false;
}
else{
    //console.log("cond2");
    return true;
}
}


reservation_name.addEventListener('change', () => {
    btn_conditions.checked = false;
    btn_reserver.disabled = true;
})

reservation_surname.addEventListener('change', () => {
    btn_conditions.checked = false;
    btn_reserver.disabled = true;
})

btn_conditions.addEventListener('click', () =>{
    btn_reserver.disabled = test_btn_reserver();
})


var btn_effacer = document.getElementById("reservation-effacer");
var canvas_signature = document.getElementById("reservation-canvas");
var ctx = canvas_signature.getContext("2d");
var signature_ok = false;

canvas_signature.addEventListener('mousedown',e => {
    signature_ok = true;
    ctx.moveTo(e.offsetX, e.offsetY);
    console.log("mouseevent",e.offsetX, e.offsetY);

})

canvas_signature.addEventListener('mouseup',e => {
    signature_ok = false;
    btn_reserver.disabled = test_btn_reserver();
})

canvas_signature.addEventListener('mousemove',e => {
    if (signature_ok){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        signature_exist = true;
    }
})

canvas_signature.addEventListener('mouseleave',e => {
    signature_ok = false;
})

//events adapté au smartphone
canvas_signature.addEventListener('touchstart',e => {
    signature_ok = true;
    ctx.moveTo(e.offsetX, e.offsetY);
    console.log("touch", e.offsetX, e.offsetY);
    console.log("touchstart");
})

canvas_signature.addEventListener('touchend',e => {
    signature_ok = false;
    btn_reserver.disabled = test_btn_reserver();
    console.log("touchend");
})

canvas_signature.addEventListener('touchmove',e => {
    //if (signature_ok){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        signature_exist = true;
    //}
    console.log("touchmove");
})

canvas_signature.addEventListener('touchcancel',e => {
    signature_ok = false;
    console.log("touchcancel");
})


//
btn_effacer.addEventListener('click', e => {
    ctx.clearRect(0,0,canvas_signature.width,canvas_signature.height);
    ctx.beginPath();
    signature_exist = false;
    //btn_reserver.disabled = true;
})

btn_reserver.addEventListener('click',() =>{
    btn_reserver.type = 'button';
    if (test_btn_reserver()){
        alert(
`Veuillez bien:  
    - choisir une station avec des vélos disponibles
    - remplir tous les champs
    - signer
    - accepter les conditions`);
        return;
    }

    if (typeof(Storage) !== "undefined") {
        var d = new Date();
        localStorage.startrent = d.getTime();
        btn_reserver.type = 'submit';
    } else {
        document.getElementById("panneau-info-resa").innerHTML = "Pas de compte à rebours, votre navigateur ne supporte pas le  Web Storage";
    }
})



