var startertime, lasttime, interval, millisecleft;
var timeleftmin = document.getElementById('timer_min');
var timeleftsec = document.getElementById('timer_sec');
var annuler_resa = document.getElementById('btn-annuler-resa');
var p_annuler_resa = document.getElementById('annuler-resa');
var p_oui_non = document.getElementById('oui_non');
var annuler_resa_oui = document.getElementById('btn-annuler-oui');
var annuler_resa_non = document.getElementById('btn-annuler-non');
var p_info_resa = document.getElementById('panneau-info-resa');

function minsecleft(lasttime){
    var d = new Date();
    d = Number(d.getTime());
    var diff = new Date(lasttime - d);

    if (Number(diff) >= 0){
        return [Number(diff.getMinutes()),Number(diff.getSeconds())];
    }
}

function confirmcancel(){
    if (confirm("Vous désirez vraiment quitter?")) {
        alert("oui");
    }
    else {
    alert("non");
    }    
}


document.addEventListener('DOMContentLoaded', () => {
    if (typeof(Storage) !== "undefined") {
        startertime = Number(localStorage.startrent);
        if (startertime){
            var d = new Date();
            //lasttime = startertime + (1000*60*20);
            lasttime = startertime + (1000*15);
            d = Number(d.getTime());
            millisecleft = lasttime - d;

            p_info_resa.classList.remove('is-none');
            interval = setInterval(function(){
                timeleftmin.innerHTML = '';
                timeleftsec.innerHTML = '';
                if (minsecleft(lasttime)[0] < 10){
                    timeleftmin.innerHTML = 0;
                }
                timeleftmin.innerHTML += minsecleft(lasttime)[0];
                if (minsecleft(lasttime)[1] < 10){
                    timeleftsec.innerHTML = 0;
                }
                timeleftsec.innerHTML += minsecleft(lasttime)[1];}
                , 1000);

        }
    
    } else {
        p_info_resa.classList.remove('is-none');
        p_info_resa.innerHTML = "Pas de compte à rebours, votre navigateur ne supporte pas le  Web Storage";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (typeof(Storage) !== "undefined") {

        if (startertime){
            
            p_annuler_resa.classList.remove('is-none');

            setTimeout(function(){
                clearInterval(interval);
                if (localStorage.startrent){
                    localStorage.removeItem('startrent');
                    p_info_resa.innerHTML = "<b>Réservation indisponible</b>";
                    p_annuler_resa.classList.add('is-none');
                    p_oui_non.classList.add('is-none');
                }
            }, millisecleft);
        }

    } 
    else {
        p_info_resa.classList.remove('is-none');
        p_info_resa.innerHTML = "Pas de compte à rebours, votre navigateur ne supporte pas le  Web Storage";
    }
});

annuler_resa.addEventListener('click',() =>{

    if (p_oui_non.classList.contains('is-none')){
        p_oui_non.classList.remove('is-none');
        annuler_resa_oui.classList.remove('is-none');
        annuler_resa_non.classList.remove('is-none');
    }
    else {
        p_oui_non.classList.add('is-none');
    }

})

annuler_resa_non.addEventListener('click', () => {
    p_oui_non.classList.add('is-none');
})

annuler_resa_oui.addEventListener('click', () => {
    clearInterval(interval);
    localStorage.removeItem('startrent');
    p_info_resa.innerHTML = "<b>Réservation annulée</b>";
    p_annuler_resa.classList.add('is-none');
    p_oui_non.classList.add('is-none');
})