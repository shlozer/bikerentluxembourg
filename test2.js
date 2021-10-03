document.addEventListener('DOMContentLoaded', () => {
    const timeleftdisplay = document.querySelector('#timeleft');
    const startbtn = document.querySelector('#countdown_button');
    let timeleft = 10;
    function countdown(){
        setInterval(function(){
            if(timeleft <= 0){
                clearInterval(timeleft = 0)
            }
            timeleftdisplay.innerHTML = timeleft;
            timeleft -= 1;

        }, 1000)
    }
    startbtn.addEventListener('click', countdown);
})