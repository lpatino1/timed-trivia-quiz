//vars to select appropriate elements from documents
//vars that determine which quiz was selected
var childeQuizEl = document.querySelector("#childe");
var xiaoQuiz = document.querySelector("#alatus");
var kazuhaQuiz = document.querySelector("#leaf");

//grabs the quizboard container
var quizBoardEl = document.querySelector("#quiz-board");
//grabs the highscore section
var highScoresEl = document.querySelector("#high-scores");
//grabs the question div and answer buttons
var questionEl = document.querySelector("#question");
var answer1El = document.querySelector("#choice1");
var answer2El = document.querySelector("#choice2");
var answer3El = document.querySelector("#choice3");

//grabs the element with the scoreslist

var visibleList = document.querySelector("#scoresList");

//timer
var timeEl = document.querySelector(".timer");

//save button
var saveButton = document.querySelector("#save");

//grab initials from form
var initialsEl = document.querySelector("#initials");

//event listeners for answers
answer1El.addEventListener("click", checkAnswer);
answer2El.addEventListener("click", checkAnswer);
answer3El.addEventListener("click", checkAnswer);

childeQuizEl.addEventListener("click", startGame);

//var tracking how many answers they've gotten right
var score=0;
//time
var timeLeft = 100;
//grabs the chars-container from the section #start-page
var charsContainerEl = document.querySelector(".chars-container");

//questions arrays

var cQuestions =[
    {
        questions: "What is one tool Tartaglia cannot use?",
        options: ["Chopsticks", "Bow", "Mining Pickaxe"],
        correct: "Chopsticks"
    },
    {
        questions: "Which one is NOT one of Tartaglia's siblings?",
        options: ["Tonia", "Teucer", "Antoinette"],
        correct: "Antoinette"
    },
    {
        questions: "Why does Tartaglia use a bow?",
        options: ["Because he is not proficient at it", "Because he likes it", "Because it   was a gift from his sister"],
        correct: "Because he is not proficient at it",
    },
    {
        questions: "What two elements can Tartaglia wield?",
        options: ["Hydro + Dendro", "Hydro + Electro", "Hydro +pyro"],
        correct: "Hydro + Electro" 
    },
]
// var xQuestions =[
//     {
//         questions: "What weapon does Xiao use?",
//         answers: ["Sword", "Claymore", "Polearm"],
//         correctAnswer: "Polearm" 
//     },
//     {
//         questions: "What is Xiao's true name?",
//         answers: ["Alatus", "Bosacius", "Menogias"],
//         correctAnswer: "Alatus"
//     },
//     {
//         questions: "What element does Xiao wield?",
//         answers: ["Dendro", "Anemo", "Geo"],
//         correctAnswer: "Anemo" 
//     },
//     {
//         questions: "What ascension material does Xiao use? ",
//         answers: ["Qingxin", "Starconch", "Sea Ganoderma"],
//         correctAnswer: "Qingxin"
//     },
// ]
// var kQuestions =[
//     {
//         questions: "What weapon does Kazuha use?",
//         answers: ["Sword", "Catalyst", "Polearm"],
//         correctAnswer: "Sword" 
//     },
//     {
//         questions: "What country is Kazuha from?",
//         answers: ["Mondstadt", "Inazuma", "Liyue"],
//         correctAnswer: "Inazuma"
//     },
//     {
//         questions: "Where does Kazuha currently reside?",
//         answers: ["Liyue", "The Crux", "Dawn Winery"],
//         correctAnswer: "The Crux" 
//     },
//     {
//         questions: "What is Kazuha's elemental skill called? ",
//         answers: ["Garyu Bladework", "Kazuha Slash", "Chihayaburu"],
//         correctAnswer: "Chihayaburu" 
//     },
// ]


//I need to start both quiz timer and corresponding quiz when user selects character
var choice1 = "true";
// var choice2 = "false";
// var choice3 = "false";



function startGame(){
    setTime();

    //background image styling
    charsContainerEl.style.display = "none";
    quizBoardEl.style.backgroundImage = "url(./images/childe-quiz.png)";
    quizBoardEl.style.backgroundSize = "cover";
    quizBoardEl.style.backgroundPosition = "center center";
    quizBoardEl.style.backgroundAttachment = "fixed";
    quizBoardEl.style.backgroundRepeat = "no-repeat";
    quizBoardEl.style.height = "100vh";
    quizBoardEl.style.width = "100vw";

    //set display of quiz questions and answers to show

    questionEl.style.display =  "unset";
    answer1El.style.display =  "unset";
    answer2El.style.display =  "unset";
    answer3El.style.display =  "unset";
    timeEl.style.display = "unset";

    //set boolean to false so the function genQuestions will generate the questions
    choice1 = "false";
    //call my genQuestions()
    genQuestions();
}
var i =0;
function genQuestions(){

    if(i===4){
        timeLeft = 100;
        showScores();
    } else{
        while(choice1==="false"){
            // answer1El.style.backgroundColor="";
            // answer2El.style.backgroundColor="";
            // answer3El.style.backgroundColor="";
            questionEl.innerHTML = cQuestions[i].questions;
            answer1El.innerHTML = cQuestions[i].options[0];
            answer2El.innerHTML = cQuestions[i].options[1];
            answer3El.innerHTML = cQuestions[i].options[2];
            choice1 = "true";
        } 
    }
          
}

function checkAnswer(event){
    clickedButton = event.target;
    let userAnswer = clickedButton.textContent;
    if(userAnswer === cQuestions[i].correct){
        score +=1;
        // clickedButton.style.backgroundColor ="green";
        i +=1;
        choice1 = "false";
        genQuestions();
      
    } else if(userAnswer != cQuestions[i].correct){
        //I need to take away time when an incorrect answer is selected
        timeLeft -= 20;
        // clickedButton.style.backgroundColor = "red";
        i+=1;
        choice1 = "false";
        genQuestions();
    }

}

//I need a quiz timer
function setTime(){
    var timerInterval = setInterval(function(){
        timeLeft--;
        timeEl.textContent = timeLeft;
        
        //I need to exit quiz when timer hits 0 OR all answers have been attempted
        if(timeLeft===0){
            clearInterval(timerInterval);
            showScores();
        }
    },1000)
}


function showScores(){
    //removes quiz from sight
    questionEl.style.display =  "none";
    answer1El.style.display =  "none";
    answer2El.style.display =  "none";
    answer3El.style.display =  "none";
    timeEl.style.display = "none";
    alert("Scroll down to see your results");

    //background-styling
    
    highScoresEl.style.backgroundImage = "url(./images/scores-background.jpg)";
    highScoresEl.style.backgroundSize = "cover";
    highScoresEl.style.backgroundPosition = "center center";
    highScoresEl.style.backgroundAttachment = "fixed";
    highScoresEl.style.backgroundRepeat = "no-repeat";
    highScoresEl.style.height = "100vh";
    highScoresEl.style.width = "100vw";
    
    //display the user score
    var totalEl =document.querySelector("#total");
    totalEl.textContent = "Your score: " + score;


    //I need a form for score and initials submission
    //I need to store initials and scores in local storage
    saveButton.addEventListener("click", function(event){
        event.preventDefault();


        localStorage.setItem("userScore", score);
        localStorage.setItem("initials", initialsEl.value);
        
        var li = document.createElement("li");
        
        var txt = localStorage.getItem(initialsEl.value) + localStorage.getItem(score);
        li.textContent = txt;
        console.log(li);
    
    });
    
    //I need to retrieve initials and scores for a scoreboard

}


