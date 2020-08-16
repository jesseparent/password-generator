# Password Generation in Javascript
## Table of Contents
- [Summary](#summary)
- [Javascript Changes](#javascript-changes)
- [Deployed Application](#deployed-application)
- [Screenshot](#screenshot)

## Summary
In this project, existing code provided as a skeleton to generate a password.  The final code had to:
1. Ask the user for a password length of 8 to 128, inclusive
2. Ask the user what character types had to be in the password: lowercase, uppercase, numbers, and/or symbols
3. Verify the password length was valid and at least one character type was chosen
4. Produced a password that matched all the selected criteria and display it to the user

## Javascript Changes
- Added global variables for each set of character types
- Added global variables to set minimum and maximum password length
- Used an object to track the user's requirements
- Gathered, validated, and sanitized requirements from the user
- Required the user to re-enter data if it was not valid
- Created a password based on length and required character types
- Checked that all required character types were used
- Moved all code from Develop folder to root folder
- Organized assets into their own folders

## Deployed Application
- The web page can be found at [https://jesseparent.github.io/password-generator/](https://jesseparent.github.io/password-generator/)

## Screenshot
- The screenshot of the final work: ![Image](./screenshot.jpg)