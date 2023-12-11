// Function to get the seed from the URL or generate a random one
function getSeedFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('seed');
}

function generateRandomSeed() {
  return Math.floor(Math.random() * 1000000).toString();
}

// Initialize the seed
let seed = getSeedFromURL() || generateRandomSeed();

// Display the seed on the page
$('#seedDisplay').text(seed);

// Initialize the random number generator with the seed
let rng = new Math.seedrandom(seed);

// Loader
$(window).on('load', function () {
  setTimeout(function () {
      $('.loader').fadeOut();
  }, 4000);
});

// Characters
var allPics = [
                "student1.jpg", "student2.jpg", "student3.jpg", "student4.jpg", "student5.jpg", "student6.jpg", "student7.jpg", "student8.jpg", "student9.jpg", "student10.jpg", 
                "student11.jpg", "student12.jpg", "student13.jpg", "student14.jpg", "student15.jpg", "student16.jpg", "student17.jpg", "student18.jpg", "student19.jpg", 
                "student20.jpg", "student21.jpg", "student22.jpg", "student23.jpg", "student24.jpg", "student25.jpg", "student26.jpg", "student27.jpg", "student28.jpg", "student29.jpg", 
                "student30.jpg", "student31.jpg", "student32.jpg", "student33.jpg", "student34.jpg", "student35.jpg", "student36.jpg", "student37.jpg", "student38.jpg", "student39.jpg",
                "student40.jpg", "student41.jpg", "student42.jpg", "student43.jpg", "student44.jpg", "student45.jpg", "student46.jpg", "student47.jpg", "student48.jpg", "student49.jpg", 
                "student50.jpg", "student51.jpg", "student52.jpg", "student53.jpg", "student54.jpg", "student55.jpg", "student56.jpg", "student57.jpg", "student58.jpg", "student59.jpg",
                "student60.jpg"
              ];

// Second array for 5 random photos
var selectedPics = [];

// My Guess Who Character
function myCharacter() {
  // Generate a new seed for the current player's choice
  const playerSeed = generateRandomSeed();

  // Initialize a new RNG with the player's seed
  const playerRng = new Math.seedrandom(playerSeed);

  // Clone the array to avoid modifying the original
  var remainingPics = selectedPics.slice();

  // Remove the opponent's character from the available choices
  var opponentCharacterIndex = remainingPics.indexOf(opponentCharacter);
  if (opponentCharacterIndex !== -1) {
      remainingPics.splice(opponentCharacterIndex, 1);
  }

  // Choose a random character for the current player
  var myPicIndex = Math.floor(playerRng() * remainingPics.length);
  var myPic = remainingPics[myPicIndex];

  $("#me").html('<img src="img/' + myPic + '">');

  var name = myPic.substr(0, myPic.lastIndexOf("."));
  name = name.charAt(0).toUpperCase() + name.slice(1);
  $("#name").html('You are ' + name);
}

function displayRandomPhotos() {
  // Create a new array with all photos
  var allPicsCopy = allPics.slice();

  // Shuffle the new array to get a random order
  for (var i = allPicsCopy.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var temp = allPicsCopy[i];
      allPicsCopy[i] = allPicsCopy[j];
      allPicsCopy[j] = temp;
  }

  // Take the first 25 photos from the shuffled array
  selectedPics = allPicsCopy.slice(0, 25);

  for (var i = 0; i < selectedPics.length; i++) {
      // Create a container for each card
      var cardContainer = $('<div class="card-container">');

      // Append the image to the container
      cardContainer.append('<div class="card"><img src="img/' + selectedPics[i] + '"></div>');

      // Get the name from the filename
      var name = selectedPics[i].substr(0, selectedPics[i].lastIndexOf("."));
      name = name.charAt(0).toUpperCase() + name.slice(1);

      // Append the name below the image
      cardContainer.append('<div class="card-name">' + name + '</div>');

      // Append the container to the gameboard
      $("#gameboard").append(cardContainer);
  }
}

// Set the opponentCharacter before calling myCharacter()
var opponentCharacterIndex = Math.floor(rng() * selectedPics.length);
var opponentCharacter = selectedPics[opponentCharacterIndex];

// Call myCharacter after displayRandomPhotos to use one of the 5 random photos
displayRandomPhotos();
myCharacter();

$("#gameboard").on('click', '.card', function () {
  $(this).toggleClass("flipped");
});

// Game Tracker
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

// Reset Game Board
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

// Handle form submission
$(document).on('submit', '#roomCodeForm', function (event) {
  event.preventDefault();
  // Get the entered room code
  const enteredSeed = $('#roomCodeInput').val();
  // If the entered seed is valid, refresh the page with the new seed
  if (enteredSeed && !isNaN(enteredSeed)) {
      seed = enteredSeed;
      $('#seedDisplay').text(seed);
      rng = new Math.seedrandom(seed);
      // You can also update other elements or perform other actions if needed
      // For example, you might want to call functions like displayRandomPhotos() or myCharacter() again
      location.href = `?seed=${seed}`; // Reload the page with the updated seed in the URL
  }
});
