$(document).ready(function() {
    //questions Object which holds all questions, answers, options, and images
    var questions = {
        //name of questions follows pattern of questionx
        question1: {
            //Questions text is the text that shows on the screen
            questionText: "The Taj Mahal was commissioned in 1632 by emporer Shah Jahan to as a tomb for whom?",
            //Correct answer
            questionAnswer: "His Favorite Wife",
            //Options 1-4 for questions
            questionOptions: ["His Favorite Wife", "His Son", "Himself", "His Father"],
            //Image path associated with the question
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

    //setting all global variables used in javascript
    var time=15;
    var questionNumber;
    var correctAnswer;
    var intervalId;
    var rightCount=0;
    var wrongCount=0;
    var countdownRunning=false;

    //setting base placeholder image
    $("#questionImg").attr("src","assets/images/gameStart.jpg");
    //click event for starting the game as well as resetting the game
    $("#startGame").on("click", gameStart);

    //function for starting the game
    function gameStart() { 
        //only runs if the game isn't currently running to 
        if (!countdownRunning) {
            //sets questionNumber equal to 1
            questionNumber=1;
            //loads options for object question 1
            setOptions(questions.question1);
            //starts intervalID with a 1 second interval
            intervalId = setInterval(countdown, 1000);
            //sets the game clock to true so user cannot start another inverval
            countdownRunning = true;
            //sets the startGame button text to reset
            $("#startGame").text("Reset");
        } else {
            //on reset clear game board
            clearGameBoard();
        }
    }

    function clearGameBoard() {
        //clears current interval
        clearInterval(intervalId);
        //resets right, wrong, and time counts
        rightCount=0;
        wrongCount=0;
        time=15;
        //shows updated time reset on the board
        $("#timeLeft").text("Time Left: " + time);
        //flags that game is not currently running
        countdownRunning = false;
        //changes start game button text to Start Game
        $("#startGame").text("Start Game");
        //resets base image to placeholder
        $("#questionImg").attr("src","assets/images/gameStart.jpg");
        //resets answer choices to placeholders
        $("#Answer1").text("Thank");
        $("#Answer2").text("You");
        $("#Answer3").text("For");
        $("#Answer4").text("Playing!");
    }

    function countdown() {
        //counts down time by 1
        time= time - 1;
        //if time is less than 0 reset question
        if(time<0) {
            //timer running out results in wrong answer
            wrongCount++;
            //call answer animation with border color red
            AnswerAnimation("red");
            //start next round
            startNextRound();
        }
        //set timeleft
        $("#timeLeft").text("Time Left: " + time);
    }

    function setOptions(question) {
        //sets correct answer for future use
        correctAnswer = question.questionAnswer;
        $("#questionText").text(question.questionText);
        $("#questionImg").attr("src",question.questionImg);

        var scrambleQuestions = question.questionOptions;
    
        for (let i = scrambleQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [scrambleQuestions[i], scrambleQuestions[j]] = [scrambleQuestions[j], scrambleQuestions[i]];
        }

        for(i=0; i<4; i++) {
            var answerHold = $("#Answer"+(i+1));
            answerHold.text(scrambleQuestions[i]);
        }
    }

    function startNextRound() {
        questionNumber++;
        time=15;
        $("#timeLeft").text("Time Left: " + time);
        if(questionNumber<=10) {
            var questionIndex = "question" + questionNumber;
            setOptions(questions[questionIndex]);
        } else {
            $("#questionText").html("<h1>GAME OVER</h1><h2>Correct: " + rightCount + " - Incorrect: " + wrongCount+"</h2>");
            clearGameBoard();
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
        if($("#startGame").text() === "Reset" && questionNumber <= 10) {
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
        }
    });

});