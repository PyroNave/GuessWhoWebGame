function getSeedFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('seed');
}

function generateRandomSeed() {
  return Math.floor(Math.random() * 1000000).toString();
}

let seed = getSeedFromURL() || generateRandomSeed();


$('#seedDisplay').text(seed);


let rng = new Math.seedrandom(seed);


$(window).on('load', function () {
  setTimeout(function () {
      $('.loader').fadeOut();
  }, 4000);
});


var allPics = [
                "student1.jpg", "student2.jpg", "student3.jpg", "student4.jpg", "student5.jpg", "student6.jpg", "student7.jpg", "student8.jpg", "student9.jpg", "student10.jpg", 
                "student11.jpg", "student12.jpg", "student13.jpg", "student14.jpg", "student15.jpg", "student16.jpg", "student17.jpg", "student18.jpg", "student19.jpg", 
                "student20.jpg", "student21.jpg", "student22.jpg", "student23.jpg", "student24.jpg", "student25.jpg", "student26.jpg", "student27.jpg", "student28.jpg", "student29.jpg", 
                "student30.jpg", "student31.jpg", "student32.jpg", "student33.jpg", "student34.jpg", "student35.jpg", "student36.jpg", "student37.jpg", "student38.jpg", "student39.jpg",
                "student40.jpg", "student41.jpg", "student42.jpg", "student43.jpg", "student44.jpg", "student45.jpg", "student46.jpg", "student47.jpg", "student48.jpg", "student49.jpg", 
                "student50.jpg", "student51.jpg", "student52.jpg", "student53.jpg", "student54.jpg", "student55.jpg", "student56.jpg", "student57.jpg", "student58.jpg", "student59.jpg",
                "student60.jpg"
              ];


var selectedPics = [];


function myCharacter() {

  const playerSeed = generateRandomSeed();


  const playerRng = new Math.seedrandom(playerSeed);


  var remainingPics = selectedPics.slice();


  var opponentCharacterIndex = remainingPics.indexOf(opponentCharacter);
  if (opponentCharacterIndex !== -1) {
      remainingPics.splice(opponentCharacterIndex, 1);
  }


  var myPicIndex = Math.floor(playerRng() * remainingPics.length);
  var myPic = remainingPics[myPicIndex];

  $("#me").html('<img src="img/' + myPic + '">');

  var name = myPic.substr(0, myPic.lastIndexOf("."));
  name = name.charAt(0).toUpperCase() + name.slice(1);
  $("#name").html('You are ' + name);
}

function displayRandomPhotos() {

  var allPicsCopy = allPics.slice();


  for (var i = allPicsCopy.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var temp = allPicsCopy[i];
      allPicsCopy[i] = allPicsCopy[j];
      allPicsCopy[j] = temp;
  }


  selectedPics = allPicsCopy.slice(0, 25);

  for (var i = 0; i < selectedPics.length; i++) {

      var cardContainer = $('<div class="card-container">');


      cardContainer.append('<div class="card"><img src="img/' + selectedPics[i] + '"></div>');


      var name = selectedPics[i].substr(0, selectedPics[i].lastIndexOf("."));
      name = name.charAt(0).toUpperCase() + name.slice(1);


      cardContainer.append('<div class="card-name">' + name + '</div>');


      $("#gameboard").append(cardContainer);
  }
}


var opponentCharacterIndex = Math.floor(rng() * selectedPics.length);
var opponentCharacter = selectedPics[opponentCharacterIndex];


displayRandomPhotos();
myCharacter();

$("#gameboard").on('click', '.card', function () {
  $(this).toggleClass("flipped");
});


var win = 0;
var loss = 0;

$('#score').html(win + ' - ' + loss);

function updateScore(win, loss) {
  $('#score').html(win + ' - ' + loss);
}

$('#win').click(function () {
  win += 1;
  updateScore(win, loss);
  reset();
});

$('#loss').click(function () {
  loss += 1;
  updateScore(win, loss);
  reset();
});


function reset() {
  var play = confirm('Do you want to play again?');
  if (play == true) {
      $('#gameboard').html('');
      selectedPics = [];
      displayRandomPhotos();
      myCharacter();
  } else {
      alert('Thanks for playing!');
  }
}


$(document).on('submit', '#roomCodeForm', function (event) {
  event.preventDefault();

  const enteredSeed = $('#roomCodeInput').val();

  if (enteredSeed && !isNaN(enteredSeed)) {
      seed = enteredSeed;
      $('#seedDisplay').text(seed);
      rng = new Math.seedrandom(seed);

      location.href = `?seed=${seed}`;
  }
});
