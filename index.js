
function myMoveLeft() {
    var s10 = document.querySelector("#slider1");
    var s1left0 = s10.getBoundingClientRect().left;
    var s1 = document.getElementById("slider1"); 
    /*var s1left0 = document.getElementById("slider1").style.left;*/
    var s20 = document.querySelector("#slider2");  
    var s2left0 = s20.getBoundingClientRect().left;
    var s2 = document.getElementById("slider2");   
    /*var s2left0 = document.getElementById("slider1").style.left;*/
    var s30 = document.querySelector("#slider3");  
    var s3left0 = s30.getBoundingClientRect().left;
    var s3 = document.getElementById("slider3");   
    /*var s3left0 = document.getElementById("slider1").style.left;*/
    //var l = document.getElementById("form-wrapper").style.width;
    console.log( s1left0);
    console.log(s2left0);
    console.log( s3left0);
    var pos = 0;
    var s1left = 0, s2left = 0, s3left = 0;
    var motor = setInterval(frame, 10);
    function frame() {
        console.log( s1left);
        console.log(s2left);
        console.log( s3left);
        if (pos == 100) {
            clearInterval(motor);
         } else {
            pos++;
            s1left = s1left0 + pos;
            s1.style.left = s1left + "%"; 
            s2left = s2left0 + pos;
            s2.style.left = s2left + "%";
            s3left = s3left0 + pos;
            s3.style.left = s3left + "%";
        }
    }

    if (s1.left == "0%") {
        document.getElementById("arrow-before").style.display = "none";
    }
  }

function myMoveRight() {
    var s1 = document.getElementById("slider1"); 
    /*var s1left0 = document.getElementById("slider1").style.left;*/
    var s2 = document.getElementById("slider2");   
    /*var s2left0 = document.getElementById("slider1").style.left;*/
    var s3 = document.getElementById("slider3");   
    /*var s3left0 = document.getElementById("slider1").style.left;*/
    var s10 = document.querySelector("#slider1");
    var s1left0 = s10.getBoundingClientRect().left;
    var s20 = document.querySelector("#slider2");
    var s2left0 = s20.getBoundingClientRect().left;
    var s30 = document.querySelector("#slider3");
    var s3left0 = s30.getBoundingClientRect().left;
    console.log( s1left0);
    console.log(s2left0);
    console.log( s3left0);
    
    //var l = document.getElementById("form-wrapper").style.width;
    var pos = 0;
    var s1left = 0, s2left = 0, s3left = 0;
    var motor = setInterval(frame, 10);
    function frame() {
        console.log( s1left);
        console.log(s2left);
        console.log( s3left);
        //var s1left, s2left, s3left;
        if (pos == 100) {
            clearInterval(motor);
        } else {
            pos++;
            s1left = s1left0 - pos;
            s1.style.left = s1left + "%"; 
            s2left = s2left0 - pos;
            s2.style.left = s2left + "%";
            s3left = s3left0 - pos;
            s3.style.left = s3left + "%";
        }
    }

    if (s3.left == "0%") {
        document.getElementById("arrow-after").style.display = "none";
    }

}

function myMoveLeft2() {
    //var s1 = document.getElementById("slider1"); 
    var s1 = document.querySelector("#slider1");
    var s1left0 = s1.getBoundingClientRect().left;
    //var s2 = document.getElementById("slider2"); 
    var s2 = document.querySelector("#slider2");  
    var s2left0 = s2.getBoundingClientRect().left;
    //var s3 = document.getElementById("slider3"); 
    var s3 = document.querySelector("#slider3");  
    var s3left0 = s3.getBoundingClientRect().left;
    //var s4left0 = document.getElementById("carroussel-wrapper").left;
    /*console.log(s1.offsetLeft);
    console.log( s1.offsetTop);
    console.log(s2.offsetLeft);
    console.log( s2.offsetTop);
    console.log(s3.offsetLeft);
    console.log( s3.offsetTop);*/
    //console.log(document.querySelector('#elementId').getBoundingClientRect().left)
    console.log( s1left0);
    console.log(s2left0);
    console.log( s3left0);
    //console.log(s4left0);
}


function myMoveRight2() {
    //var s1 = document.getElementById("slider1"); 
    var s1 = document.querySelector("#slider1");
    var s1left0 = s1.getBoundingClientRect().left;
    //var s2 = document.getElementById("slider2");   
    var s2 = document.querySelector("#slider2");
    var s2left0 = s2.getBoundingClientRect().left;
    var s3 = document.querySelector("#slider3");
    //var s3 = document.getElementById("slider3");   
    var s3left0 = s3.getBoundingClientRect().left;
    //var s4left0 = document.getElementById("carroussel-wrapper").left;
    
    /*console.log(s1.offsetLeft);
    console.log( s1.offsetTop);
    console.log(s2.offsetLeft);
    console.log( s2.offsetTop);
    console.log(s3.offsetLeft);
    console.log( s3.offsetTop);*/
    console.log( s1left0);
    console.log(s2left0);
    console.log( s3left0);
    //console.log(s4left0);

}
