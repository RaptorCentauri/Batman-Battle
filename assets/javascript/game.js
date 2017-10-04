// Create character object. Each has the attributes name, image, health, attack, and counterAttack.
//player chooses a character
//player chooses a defender
// charcater attacks and do some math
//defender attacks and do some math,



$(document).ready(function() {

//Variable Declarations
	var nameList = ["Batman", "Joker", "Red Hood", "Robin"];
	var imageList = ["assets/images/Batman.jpg", "assets/images/Joker.jpg", "assets/images/Redhood.jpg", "assets/images/Robin.jpg"];
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
			name: nameList[i],
			image: imageList[i],
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
		console.log(character[attacker].name + " attacks " + character[defender].name + " for " + character[attacker].attack + " damage.");

		newAttack = character[attacker].attack+baseAttack;
	}

	function counterAttack(attacker, defender){
		if (character[attacker].health >= 0){
			character[attacker].health=Math.max(0, character[attacker].health-character[defender].counterAttack);
		}

		$(".attacker .health").html(character[attacker].health);
		console.log(character[defender].name + " attacks " + character[attacker].name + " for " + character[defender].counterAttack + " damage.");
	}

	function selectCharacter(){

			if($("#currentCharacter").is(":empty")){
				$(this).addClass("attacker");
				var i = $(this).data("character_id");
				$("#currentCharacter").append(this);
				baseAttack = character[i].attack;
				console.log("Player character  is: " + character[i].name);
			}

			else{
				$(this).addClass("defender");
				var i = $(this).data("character_id");
				$("#defender").append(this);
				console.log("Enemy character  is: " + character[i].name);
			}
	}

	function battle(){

		if($("#currentCharacter").is(":empty")){	
			console.log("Choose a fighter!");
		}

		if($("#defender").is(":empty")){	
			console.log("There are no enemies here!");
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
				console.log(character[d].name + " has defeated " + character[a].name);
				$("#currentCharacter").empty();
			}

			if(character[a].health<=0 && $(".roster").is(":empty")){
				console.log("You have no fighters left! Game Over!");
			}

			if(character[d].health<=0){
				console.log(character[a].name + " has defeated " + character[d].name);
				$("#defender").empty();
			}

			if(character[d].health<=0 && $(".roster").is(":empty")){
				console.log("You have defeated all enemies! You Win!");
			}
		}
	}
//=========================================================================


//Gameplay
	for (i=0; i<nameList.length; i++){
		createCharacter(i);
	}

	generateRoster();

	$(".characterBtn").on("click", selectCharacter);

	$("#attackBtn").on("click", battle);
//=========================================================================

});






