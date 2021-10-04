
        const slider = document.querySelector(".items");
		const slides = document.querySelectorAll(".item");
		const button = document.querySelectorAll(".button");
		const pauseButton = document.querySelector(".pause__button");

		let current = 0;
		let prev = 4;
        let next = 1;
        var pause_indicator = false;

		for (let i = 0; i < button.length; i++) {
			button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
		}

		const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

		const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

		const gotoNum = number => {
			current = number;
			prev = current - 1;
			next = current + 1;

			for (let i = 0; i < slides.length; i++) {
				slides[i].classList.remove("active");
				slides[i].classList.remove("prev");
				slides[i].classList.remove("next");
			}

			if (next == 5) {
				next = 0;
			}

			if (prev == -1) {
				prev = 4;
			}

			slides[current].classList.add("active");
			slides[prev].classList.add("prev");
			slides[next].classList.add("next");
        }

        function automaticSwapper () {
            if (pause_indicator) {
                pause_indicator = false;
            }
            else {
                if (!pause_indicator) {
                    pause_indicator = true;
                }
            }        
            console.log("function stop",pause_indicator);
        
        }
        
        pauseButton.addEventListener('click', automaticSwapper);

        document.addEventListener('DOMContentLoaded', () => {

            function Mover() {
                console.log("function mover",pause_indicator);

                if (pause_indicator) {
                    return;
                }
                gotoNext();
            }
            function automaticMover () {
                setInterval(Mover,1500);
            }


            function automaticMoverLate () {
            setTimeout(automaticMover(), 3000);
            }

            //document.addEventListener('DOMContentLoaded', automaticMover);
            //window.addEventListener('load', automaticMoverLate());
            window.addEventListener('load', automaticMover());
        });        