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
  let requirements = {
    length: 0,
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false,
    // Returns whether at least one character type is selected
    atLeastOneSelected: function () {
      if (this.lowercase || this.uppercase || this.numeric || this.special) {
        return true;
      }
      else {
        return false;
      }
    }
  };

  // Gather password requirements from user prompts 
  gatherRequirements(requirements);

  // Create password based on requirements
  let password = createPasswordBasedOnRequirements(requirements);

  // Return generated password
  return password;
};

//
// Gather requirements from user prompts and record requirements in a "requirements" object that is passed by reference
//  into this function as a parameter
//
let gatherRequirements = function (requirements) {
  let passwordLength = 0;

  // Ask user for password length
  // If password length not valid, allow user to enter it, again
  do {
    passwordLength = window.prompt("How many characters should your password be (" + minPasswordLength + "-" + maxPasswordLength + ")?");
    passwordLength = parseInt(passwordLength);

    // If this is NaN or has an invalid length, enter again
    if (!passwordLength || !((passwordLength >= minPasswordLength) && (passwordLength <= maxPasswordLength))) {
      alert("Please enter a valid password length.");
    }
  } while (!passwordLength || !((passwordLength >= minPasswordLength) && (passwordLength <= maxPasswordLength)));

  // Success! Password length entered is within the parameters of minPasswordLength to maxPasswordLength characters, inclusive
  requirements.length = passwordLength;

  // Get character type requirements for password 
  // Keep asking if the user doesn't select at least one character requirement
  do {
    // Collect requirements regarding what types of characters must be included
    requirements.lowercase = window.confirm("Should the password include lowercase characters?");
    requirements.uppercase = window.confirm("Should the password include uppercase characters?");
    requirements.numeric = window.confirm("Should the password include numeric characters?");
    requirements.special = window.confirm("Should the password include special characters?");

    // Make sure the user selected at least one character requirement
    if (!requirements.atLeastOneSelected()) {
      alert("At least one type of character must be selected. Please try again.");
    }
  } while (!requirements.atLeastOneSelected());
};

//
// Generate password based on requirements
// Password must include at least one character of each required character type
//
let createPasswordBasedOnRequirements = function (requirements) {
  // Keep track of created password
  let createdPassword = "";

  // Track character type requirements to make sure each are met
  let requirementsTracker = {}; // Tracks whether each required character type has been used
  let listOfCharacterRequirements = []; // List of which character type requirements are needed
  let characterArrays = []; // List of allowed characters for password generation - two dimensional array

  // Populate the structures needed to track and fulfill requirements
  trackRequirements(requirements, requirementsTracker, listOfCharacterRequirements, characterArrays);

  // Keep track or whether all required character types have been used
  let allRequirementsNotMet = true;

  // Create a password of the required length
  for (let i = 0; i < requirements.length; i++) {
    // Look at all the required character types and pick one
    let randomRequirementIndex = Math.floor(Math.random() * listOfCharacterRequirements.length);

    // If we are getting close to completing the password, make sure all the requirements have been met
    // and if we find a required character type that is still not picked, use a character from that requirement
    let nearTheEnd = listOfCharacterRequirements.length > (requirements.length - i);

    if (nearTheEnd && allRequirementsNotMet) {
      // If we don't find a problem, all the required character types have been used. No need to check, again
      allRequirementsNotMet = false;

      // Look for any required character types that haven't been used yet
      for (let requirement in requirementsTracker) {
        if (!requirementsTracker[requirement]) {
          // Found a problem, so fix this one we will check for more problems on the next run
          allRequirementsNotMet = true;

          // Include a character from this character type in the password
          randomRequirementIndex = listOfCharacterRequirements.indexOf(requirement);

          // Break out of loop so we can fix this problem. If there are others we will loop, again, later
          break;
        }
      }
    }

    // Pick a random character from the selected character type list
    let randomCharacterIndex = Math.floor(Math.random() * characterArrays[randomRequirementIndex].length);

    // Keep track of whether a character type was used
    requirementsTracker[listOfCharacterRequirements[randomRequirementIndex]] = true;

    // Add the character to the end of the password
    createdPassword += characterArrays[randomRequirementIndex][randomCharacterIndex];
  }

  // Return the created password
  return createdPassword;
};

//
// Keep track of all the required character types needed
// All objects and arrays are passed by reference
//
let trackRequirements = function (requirements, requirementsTracker, listOfCharacterRequirements, characterArrays) {
  if (requirements.lowercase) {
    requirementsTracker.lowercase = false;
    listOfCharacterRequirements.push("lowercase");
    characterArrays.push(lowercaseCharacters);
  }
  if (requirements.uppercase) {
    requirementsTracker.uppercase = false;
    listOfCharacterRequirements.push("uppercase");
    characterArrays.push(uppercaseCharacters);
  }
  if (requirements.numeric) {
    requirementsTracker.numeric = false;
    listOfCharacterRequirements.push("numeric");
    characterArrays.push(numericCharacters);
  }
  if (requirements.special) {
    requirementsTracker.special = false;
    listOfCharacterRequirements.push("special");
    characterArrays.push(specialCharacters);
  }
};

// Get references to the #generate element
const generateBtn = document.querySelector("#generate");

//
// Write password to the #password input
//
let writePassword = function () {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
