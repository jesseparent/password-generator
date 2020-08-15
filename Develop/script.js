// Global variables for password length requirements
const minPasswordLength = 8;
const maxPasswordLength = 128;

// Global variables for character sets
const lowercaseCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
  "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercaseCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
  "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialCharacters = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
  ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];
//
// Generate a password that obeys a set of requirements
//
let generatePassword = function () {
  // Set object for requirements
  const requirements = {
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
  const password = createPasswordBasedOnRequirements(requirements);

  // Return generated password
  return password;
};

//
// Gather requirements from user prompts and record requirements in a "requirements" object that is passed by reference
//
let gatherRequirements = function (requirements) {
  // Ask user for password length
  let passwordLength = window.prompt("How many characters should your password be (" + minPasswordLength + "-" + maxPasswordLength + ") characters?");
  passwordLength = parseInt(passwordLength);

  // Get character requirements for password 
  // Keep asking if the user doesn't select at least one character requirement
  do {
    // If the password length entered is within the parameters of minPasswordLength to maxPasswordLength characters, inclusive
    if ((passwordLength >= minPasswordLength) && (passwordLength <= maxPasswordLength)) {
      requirements.length = passwordLength;

      // Collect requirements regarding what types of characters must be included
      requirements.lowercase = window.confirm("Should the password include lowercase characters?");
      requirements.uppercase = window.confirm("Should the password include uppercase characters?");
      requirements.numeric = window.confirm("Should the password include numeric characters?");
      requirements.special = window.confirm("Should the password include special characters?");
    }
    // Password length not valid, allow user to enter it, again
    // Call the function recursively so we don't fall to the if statement, below
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
  let requirementsTracker = {}; // Count of each character type so we can make sure each requirement is met
  let listOfCharacterRequirements = []; // List of which character requirements are needed
  let characterArrays = []; // List of allowed characters for password generation - two dimensional array

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

  let allRequirementsNotMet = true;

  // Create a password of the required length
  for (let i = 0; i < requirements.length; i++) {
    // Look at all the required character types and pick one
    let randomRequirementIndex = Math.floor(Math.random() * listOfCharacterRequirements.length);

    // If we are getting close to completing the password, make sure all the requirements have been met
    // and if we find a required character type that is still not picked, use a character from that requirement
    let nearTheEnd = listOfCharacterRequirements.length > (requirements.length - i);
    if (nearTheEnd && allRequirementsNotMet) {
      console.log("----\nnear the end");
      allRequirementsNotMet = false; // If we don't find a problem, all the required character types have been used. No need to check, again
      for (let requirement in requirementsTracker) {
        if (requirementsTracker[requirement] === 0) {
          allRequirementsNotMet = true; // Found a problem, so we will need to check again on the next run
          console.log(requirement + " is still at 0. Use that.");
          console.log(requirement + " is at index " + listOfCharacterRequirements.indexOf(requirement));
          randomRequirementIndex = listOfCharacterRequirements.indexOf(requirement);
          break;
        }
      }
    }

    // Pick a random character from the selected character type list
    let randomCharacterIndex = Math.floor(Math.random() * characterArrays[randomRequirementIndex].length);

    // Keep track of how many of which character type was used
    requirementsTracker[listOfCharacterRequirements[randomRequirementIndex]]++;

    // Add the character to the end of the password
    createdPassword += characterArrays[randomRequirementIndex][randomCharacterIndex];
  }

  // Return the created password
  return createdPassword;
}

// Get references to the #generate element
const generateBtn = document.querySelector("#generate");

//
// Write password to the #password input
//
let writePassword = function () {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
