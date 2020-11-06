
// start the game when you click on the play button
document.getElementById('play').addEventListener('click', function(){
    startSound()
    setTimeout(play, 800)
})

// elements
const timer = document.getElementById('timer')
const calc = document.getElementById('calc')
const scoreLabel = document.getElementById('score')

// array for the boxes answers id
const myArray = ['1','2','3'];
// shuffle that array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// sounds functions
function startSound(){
    const startSoundVar = new Audio("start.mp3");
    startSoundVar.volume = 0.8
    startSoundVar.play();
}

function trueSound(){
    const trueSoundVar = new Audio("true.mp3");
    trueSoundVar.volume = 0.1
    trueSoundVar.play();
}

function falseSound(){
    const falseSoundVar = new Audio("false.mp3");
    falseSoundVar.volume = 0.4
    falseSoundVar.play();
}




function handler(e){
    e.stopPropagation();
    e.preventDefault();
}

function evaluate(x, y, operator) {
    return eval(x + operator + y);
}

const myButtons = document.getElementsByClassName('button')
    for (let i = 0; i < myButtons.length; i++) {
        myButtons[i].addEventListener("click", (e)=>{
            if (parseInt(e.currentTarget.innerHTML) === response){
                document.addEventListener("click",handler,true);
                window.score++
                clearInterval(window.interval)
                myButtons[i].style.backgroundColor = "rgba(3, 150, 3, 0.5)";
                trueSound()
                setTimeout(function(){
                    play()
                    scoreLabel.innerHTML = "Score : " + window.score
                    myButtons[i].style.backgroundColor = "rgba(3, 3, 3, 0.5)"
                },800)
            }
            else{
                document.addEventListener("click",handler,true);
                clearInterval(window.interval)
                myButtons[i].style.backgroundColor = "rgba(150, 10, 3, 0.5)";
                falseSound()
                setTimeout(function(){
                    lose()
                    scoreLabel.innerHTML = "Score : " + window.score
                    myButtons[i].style.backgroundColor = "rgba(3, 3, 3, 0.5)"
                },800)
            }
    });
}

window.score = 0

function play(){
    shuffle(myArray);
    document.getElementById('jeu-container').style.display = "flex"
    document.getElementById('intro-container').style.display = "none"
    document.getElementById('lose-container').style.display = "none"
    document.removeEventListener("click",handler,true);
    window.timer = 3
    window.range = 10

    timer.innerHTML = window.timer + ".00s"

    window.interval = setInterval(()=>{
        window.timer--
        if (window.timer === 0){
            clearInterval(window.interval)
            falseSound()
            lose()
        }
        timer.innerHTML = window.timer + ".00s"
    }, 1000)




    if (window.score <= 5) {
        window.range = 10
    } else if (window.score > 5 && window.score <= 10) {
        window.range = 20
    }
    else if (window.score >  10 && window.score <= 15) {
        window.range = 30
    }
    else if (window.score > 15 && window.score <= 20) {
        window.range = 40
    }
    else if (window.score > 20 && window.score <= 25) {
        window.range = 50
    }
    else if (window.score > 25 && window.score <= 30) {
        window.range = 60
    }
    else if (window.score > 30 && window.score <= 35) {
        window.range = 70
    }
    else if (window.score > 35 && window.score <= 40) {
        window.range = 80
    }
    else if (window.score > 40 && window.score <= 45) {
        window.range = 90
    }
    else if (window.score > 45 && window.score <= 50) {
        window.range = 100
    }
    

    let operator;

    let operatorNumber = Math.round(Math.random());
    if (operatorNumber === 0){
        operator = "+"
    } 
    else {
        operator = '-'
    }

    let x = Math.round(Math.random() * window.range);
    let y = Math.round(Math.random() * window.range);
    let a = Math.round(Math.random() * window.range);
    let b = Math.round(Math.random() * window.range);
    let c = Math.round(Math.random() * window.range);
    let d = Math.round(Math.random() * window.range);


    let operation = x + operator + y 


    response = evaluate(x,y,operator)
    let falseValue1 = evaluate(a,b,operator)
    let falseValue2 = evaluate(c,d,operator)

    if (falseValue1 === response || falseValue1 === falseValue2){
        falseValue1 = falseValue1 + 3
    }

    if (falseValue2 === response || falseValue2 === falseValue1){
        falseValue2 = falseValue2 + 3
    }



    document.getElementById('calc').innerHTML = operation
    document.getElementById(myArray[0]).innerHTML = response
    document.getElementById(myArray[1]).innerHTML = falseValue1
    document.getElementById(myArray[2]).innerHTML = falseValue2

}

document.getElementById('tryAgain').addEventListener('click', ()=>{
    clearInterval(window.interval)
    startSound()
    scoreLabel.innerHTML = "Score : " + window.score
    setTimeout(play, 800)

})

document.getElementById('home').addEventListener('click', ()=>{
    clearInterval(window.interval)
    scoreLabel.innerHTML = "Score : " + window.score
    document.getElementById('jeu-container').style.display = "none"
    document.getElementById('lose-container').style.display = "none"
    document.getElementById('intro-container').style.display = "flex"
    
})
function lose(){
    document.getElementById('jeu-container').style.display = "none"
    document.getElementById('lose-container').style.display = "flex"
    document.removeEventListener("click",handler,true);
    clearInterval(window.interval)
    scoreLabel.innerHTML = "Score : " + window.score
    window.range = 5
    window.timer = 3
    timer.innerHTML = window.timer + ".00s"
    document.getElementById(myArray[0]).innerHTML = "-"
    document.getElementById(myArray[1]).innerHTML = "-"
    document.getElementById(myArray[2]).innerHTML = "-"
    document.getElementById('loseMessage').innerHTML = "Your score is " + window.score
    document.getElementById('tryAgain').style.display = "block"
    window.score = 0
}