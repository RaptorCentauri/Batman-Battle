// Create character object. Each has the attributes name, image, health, attack, and counterAttack.
//player chooses a character
//player chooses a defender
// charcater attacks and do some math
//defender attacks and do some math,



$(document).ready(function() {



function generateCharacters(){

for(i=0; i<character.name.length; i++){
	// myName = character.name[Math.floor(Math.random()*character.name.length)];
	var characterButton = $("<button>");

	characterButton.addClass("characterBtn");

	characterButton.append("<h4><span></span></h4>");

	$(".characterBtn h4 span").addClass("name");

	characterButton.append("<img>");

	$(".characterBtn  img").addClass("image");

	characterButton.append("<h5><span></span></h5>");

	$(".characterBtn h5 span").addClass("health");

	$(".roster").append(characterButton);


	$(".name").html(character.name[i]);
	$(".health").html(character.health);
	$(".image").attr("src", character.image[i]);

	
	}
}

var character = {
	name: ["Batman", "Joker", "Red Hood", "Robin"],
	image: ["assets/images/Batman.jpg", "assets/images/Joker.jpg", "assets/images/Redhood.jpg", "assets/images/Robin.jpg"],
	health: Math.floor(Math.random()*(250-100 +1))+100,
	attack: Math.floor(Math.random()*(50-10 +1))+10,
	counterAttack: Math.floor(Math.random()*(50-10 +1))+10,
};


generateCharacters();



});



// function generateCharacters(){

// for(i=0; i++; i<character.name.length){
// 	myName = character.name[Math.floor(Math.random()*character.name.length)];

// 	$(".name").html(character.name[character.name.indexOf(myName)]);
// 	$(".health").html(character.health);
// 	$(".image").attr("src", character.image[character.name.indexOf(myName)]);
// 	}
// }