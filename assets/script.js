var quizWindowEl = document.querySelector("#question-display");
var timerDisplayEl = document.querySelector("#timer");
var startBtnEl = document.querySelector("#start-btn");
var answerChoiceEl = document.querySelector(".current-slide");
var timerEl = document.querySelector("#timer");
var testScore = 0;
var currentQuestionIndex = 0;
var timeLeft = 60;
var hasQuizEnded = false;



var questionsArr = [
    {
    question: "What is Saturn's largest moon?",
    a: "Titan",
    b: "Enceladus",
    c: "Io",
    d: "Europa",
    correctAnswer: "a"
},

    {
    question: "Which planet has no atmosphere?",
    a: "Earth",
    b: "Uranus",
    c: "Mars",
    d: "Mercury",
    correctAnswer: "d"
    },

    {
    question: "What abundanct metal in Mars' soil gives it its ",
    a: "Copper",
    b: "Iron",
    c: "Aluminum",
    d: "Lead",
    correctAnswer: "b"
    },

    {
    question: "Who discovered Jupiter's 4 largest moons?",
    a: "Galileo",
    b: "Newton",
    c: "Aristotle",
    d: "Bohr",
    correctAnswer: "a"
    },

    {
    question: "Which constellation contains the North Star?",
    a: "Orion",
    b: "Libra",
    c: "Little Dipper",
    d: "Virgo",
    correctAnswer: "c" 
    },
    
    {
    question: "What galaxy is closest to our own, the Milky Way galaxy?",
    a: "Andromeda",
    b: "Sirius",
    c: "Apollo",
    d: "Sputnik",
    correctAnswer: "a"
    },

    {
    question: "What is the largest planet in our solar system?",
    a: "Neptune",
    b: "Uranus",
    c: "Saturn",
    d: "Jupiter",
    correctAnswer: "d"
    },

    {
    question: "Jupiter's moon Ganymede is larger that what planet?",
    a: "Mercury",
    b: "Venus",
    c: "Earth",
    d: "Pluto",
    correctAnswer: "a"
    },

    {
    question: "The sun is believed to be halfway through its life. How much longer do scientists expect it to last?", 
    a: "200,000 years",
    b: "6 million years",
    c: "350 million years",
    d: "5 billion years",
    correctAnswer: "d"
    },

    {
    question: "Speaking of the death of stars, what even occurs after the death of a massive star and preceeds the creation of a black hole?",
    a: "a quasar",
    b: "a pulsar",
    c: "a supernova",
    d: "a nebula",
    correctAnswer: "c"
    },
]

var startQuiz = function(event) {
   
    // begin timer
    beginTimer();
    
    // generate next question
    newQuestionHandler();
}

var beginTimer = function() {
    var timerInterval = setInterval(function() {
        timerEl.textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            endQuiz(); 
        }
        else if (hasQuizEnded) {
            clearInterval(timerInterval);
        }
    }, 1000);
    }


var editTimer = function() {
    timeLeft = timeLeft - 6;
    }


var newQuestionHandler = function() {

    // remove existing div
    var currentQuestionEl = document.querySelector(".current-slide");
    currentQuestionEl.remove();


    // build new div with new question and answers
    var newQuestionDiv = document.createElement("div");
    newQuestionDiv.className = "current-slide";
    newQuestionDiv.setAttribute("data-question-id", currentQuestionIndex);
    newQuestionDiv.innerHTML = "<h3 class='question'>" + questionsArr[currentQuestionIndex].question + "</h3>";
        
    
    // building answers div
    var newAnswerEl = document.createElement("div");
    newAnswerEl.className = "answer-choices";
    
    // add answer buttons to the new answers div
    var answerButtonA = document.createElement("button")
    answerButtonA.className = "answer-btn";
    answerButtonA.setAttribute("data-answer-id", "a");
    answerButtonA.textContent = questionsArr[currentQuestionIndex].a;
    newAnswerEl.appendChild(answerButtonA);

    var answerButtonB = document.createElement("button")
    answerButtonB.className = "answer-btn";
    answerButtonB.setAttribute("data-answer-id", "b");
    answerButtonB.textContent = questionsArr[currentQuestionIndex].b;
    newAnswerEl.appendChild(answerButtonB);

    var answerButtonC = document.createElement("button")
    answerButtonC.className = "answer-btn";
    answerButtonC.setAttribute("data-answer-id", "c");
    answerButtonC.textContent = questionsArr[currentQuestionIndex].c;
    newAnswerEl.appendChild(answerButtonC);

    var answerButtonD = document.createElement("button")
    answerButtonD.className = "answer-btn";
    answerButtonD.setAttribute("data-answer-id", "d");
    answerButtonD.textContent = questionsArr[currentQuestionIndex].d;
    newAnswerEl.appendChild(answerButtonD);


    newQuestionDiv.appendChild(newAnswerEl);
    quizWindowEl.appendChild(newQuestionDiv);
    console.log(newQuestionDiv);
    
}



var answerInputHandler = function(event) {
    var userAnswerId = event.target.getAttribute("data-answer-id");
    if (userAnswerId === questionsArr[currentQuestionIndex].correctAnswer) {
        
        if (currentQuestionIndex < questionsArr.length - 1) {
        testScore++;
        currentQuestionIndex++;
        newQuestionHandler();
        }
        else {
            //display game over screen with high scores
            endQuiz();
        }
    }
    else {
        //reduce time on the clock
        editTimer();
        currentQuestionIndex++;
        newQuestionHandler();
    }

}

var endQuiz = function() {
    hasQuizEnded = true;
    // remove current question
    var currentQuestionEl = document.querySelector(".current-slide");
    currentQuestionEl.remove();

    //display score and ask for user initals
    var recordedScore = document.createElement("div");
    recordedScore.innerHTML = "<h2>You scored <span class='final score'>" + testScore + "</span>!";
    var initialsInputField = document.createElement("form")
    initialsInputField.innerHTML = "<input type='text' class='initials-input name='initials'>Enter Your Initials</input><button type='submit' class='initials-submit-btn'>Submit</button>";
    quizWindowEl.appendChild(recordedScore);
    quizWindowEl.appendChild(initialsInputField);
}


startBtnEl.addEventListener("click", startQuiz);
document.addEventListener("click", function(event) {
    if (event.srcElement.className === "answer-btn"){
        answerInputHandler(event);
    }
});


