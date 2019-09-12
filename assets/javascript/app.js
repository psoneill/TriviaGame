$(document).ready(function() {

    var questions = {
        question1: {
            questionText: "The Taj Mahal was commissioned in 1632 by emporer Shah Jahan to as a tomb for whom?",
            questionAnswer: "His Favorite Wife",
            questionOptions: ["His Favorite Wife", "His Son", "Himself", "His Father"],
            questionImg: "assets/images/tajMahal.jpeg"
        },
        question2: {
            questionText: "Machu Picchu was built in the 15th Century by which South American Empire?",
            questionAnswer: "Incan Empire",
            questionOptions: ["Incan Empire", "Mayan Empire", "Aztec Empire", "Olmec Empire"],
            questionImg: "assets/images/machuPicchu.jpg"
        },
        question3: {
            questionText: "Petra is believed to have been settled as early as what Date??",
            questionAnswer: "9,000 BC",
            questionOptions: ["9,000 BC", "7,000 BC", "4,000 BC", "1,500 BC"],
            questionImg: "assets/images/petra.jpg"
        },
        question4: {
            questionText: "The Great Wall of China stretches continuously for how many miles?",
            questionAnswer: "13,000 miles",
            questionOptions: ["13,000 miles", "16,500 miles", "8,000 miles", "4,000 miles"],
            questionImg: "assets/images/greatWall.jpg"
        },
        question5: {
            questionText: "Chichen Itza is located in which Country?",
            questionAnswer: "Mexico",
            questionOptions: ["Mexico", "Nicaragua", "Belize", "Guatemala"],
            questionImg: "assets/images/chichenItza.jfif"
        },
        question6: {
            questionText: "The Great Pyramid of Giza was the tallest building in the World for how many years?",
            questionAnswer: "3,800 Years",
            questionOptions: ["3,800 Years", "4,500 Years", "2,000 Years", "3,200 Years"],
            questionImg: "assets/images/pyramidGiza.jpg"
        },
        question7: {
            questionText: "Christ the Redeemer overlooks which Brazilian City?",
            questionAnswer: "Rio de Janeiro",
            questionOptions: ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Fortaleza"],
            questionImg: "assets/images/christRedeemer.jpg"
        },
        question8: {
            questionText: "What was the maximum capacity of the Colosseum in 80AD?",
            questionAnswer: "80,000 people",
            questionOptions: ["80,000 people", "220,000 people", "140,000 people", "45,000 people"],
            questionImg: "assets/images/colosseum.jpg"
        },
        question9: {
            questionText: "What does the Wat in Angkor Wat translate to?",
            questionAnswer: "Temple",
            questionOptions: ["Temple", "City", "Paradise", "River"],
            questionImg: "assets/images/angkorWat.jpg"
        },
        question10: {
            questionText: "The Hagia Sophia was built during what Empire?",
            questionAnswer: "Byzantine Empire",
            questionOptions: ["Byzantine Empire", "Ottoman Empire", "Seljuk Empire", "Anatolia Empire"],
            questionImg: "assets/images/hagiaSophia.jpg"
        }
    }

    var time=15;
    var questionNumber;
    var correctAnswer;
    var intervalId;
    var rightCount=0;
    var wrongCount=0;
    var countdownRunning=false;

    $("#questionImg").attr("src","assets/images/gameStart.jpg");
    $("#startGame").on("click", gameStart);

    function gameStart() { 
        if (!countdownRunning) {
            questionNumber=1;
            setOptions(questions.question1);
            intervalId = setInterval(countdown, 1000);
            countdownRunning = true;
            $("#startGame").text("Reset");
        } else {
            clearInterval(intervalId);
            rightCount=0;
            wrongCount=0;
            countdownRunning = false;
            setOptions(questions.question1);
            $("#startGame").text("Start Game");
        }
    }

    function countdown() {
        time= time - 1;
        if(time=="-1") {
            wrongCount++;
            AnswerAnimation("red")
            startNextRound();
        }
        $("#timeLeft").text("Time Left: " + time);
    }

    function setOptions(question) {
        correctAnswer = question.questionAnswer;
        $("#questionText").text(question.questionText);
        $("#questionImg").attr("src",question.questionImg);
        for(i=0; i<4; i++) {
            var answerHold = $("#Answer"+(i+1));
            answerHold.text(question.questionOptions[i]);
        }
    }

    function startNextRound() {
        questionNumber++;
        if(questionNumber<=10) {
            var questionIndex = "question" + questionNumber;
            setOptions(questions[questionIndex]);
        } else {
            alert("Game over - Correct: " + rightCount + " / Incorrect: " + wrongCount)
        }
    }

    function AnswerAnimation(color) {
        $("#timeLeft").css("borderColor",color);
        $("#timeLeft").animate({
            borderRightWidth: 150,
            borderLeftWidth: 150
          }, 200 );
        $("#timeLeft").animate({
            borderRightWidth: 0,
            borderLeftWidth: 0
        }, 200 );
    }

    $(".btn-primary").on("click",function(){
        time=15;
        $("#timeLeft").text("Time Left: " + time);
        if($(this).text() == correctAnswer) {
            rightCount++;
            AnswerAnimation("green");
        } else {
            wrongCount++;
            AnswerAnimation("red");
        }
        startNextRound();
    });

});