// Create character object. Each has the attributes name, image, health, attack, and counterAttack.
//player chooses a character
//player chooses a defender
// charcater attacks and do some math
//defender attacks and do some math,

// All that is needed to add characters to the game is to add the name to the nameList array. An image can be added at the respective index in imageList Array
// however the game will still function without it.

$(document).ready( function() {

//Variable Declarations
	var nameList = [{charName: "Batman", charImage: "assets/images/Batman.jpg"}, {charName: "Joker", charImage: "assets/images/Joker.jpg"}, {charName: "Red Hood", charImage: "assets/images/Redhood.jpg"}, 
		{charName: "Robin", charImage: "assets/images/Robin.jpg"}, {charName: "Catwoman", charImage: "assets/images/Catwoman.jpg" }, {charName: "Deathstroke", charImage:"assets/images/Deathstroke.jpg" }, 
		{charName: "Mr. Freeze", charImage:"assets/images/MrFreeze.jpg" },{charName: "Nightwing", charImage:"assets/images/Nightwing.jpg" }, {charName:"Penguin", charImage:"assets/images/Penguin.jpg" }, 
		{charName:"Two Face", charImage:"assets/images/TwoFace.jpg" }, {charName:"Bane", charImage:"assets/images/Bane.jpg" }, {charName:"Poison Ivy", charImage:"assets/images/PoisonIvy.jpg" }  ]
	var healthList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(300-100 +1))+100); //character health ranges from 100 to 300
	var attackList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(50-10 +1))+10); // character attack ranges from 10 to 40
	var counterAttackList= Array.from({length: nameList.length}, () => Math.floor(Math.random()*(100-10 +1))+10); //character counter attack ranges from 10 to 100

	var newAttack;
	var baseAttack;

	var character = {};
	var roster = {};
//=========================================================================

//Function Declarations

	//This is used to randomize the character list
	function shuffle(a) {
    	for (let i = a.length; i; i--) {
       		let j = Math.floor(Math.random() * i);
       		[a[i - 1], a[j]] = [a[j], a[i - 1]];
    	}
	}
	
	//Build the characters 	
	function createCharacter(i){
		character[i] = {
			name: nameList[i].charName,
			image: nameList[i].charImage,
			health: healthList[i],
			attack: attackList[i],
			counterAttack: counterAttackList[i],
		};
	}

	//This builds the characters on the playing field. There can be anywhere from 4 to the maximum # of characters.
	function generateRoster(){

		var fighters=Math.floor(Math.random()*(nameList.length-4 +1)+4);

		for(i=0; i<fighters; i++){

			//create a button
			var characterButton = $("<button>");
			characterButton.attr("data-character_id", i);
			characterButton.addClass("characterBtn");

			//create the name label
			characterButton.append("<h4><span></span></h4>");

			//set the button image
			// characterButton.append("<img>");

			//create the health label
			characterButton.append("<h5><span></span></h5>");

			//add the button the the roster
			$(".roster").append(characterButton);		
		}

		for(i=0; i<fighters; i++){
			$(".characterBtn h4 span").addClass("name");
			// $(".characterBtn  img").addClass("image");
			$(".characterBtn h5 span").addClass("health");
		}

		$(".name").each(function(i){
			$(this).html(character[i].name);
		})

		$(".characterBtn").each(function(i){
			$(this).css("background", "url(" + character[i].image + ")");
		})
		// $(".image").each(function(i){
		// 	$(this).attr("src", character[i].image);
		// })

		$(".health").each(function(i){
			$(this).html(character[i].health);
		})
	}

	//This is for when we select a character
	function selectCharacter(){

		var a = $(".attacker").data("character_id");
		var d = $(".defender").data("character_id");


			if(!$("#currentCharacter").is(":empty") && !$("#defender").is(":empty")){
				var i = $(this).data("character_id");
				$(".gameLog").empty();
				$(".gameLog").append("The Arena is full!" + "<br>" + character[i].name + " is not able to fight!");
			}

			if($("#currentCharacter").is(":empty")){
				$(this).addClass("attacker");
				var i = $(this).data("character_id");
				$(this).children("h4").children("span").css("background", "rgba(0,110,0, 0.45)");  
				$(this).children("h5").children("span").css("background", "rgba(0,110,0, 0.45)");
				$("#currentCharacter").append(this);
				baseAttack = character[i].attack;
				$(this).prop("disabled",true);
				$(".gameLog").empty();

				if($("#defender").is(":empty")){
					$(".gameLog").append(character[i].name + " is waiting for a challenger!" +"<br>");
				}

				if(!$("#defender").is(":empty")){
					$(".gameLog").append(character[i].name + " has challenged " + character[d].name +"!<br>");
				}


			}

			else if($("#defender").is(":empty")){
				$(this).addClass("defender");
				var i = $(this).data("character_id");
				$(this).children("h4").children("span").css("background", "rgba(148,17,0, 0.45)");
				$(this).children("h5").children("span").css("background", "rgba(148,17,0, 0.45)");
				$("#defender").append(this);
				$(this).prop("disabled",true);
				$(".gameLog").empty();
				$(".gameLog").append(character[i].name + " has challenged " + character[a].name +"!<br>");
			}
	}

	//Player Attacks
	function attack(attacker, defender){
			if(character[defender].health >= 0){
				character[defender].health=Math.max(0, character[defender].health-character[attacker].attack);
			}

			$(".defender .health" ).html(character[defender].health);
			$(".gameLog").append(character[attacker].name + " attacks " + character[defender].name + " for " + character[attacker].attack + " damage." + "<br>");

			newAttack = character[attacker].attack+baseAttack;
	}

	//Defender Attacks
	function counterAttack(attacker, defender){
		if (character[attacker].health >= 0){
			character[attacker].health=Math.max(0, character[attacker].health-character[defender].counterAttack);
		}

		$(".attacker .health").html(character[attacker].health);
		$(".gameLog").append(character[defender].name + " attacks " + character[attacker].name + " for " + character[defender].counterAttack + " damage." + "<br>");
	}

	//This is how we fight (attack() and counterAttack() are run here)
	function battle(){

		var a = $(".attacker").data("character_id");
		var d = $(".defender").data("character_id");

		if(GameOver()){
			newGame();
		}

		$(".gameLog").empty();

		if($("#currentCharacter").is(":empty") && $("#defender").is(":empty")){	
			$(".gameLog").append("Choose a fighter!" + "<br>")
		}

		if(!$("#currentCharacter").is(":empty") && $("#defender").is(":empty")){
			$(".gameLog").append(character[a].name + " is waiting for a challenger!" + "<br>");
		}

		if($("#currentCharacter").is(":empty") && !$("#defender").is(":empty")){
			$(".gameLog").append(character[d].name + " is waiting for a challenger!" + "<br>");
		}

		else{
		
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

	//This is for when all lives are lost or all enemies are dead.
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

	//starts a new game
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

		shuffle(nameList);
		
		for (i=0; i<nameList.length; i++){
			createCharacter(i);
		}

		generateRoster();

		$("#attackBtn").html("FIGHT!");

		$(".characterBtn").on("click", selectCharacter);

		$("#attackBtn").on("click", battle);
	}
//=========================================================================
	console.log("# of char" + nameList.length);

	shuffle(nameList);
	
	for (i=0; i<nameList.length; i++){
		createCharacter(i);
	}

	generateRoster();

	$(".gameLog").append("Choose a fighter!" + "<br>");

	$(".characterBtn").on("click", selectCharacter);

	$("#attackBtn").on("click", battle);

	//=========================================================================

});
