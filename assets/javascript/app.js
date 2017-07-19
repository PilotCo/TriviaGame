/*
	Title: Outdoorsman's Quiz Javascript
	Created By: Cody Pilot
	Date: 7/15/2017

	This is the javascript used in conjunction with the Outdoorsmans .html

*/

//initialize the variables
var time, timer, correct, incorrect, timeup, answerRandomizer, questionRandomizer, correctAnswer,questionCount, round, finalPercent;
var questionChecker = [100];

//initialize the possible questions in an array of objects.
var questions = [
	//question 1
	{	verbiage: "Which of these options is an unsafe way to treat water?"
		//the correct answer will always be index 0.
	,	answers: ["Filtered through 5 or more pieces of fabric", "Boiling the water", "Iodine", "UV light"]
	,	picture: "assets/images/treatWater.jpg"
	,	response: "Boiling, Iodine, and UV light are all acceptable methods of treating water. Good luck with using fabric to filter."
	,}
	//question 2
	,{	verbiage: "Which of these Rocky Mountain plants is not edible?"
	,	answers: ["Buttercups", "The soft inner bark of most pine trees", "Silverberries", "Violets; leaves, stems, and flowers"]
	,	picture: "assets/images/buttercups.jpg"
	,	response: "Eating a Buttercup is not reccomended. A blistered mouth never leads to a fun day."
	,}
	//question 3
	,{	verbiage: "How fast (on average) can a black bear run?"
	,	answers: ["35 MPH", "20 MPH", "25 MPH", "40 MPH"]
	,	picture: "assets/images/blackBear.jpg"
	,	response: "Black bears can run 35 MPH, don't expect to outrun one. They also don't always look this adorable."
	,}
	//question 4
	,{	verbiage: "What is the name of the knot used to tie a climber?"
	,	answers: ["Figure 8", "Square", "Slipknot", "Full Widsor"]
	,	picture: "assets/images/figure8.jpg"
	,	response: "The figure 8 is the correct answer, not much more to say about this one."
	,}
	//question 5
	,{	verbiage: "Where do you want most of the weight in your backpack?"
	,	answers:["The middle of your backpack, close to your back", "The bottom of your backpack", "The brain, or top, of your backpack", "In the side pockets of your backpack"]
	,	picture: "assets/images/backpack.jpg"
	,	response: "You want the weight evenly distributed in the middle of the pack and close to your back."
	,}
	//question 6
	,{	verbiage: "How many times can a woodpecker strike their beaks against the wall in 1 second?"
	,	answers:["20 times", "10 times", "Just one", "15 times"]
	,	picture: "assets/images/woodpecker.jpg"
	,	response: "20 times! No excuses next time you complain about a headache."
	,}
	//question 7
	,{	verbiage: "What is Polaris?"
	,	answers:["The North Star", "The starting point of a river", "A renowned backpack dealer", "The tallest mountain in Argentina"]
	,	picture: "assets/images/polaris.jpg"
	,	response: "This is the North Star. Part of the Little Dipper and pointed at by the Big Dipper."
	,}
	//question 8
	,{	verbiage: "Which of these will not help you determine directions?"
	,	answers:["Wind", "The stars", "Moss", "The sun"]
	,	picture: "assets/images/wind.jpg"
	,	response: "Wind can change direction in an instance, that will definitely not help you with your directions."
	,}
	//question 9
	,{	verbiage: "What is the height of Mt. Everest?"
	,	answers:["29,029 ft", "25,400 ft", "35,009 ft", "20,000 ft"]
	,	picture: "assets/images/everest.jpg"
	,	response: "29,029 ft, Mt. Everest is really freaking tall."
	,}
];

//initially hide the information box
$('#informationBox').hide();

function setup(){
	time = 15;
	correct = 0;
	incorrect = 0;
	timeup = 0;
	questionCount = 0;
	round = 0;
	questionChecker = [];

	$('#endButton').hide();
	$('#begin').hide();
	$('#informationBox').show();
	//initialize the starting layout
	document.getElementById("begin").innerHTML = "";
	document.getElementById("timer").innerHTML = "";
	document.getElementById("question").innerHTML = "";
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("answer" + i).innerHTML = "";
	}

	nextQuestion();
};



//create a function for displaying each question and start a timer
function nextQuestion(){

	//add 1 to the nnumber of questions asked
	questionCount++;
	//ensure the score page is not visible
	$('#timer').show();
	document.getElementById("scoreUpdate").innerHTML = "";
	document.getElementById("answerPicture").innerHTML = "";
	document.getElementById("wins").innerHTML = "";
	document.getElementById("losses").innerHTML = "";
	document.getElementById("timeOuts").innerHTML = "";
	time = 20;
	document.getElementById("timer").innerHTML = time;
	//set an initial random number from 0-3.
	answerRandomizer = Math.floor(Math.random() * 4);

	//randomize the order the questions are displayed and keep note of the ones that have been used
	var isNew = false;
	while(isNew === false){
		isNew = true;
		questionRandomizer = Math.floor(Math.random() * questions.length);
		for (var i = 0; i <= questionChecker.length; i++) {
			if(questionChecker[i] === questionRandomizer){
				isNew = false;
			}
		}
		if(isNew === true){
			questionChecker.push(questionRandomizer);
		}
	}

	document.getElementById("question").innerHTML = questions[questionRandomizer].verbiage;
	for (var i = 0; i < 4; i++) {
		document.getElementById("answer" + i).innerHTML = questions[questionRandomizer].answers[answerRandomizer];
		// This will add one to the answer randomizer but ensure that it is never greater than 4.
		answerRandomizer = (answerRandomizer + 1) % 4;
	}

	timer = setInterval(startTimer,1000);
}

//create the startTimer function
function startTimer(){
	time--;
	document.getElementById("timer").innerHTML = time;
	if(time < 1){
		clearInterval(timer);
		timeup++;
		correctAnswer = "timeout";
		scorePage();
	}
}

//create a timer for the Score Page 
function scorePageTimer(){
	time--;
	if(time < 1){
		clearInterval(timer);
		if(round === 7){
			endGameScreen();
		}else{
			nextQuestion();
		}
	}
}
//what to do if an answer is clicked
function answerClick(selection){
	clearInterval(timer);
	if(selection === questions[questionRandomizer].answers[0]){
		correctAnswer = "true";
		correct++;
	}else{
		correctAnswer = "false";
		incorrect++;
	}
	scorePage();
}

function scorePage(){

	time = 6;
	round++;
	//ensure the questions and answers are blanked
	$('#timer').hide();
	document.getElementById("begin").innerHTML = "";
	document.getElementById("timer").innerHTML = "";
	document.getElementById("question").innerHTML = "";
	for (var i = 0; i < 4; i++) {
		document.getElementById("answer" + i).innerHTML = "";
	}

	//insert the verbiage for the answer

	document.getElementById("scoreUpdate").innerHTML = questions[questionRandomizer].response;

	//Insert the answer picture

	document.getElementById("answerPicture").innerHTML = ('<img class="questionImage" src="' + questions[questionRandomizer].picture + '">');

	//update the score page with the current values


	document.getElementById("wins").innerHTML = "Correct Answers: " + correct;
	document.getElementById("losses").innerHTML = "Incorrect Answers: " + incorrect;
	document.getElementById("timeOuts").innerHTML = "Timeups: " + timeup;

	timer = setInterval(scorePageTimer,1000);

}

//create a function for the final screen
function endGameScreen(){
	//clear the currently displayed information
	document.getElementById("scoreUpdate").innerHTML = "";
	document.getElementById("answerPicture").innerHTML = "";
	document.getElementById("wins").innerHTML = "";
	document.getElementById("losses").innerHTML = "";
	document.getElementById("timeOuts").innerHTML = "";

	$('#endButton').show();

	finalPercent = correct/round;
	document.getElementById("lastMessage").innerHTML = "You achieved an outdoorsmans score of: " + Math.floor(finalPercent * 100) + "%";
	
	
}