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
        //sets current question text on screen
        $("#questionText").text(question.questionText);
        //loads question image
        $("#questionImg").attr("src",question.questionImg);
        //new array to hold scrambled question options
        var scrambleQuestions = question.questionOptions;
        //for loop to scramble options
        for (let i = scrambleQuestions.length - 1; i > 0; i--) {
            //generates new constant that holds a random number
            const j = Math.floor(Math.random() * (i + 1));
            //sets new index for scrambled array
            [scrambleQuestions[i], scrambleQuestions[j]] = [scrambleQuestions[j], scrambleQuestions[i]];
        }
        //for loop to set answer button text
        for(i=0; i<4; i++) {
            //holds answer button object
            var answerHold = $("#Answer"+(i+1));
            //sets text of answer button
            answerHold.text(scrambleQuestions[i]);
        }
    }
    //function to start next round
    function startNextRound() {
        //increases question number by 1
        questionNumber++;
        //resets time to 15
        time=15;
        //displays time left on screen
        $("#timeLeft").text("Time Left: " + time);
        //if statement to check if game should be over
        if(questionNumber<=10) {
            //sets new question object
            var questionIndex = "question" + questionNumber;
            //sets new options with updated question object
            setOptions(questions[questionIndex]);
        } else {
            //if the game is over then display game over text
            $("#questionText").html("<h1>GAME OVER</h1><h2>Correct: " + rightCount + " - Incorrect: " + wrongCount+"</h2>");
            //function to clear game board
            clearGameBoard();
        }
    }
    //function calling animation that occurs on a right or wrong answer
    function AnswerAnimation(color) {
        //sets border color of animation to input
        $("#timeLeft").css("borderColor",color);
        //animates the timeLeft element to have a colored border 
        $("#timeLeft").animate({
            //increases right and left border by 150 px on answer
            borderRightWidth: 150,
            borderLeftWidth: 150
          }, 200 );
        $("#timeLeft").animate({
            //retracts border back to 0
            borderRightWidth: 0,
            borderLeftWidth: 0
        }, 200 );
    }
    //function for any answer button being pressed
    $(".btn-primary").on("click",function(){
        //if statement that makes sure that the game isn't completed 
        if($("#startGame").text() === "Reset" && questionNumber <= 10) {
            //resets time to 15 and updates screen time left
            time=15;
            $("#timeLeft").text("Time Left: " + time);
            //if statement deciding whether or not the answer was right
            if($(this).text() == correctAnswer) {
                //adds one to the right answer count
                rightCount++;
                //calls green correct answer animation
                AnswerAnimation("green");
            } else {
                //adds one to the wrong answer count
                wrongCount++;
                //calls red incorrect answer animation
                AnswerAnimation("red");
            }
            //starts the next round of the game
            startNextRound();
        }
    });

});