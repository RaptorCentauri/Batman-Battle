// Create character object. Each has the attributes name, image, health, attack, and counterAttack.
//player chooses a character
//player chooses a defender
// charcater attacks and do some math
//defender attacks and do some math,

// All that is needed to add characters to the game is to add the name to the nameList array. An image can be added at the respective index in imageList Array
// however the game will still function without it.

$(document).ready(function() {

//Variable Declarations
	var nameList = [["Batman", "assets/images/Batman.jpg"], ["Joker", "assets/images/Joker.jpg"], ["Red Hood", "assets/images/Redhood.jpg"], ["Robin", "assets/images/Robin.jpg"]];
//	var imageList = ["assets/images/Batman.jpg", "assets/images/Joker.jpg", "assets/images/Redhood.jpg", "assets/images/Robin.jpg"];
	var healthList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(250-100 +1))+100);
	var attackList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(50-10 +1))+10);
	var counterAttackList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(100-10 +1))+10);

	var newAttack;
	var baseAttack;

	var character = {};
	var roster = {};
//=========================================================================

//Function Declarations
	function createCharacter(i){
		character[i] = {
			name: nameList[[i][0]],
			//image: nameList[[i][1]],
			health: healthList[i],
			attack: attackList[i],
			counterAttack: counterAttackList[i],
		};
	}

	function generateRoster(){

		for(i=0; i<nameList.length; i++){
			//create a button
			var characterButton = $("<button>");
			characterButton.attr("data-character_id", i);
			characterButton.addClass("characterBtn");

			//create the name label
			characterButton.append("<h4><span></span></h4>");

			//set the button image
			characterButton.append("<img>");

			//create the health label
			characterButton.append("<h5><span></span></h5>");

			//add the button the the roster
			$(".roster").append(characterButton);		
		}

		for(i=0; i<nameList.length; i++){
			$(".characterBtn h4 span").addClass("name");
			$(".characterBtn  img").addClass("image");
			$(".characterBtn h5 span").addClass("health");
		}

		$(".name").each(function(i){
			$(this).html(character[i].name);
		})

		$(".image").each(function(i){
			$(this).attr("src", character[i].image);
		})

		$(".health").each(function(i){
			$(this).html(character[i].health);
		})
	}

	function attack(attacker, defender){

		if(character[defender].health >= 0){
			character[defender].health=Math.max(0, character[defender].health-character[attacker].attack);
		}

		$(".defender .health" ).html(character[defender].health);
		$(".gameLog").append(character[attacker].name + " attacks " + character[defender].name + " for " + character[attacker].attack + " damage." + "<br>");

		newAttack = character[attacker].attack+baseAttack;
	}

	function counterAttack(attacker, defender){
		if (character[attacker].health >= 0){
			character[attacker].health=Math.max(0, character[attacker].health-character[defender].counterAttack);
		}

		$(".attacker .health").html(character[attacker].health);
		$(".gameLog").append(character[defender].name + " attacks " + character[attacker].name + " for " + character[defender].counterAttack + " damage." + "<br>");
	}

	function selectCharacter(){
		

			if(!$("#currentCharacter").is(":empty") && !$("#defender").is(":empty")){
				var i = $(this).data("character_id");
				$(".gameLog").empty();
				$(".gameLog").append("The Arena is full!" + "<br>" + character[i].name + " is not able to fight!");
			}

			if($("#currentCharacter").is(":empty")){
				$(this).addClass("attacker");
				var i = $(this).data("character_id");
				$("#currentCharacter").append(this);
				baseAttack = character[i].attack;
				$(this).prop("disabled",true);
				$(".gameLog").empty();
				$(".gameLog").append(character[i].name + " has joined the fight!" +"<br>");
			}

			else if($("#defender").is(":empty")){
				$(this).addClass("defender");
				var i = $(this).data("character_id");
				$(this).children("h4").css("background", "rgba(148,17,0, 0.45)")
				$(this).children("h5").css("background", "rgba(148,17,0, 0.45)")
				$("#defender").append(this);
				$(this).prop("disabled",true);
				$(".gameLog").empty();
				$(".gameLog").append(character[i].name + " has joined the fight!" +"<br>");
			}
	}

	function battle(){

		if(GameOver()){
			newGame();
		}

		$(".gameLog").empty();

		if($("#currentCharacter").is(":empty")){	

			$(".gameLog").append("Choose a fighter!" + "<br>");
		}

		if(!$("#currentCharacter").is(":empty") && $("#defender").is(":empty")){	

			$(".gameLog").append("There are no enemies here!" + "<br>");
		}

		else{
			var a = $(".attacker").data("character_id");
			var d = $(".defender").data("character_id");

			if(character[a].health>0){
				attack(a,d);
				character[a].attack=newAttack;
			}
			
			if(character[d].health>0){
				counterAttack(a,d);
			}			

			if(character[a].health<=0){
				$(".gameLog").append(character[d].name + " has defeated " + character[a].name + "." + "<br>");
				$("#currentCharacter").empty();
			}

			if(character[a].health<=0 && $(".roster").is(":empty")){
				$(".gameLog").append("You have no fighters left! Game Over!" + "<br>");
			}

			if(character[d].health<=0){
				$(".gameLog").append(character[a].name + " has defeated " + character[d].name + "."  + "<br>");
				$("#defender").empty();
			}

			if(character[d].health<=0 && $(".roster").is(":empty")){
				$(".gameLog").append("You have defeated all enemies! You Win!" + "<br>");
			}
		}

		GameOver();

	}



	function GameOver(){
		if($(".roster").is(":empty") && $("#defender").is(":empty")){
			$("#attackBtn").html("PLAY AGAIN");
			return true;
		}

		else if($(".roster").is(":empty") && $("#currentCharacter").is(":empty")){
			console.log("Play again");
			$("#attackBtn").html("PLAY AGAIN");
			return true;
		}

		else{
			return false;
		}

	}

	function newGame(){
		$(".gameLog").empty();
		$("#currentCharacter").empty();
		$("#defender").empty();

		healthList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(250-100 +1))+100);
		attackList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(50-10 +1))+10);
		counterAttackList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(100-10 +1))+10);

		character = {};
		roster = {};

		newAttack=null;
		baseAttack=null;

		for (i=0; i<nameList.length; i++){
			createCharacter(i);
		}

		generateRoster();

		$("#attackBtn").html("FIGHT!");

		$(".characterBtn").on("click", selectCharacter);

		$("#attackBtn").on("click", battle);
	}
//=========================================================================


//Gameplay

	for (i=0; i<nameList.length; i++){
		createCharacter(i);
	}

	generateRoster();

	$(".gameLog").append("Choose a fighter!" + "<br>");

	$(".characterBtn").on("click", selectCharacter);

	$("#attackBtn").on("click", battle);

//=========================================================================

});






