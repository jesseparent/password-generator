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
    special: false
  };

  // Gather requirements from user prompts 
  gatherRequirements(requirements);
  
  console.log(requirements);
};

//
// Gather requirements from user prompts and record requirements in a "requirements" object that is passed by reference
//
let gatherRequirements = function (requirements) {
  // Ask user for password length
  let passwordLength = window.prompt("How many characters should your password be (8-128 characters?");
  passwordLength = parseInt(passwordLength);

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
};

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
