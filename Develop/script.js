// Global variables for character sets
let lowercaseCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
  "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let uppercaseCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
  "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let specialCharacters = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
  ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];
//
// Generate a password that obeys a set of requirements
//
let generatePassword = function () {
  // Set object for requirements
  let requirements = {
    length: 0,
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false,
    atLeastOneSelected: function () { // Make sure at least one character type is selected
      if (this.lowercase || this.uppercase || this.numeric || this.special) {
        return true;
      }
      else {
        return false;
      }
    }
  };

  // Gather requirements from user prompts 
  gatherRequirements(requirements);

  // Create password based on requirements
  let password = createPasswordBasedOnRequirements(requirements);

  // Return generated password
  console.log(requirements.atLeastOneSelected());
};

//
// Gather requirements from user prompts and record requirements in a "requirements" object that is passed by reference
//
let gatherRequirements = function (requirements) {
  // Ask user for password length
  let passwordLength = window.prompt("How many characters should your password be (8-128 characters?");
  passwordLength = parseInt(passwordLength);

  // Get character requirements for password 
  // Keep asking if the user doesn't select at least one character requirement
  do {
    // If the password length entered is within the parameters of 8 to 128 characters, inclusive
    if ((passwordLength >= 8) && (passwordLength <= 128)) {
      requirements.length = passwordLength;

      // Collect requirements regarding what types of characters must be included
      requirements.lowercase = window.confirm("Should the password include lowercase characters?");
      requirements.uppercase = window.confirm("Should the password include uppercase characters?");
      requirements.numeric = window.confirm("Should the password include numeric characters?");
      requirements.special = window.confirm("Should the password include special characters?");
    }
    // Password length not valid, allow user to enter it, again
    else {
      alert("Please enter a number between 8 and 128, inclusive.");
      gatherRequirements(requirements);
    }

    // Make sure the user selected at least one character requirement
    if (!requirements.atLeastOneSelected()) {
      alert("At least one type of character must be selected. Please try again.");
    }
  } while (!requirements.atLeastOneSelected());
};

//
// Generate password based on requirements
// Password must include at least one required character
//
let createPasswordBasedOnRequirements = function (requirements) {
  // Store createPassword
  let createdPassword = "";

  // Track requirements to make sure each are met
  let requirementsTracker = {
  };
  let listOfCharacterRequirements = []; // list which character requirements are needed
  let characterArrays = []; // List of allowed characters

  if (requirements.lowercase) {
    requirementsTracker.lowercase = 0;
    listOfCharacterRequirements.push("lowercase");
    characterArrays.push(lowercaseCharacters);
  }
  if (requirements.uppercase) {
    requirementsTracker.uppercase = 0;
    listOfCharacterRequirements.push("uppercase");
    characterArrays.push(uppercaseCharacters);
  }
  if (requirements.numeric) {
    requirementsTracker.numeric = 0;
    listOfCharacterRequirements.push("numeric");
    characterArrays.push(numericCharacters);
  }
  if (requirements.special) {
    requirementsTracker.special = 0;
    listOfCharacterRequirements.push("special");
    characterArrays.push(specialCharacters);
  }

  // Create a password of the required length
  for (let i = 0; i < requirements.length; i++) {
    let randomRequirementIndex = Math.floor(Math.random() * listOfCharacterRequirements.length);
    let randomCharacterIndex = Math.floor(Math.random() * characterArrays[randomRequirementIndex].length);

    requirementsTracker[listOfCharacterRequirements[randomRequirementIndex]]++;
    console.log("Increased " + listOfCharacterRequirements[randomRequirementIndex] + " to " + requirementsTracker[listOfCharacterRequirements[randomRequirementIndex]]);
    createdPassword += characterArrays[randomRequirementIndex][randomCharacterIndex];
  }

  var lc = "lowercase";
  console.log("Tracking: " + JSON.stringify(requirementsTracker));
  eval("console.log(requirementsTracker." + lc + ");");
  console.log(createdPassword);
  return createdPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//
// Write password to the #password input
//
let writePassword = function () {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
