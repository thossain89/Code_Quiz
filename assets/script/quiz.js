//Code Quiz by Tanvir Hossain

// First we will create the selectors

var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");
var intro = document.getElementById("intro");
var highScoreButton = document.getElementById("viewHighscore");
var maxHighScore= 5; //Maximum number of Highscore saved


// Now we create our question bank as objects

var questions = [

    {

        question: "What does HTML stand for?",
        imgSrc: "./assets/img/html.png",
        choiceA: "HyperText Markup Language",
        choiceB: "HighText Machine Language",
        choiceC: "HyperText and links Markup Language",
        choiceD: "None of these",
        correct: "A"

    }, {

        question: "The &lthr&gt tag in HTML is used for -",
        imgSrc: "./assets/img/html.png",
        choiceA: "new line",
        choiceB: "vertical ruler",
        choiceC: "new paragraph",
        choiceD: "horizontal ruler",
        correct: "D"


    }, {

        question: "Which of the following CSS property is used to set the background image of an element?",
        imgSrc: "./assets/img/css.png",
        choiceA: "background-color",
        choiceB: "background-attachment",
        choiceC: "background-image",
        choiceD: "None of the above",
        correct: "C"

    }, {

        question: "How to select the elements with the class name 'example'?",
        imgSrc: "./assets/img/css.png",
        choiceA: "Class example",
        choiceB: ".example",
        choiceC: "#example",
        choiceD: "example",
        correct: "B"

    }, {

        question: "Commonly used data types DO NOT include:",
        imgSrc: "./assets/img/js.png",
        choiceA: "alerts",
        choiceB: "numbers",
        choiceC: "strings",
        choiceD: "booleans",
        correct: "A"


    }, {

        question: "String values must be enclosed within ____ when being assigned to variables.",
        imgSrc: "./assets/img/js.png",
        choiceA: "curly brackets",
        choiceB: "parenthesis",
        choiceC: "commas",
        choiceD: "quotes",
        correct: "D"


    },


];

// Now create some variables for timer

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 60; //User gets 10s per question (6 questions)
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;


// Variable for penalty 

var penalty = 10;// 10s penalty

// variables for score

var score = 0;// variables for saving score


start.addEventListener("click", startQuiz); // IT ALL STARTS HERE !!!

// start quiz (Let the quiz begin)
function startQuiz() {

    intro.style.display = "none";
    highScoreButton.style.display = "none";
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(function () {
        //console.log(questionTime);
        questionTime--
        renderCounter();
        if (questionTime === 0) {
            clearInterval(TIMER);
        }

    }, 1000);

}

// Rendering a question

function renderQuestion() {
    var q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

// Render progress circles at bottom
function renderProgress() {
    for (var qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// Timer Render

function renderCounter() {
    // The reducing bar underneath the timer

    if (count <= questionTime) {
        counter.innerHTML = questionTime;
        timeGauge.style.width = questionTime * gaugeUnit + "px";
        count--
    }

    if (questionTime === 0) {
        // End Quiz TIME IS UP!!!
        clearInterval(TIMER);
        scoreRender();
    }

}

// Compare the Answer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }

    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// IF answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0"; // The progress circle becomes Green
}

// IF answer is Wrong and PENALTY of 10s
function answerIsWrong() {
    questionTime = questionTime - penalty; // penalty time takes 10s from remaining time rendered
    document.getElementById(runningQuestion).style.backgroundColor = "#f00"; // The progress circle becomes red
}

// Score render and Saving the score in local storage
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question answered by the user. The score is converted to percentage to make scoring easier.
    var scorePerCent = Math.round(100 * score / questions.length);

    // choose the emoji based on the scorePerCent
    var img = (scorePerCent >= 80) ? "./assets/img/5.png" :
        (scorePerCent >= 60) ? "./assets/img/4.png" :
            (scorePerCent >= 40) ? "./assets/img/3.png" :
                (scorePerCent >= 20) ? "./assets/img/2.png" :
                    "./assets/img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p> Your Score: " + scorePerCent + "</p>";

    //Enter your Initial Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    scoreDiv.append(createLabel);

    // Input Window
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    scoreDiv.append(createInput);

    // Submit Section
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    scoreDiv.append(createSubmit);

    // SAVE score to local storage
    createSubmit.addEventListener("click", function () {
        
        var initials = createInput.value;
        
        if (initials === null) {

            //console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: scorePerCent,
            }
            
            // console.log(finalScore);

            var allScores = localStorage.getItem("allScores");

           
            if (allScores === null) {
                allScores = [];
                
            } else {
                allScores = JSON.parse(allScores);
                
            }
              
            
            allScores.push(finalScore);
            allScores.sort((a, b) => b.finalScore - a.finalScore); 
            allScores.splice(5); //Keeping only top 5 Result
            
          

            var newScore = JSON.stringify(allScores);
            
            localStorage.setItem("allScores", newScore);

            

            // After submit takes to Highscore page
            window.location.replace("./Highscore.html");
        }
    });
}





