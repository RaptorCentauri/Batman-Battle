// Create character object. Each has the attributes name, image, health, attack, and counterAttack.
//player chooses a character
//player chooses a defender
// charcater attacks and do some math
//defender attacks and do some math,



$(document).ready(function() {


var character = {
	name: ["Batman", "Joker", "Red Hood", "Robin"],
	image: ["assets/images/Batman.jpg", "assets/images/Joker.jpg", "assets/images/Redhood.jpg", "assets/images/Robin.jpg"],
	health: Array.from({length: 4}, () => Math.floor(Math.random()*(250-100 +1))+100),
	attack: Math.floor(Math.random()*(50-10 +1))+10,
	counterAttack: Math.floor(Math.random()*(50-10 +1))+10,
};


// Array.from({length: character.name.length}, () => Math.floor(Math.random()*(250-100 +1))+100);

// $.each(obj, function (index, value) {
//   console.log(value);
// });

function generateRoster(){

	for(i=0; i<character.name.length; i++){

			console.log("start: " + i);

			//create a button
			var characterButton = $("<button>");
			characterButton.addClass("characterBtn");
			characterButton.attr("data-name", character.name[i]);

			//create the name label
			characterButton.append("<h4><span></span></h4>");
			$(".characterBtn h4 span").addClass("name");
			console.log(character.name[i]);

			//set the button image
			characterButton.append("<img>");
			$(".characterBtn  img").addClass("image");
			console.log(character.image[i]);

			//create the health label
			characterButton.append("<h5><span></span></h5>");
			$(".characterBtn h5 span").addClass("health");

			//add the button the the roster

			$(".roster").append(characterButton);
			console.log("end: " + i);
			console.log("==============================================");

	}

	$(".name").each(function(i){
		$(this).html(character.name[i]);
	})

	$(".image").each(function(i){
		$(this).attr("src", character.image[i]);
	})

	$(".health").each(function(i){
		$(this).html(character.health[i]);
	})


	$(".characterBtn").on("click", function(){

		if($("#currentCharacter").is(":empty")){
		$("#currentCharacter").append(this);
		}

		else{
			$("#defender").append(this);
		}

	});

}






// $(".characterBtn").on("click", function(){

// 	$("#currentCharacter").append(characterButton);

// });
	
generateRoster();




});



// function generateCharacters(){

// for(i=0; i++; i<character.name.length){
// 	myName = character.name[Math.floor(Math.random()*character.name.length)];

// 	$(".name").html(character.name[character.name.indexOf(myName)]);
// 	$(".health").html(character.health);
// 	$(".image").attr("src", character.image[character.name.indexOf(myName)]);
// 	}
// }