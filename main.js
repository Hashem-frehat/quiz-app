

let spancount = document.querySelector(".quizapp .count span");
let bulletspan = document.querySelector(".bullets .spans");
let quizareaa = document.querySelector(".quizarea");
let answerareaa = document.querySelector(".answerarea");
let submitbutton = document.querySelector(".submit-button");
let bulletss = document.querySelector(".bullets");
let result = document.querySelector(".result");
let countdownele = document.querySelector(".countdown");
let currentinddex = 0;
let rightanswer = 0;
let countdownstop ;
function getquestions(){
    let myrequest = new XMLHttpRequest();
    myrequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let questionar = JSON.parse(this.responseText);
            let questioncount = questionar.length;

            // Create Bullets + Set Questions Count
            createbullets(questioncount);

            // Add Question Data
            add_data(questionar[currentinddex],questioncount);

            countdown(5,questioncount);
            
            submitbutton.onclick = () =>{
                let therightanswer = questionar[currentinddex].right_answer;
                currentinddex++;
                
                checkanswer(therightanswer,questioncount);


                // remove the current answer
                quizareaa.innerHTML = "";
                answerareaa.innerHTML = "";

                add_data(questionar[currentinddex],questioncount);

                handlebullets();

                showresult(questioncount);
                clearInterval(countdownstop);
                countdown(5,questioncount);

            }
        }
    }
myrequest.open("get","question.json",true);
myrequest.send();


}
getquestions();

function createbullets (num){
spancount.innerHTML = num;

for(i=0 ;i<num; i++ ){

    let createbullet = document.createElement("span");
    if(i === 0){
        createbullet.className= "on";
    } 
bulletspan.appendChild(createbullet);
}
}
function add_data(obj,count){
if(currentinddex < count){
// create h2 question title 

let questiontitle = document.createElement("h2");
let questiontext = document.createTextNode(obj["title"]);

questiontitle.appendChild(questiontext);

quizareaa.appendChild(questiontitle);
// create answer
for(i=1 ; i <= 4 ; i++ ){

    let answerdiv = document.createElement("div");

    answerdiv.className = "answer";

    let radioinput = document.createElement("input");

    radioinput.name = "ans";
    radioinput.type = "radio";
    radioinput.id = `answer-${i}`;
    radioinput.dataset.answer = obj[`answer-${i}`]

    // create label
    let thelabel = document.createElement("label");

    thelabel.htmlFor = `answer-${i}`;

    let thelabeltext = document.createTextNode(obj[`answer-${i}`])

    thelabel.appendChild(thelabeltext);

    answerdiv.appendChild(radioinput);
    answerdiv.appendChild(thelabel);

    answerareaa.appendChild(answerdiv);

    

}
}

}

function checkanswer(ranswer, count ){
    let aanswer = document.getElementsByName("ans");
    let thechosenanswer ;

    for(i=0;i < aanswer.length;i++){
        if(aanswer[i].checked){
            thechosenanswer=aanswer[i].dataset.answer;
        }
    }

    if(ranswer === thechosenanswer){
        rightanswer++
    }
    
}

function handlebullets (){
let bulletsspan = document.querySelectorAll(".bullets .spans span");
let abulletsspan = Array.from(bulletsspan);
abulletsspan.forEach((span,index)=>{
    if(currentinddex === index){
        span.className = "on";
    }

})


}
function showresult (count){
    let theresult;
    if(currentinddex === count){
    quizareaa.remove();
    answerareaa.remove();
    submitbutton.remove();
    bulletss.remove();

    if(rightanswer > count / 2 && rightanswer <count){
        theresult = `<span class="good">good</span>, ${rightanswer} from ${count}`
    } else if(rightanswer === count){
        theresult = `<span class="perfect">perfect</span>, ${rightanswer} from ${count}`
    }else{
        theresult = `<span class="bad">bad</span>, ${rightanswer} from ${count}`
    }

    result.innerHTML = theresult;
}
}

function countdown (duration,count){
    if(currentinddex < count){

        let minutes,second;

        countdownstop = setInterval(function (){
    minutes = parseInt(duration / 60);
    second  = parseInt(duration % 60);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    second = second < 10 ? `0${second}` : second;

    countdownele.innerHTML = `${minutes} : ${second}`;
    
    if(--duration < 0){
        clearInterval(countdownstop);
        submitbutton.click();
    }

        },1000);



    }

}



