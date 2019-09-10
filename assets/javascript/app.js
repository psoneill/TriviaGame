var questions = {
    question1: {
        questionText: "Who is #11?",
        questionAnswer: "Jordan Staal",
        questionOptions: ["Jordan Staal", "Dougie Hamilton", "Brett Pesce", "Nino Niederreiter"]
    },
    question2: {
        questionText: "Who is #74?",
        questionAnswer: "Jaccob Slavin",
        questionOptions: ["Jaccob Slavin", "Sebastian Aho", "Martin Necas", "Lucas Wallmark"]
    }
}

$(document).ready(function() {
    $("#startGame").on("click", gameStart(questions.question1));

    var time=10;
    var questionNumber;
    var correctAnswer;
    var rightCount=0;
    var wrongCount=0;
    var countdownRunning=false;

    function gameStart(questionIndex) { 
        if (!countdownRunning) {
            questionNumber=1;
            setOptions(questionIndex);
            intervalId = setInterval(countdown, 1000);
            countdownRunning = true;
        }
    }

    function countdown() {
        time= time - 1;
        if(time=="-1") {
            startNextRound();
        }
        $("#timeLeft").text("Time Left: " + time);
    }

    function setOptions(question) {
        correctAnswer = question.questionAnswer;
        $("#questionText").text(question.questionText);
        for(i=0; i<4; i++) {
            var answerHold = $("#Answer"+(i+1));
            answerHold.text(question.questionOptions[i]);
        }
    }

    function startNextRound() {
        questionNumber++;
        var questionIndex = "question" + questionNumber;
        time=11;
        setOptions(questions[questionIndex]);
    }

    function AnswerAnimation(color) {
        $("#timeLeft,#questionText").css("borderColor",color);
        $("#timeLeft,#questionText").animate({
            borderRightWidth: 500,
            borderLeftWidth: 500
          }, 200 );
        $("#timeLeft,#questionText").animate({
            borderRightWidth: 0,
            borderLeftWidth: 0
        }, 200 );
    }

    $(".btn-primary").on("click",function(){
        if($(this).text() == correctAnswer) {
            rightCount++;
            AnswerAnimation("green");
            startNextRound();
        } else {
            wrongCount++;
            AnswerAnimation("red");
            startNextRound();
        }
    });

});