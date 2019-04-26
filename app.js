"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch (searchType) {
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(foundPerson, people);
      break;
    case 'no':
      promptFor("Do you know the traits of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
      foundPerson = searchByTrait(people);
      mainMenu(foundPerson, people)
      break;
    default:
      app(people); // restart app
      break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

    if (!person) {
        alert("Could not find that individual.");
        return app(people); // restart
    }

  var displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  let currentYear = new Date().getFullYear();
    let dobSpl = person[0].dob.split('/');
    let age = dobSpl.splice(0, 2) - currentYear;
        
    }
    console.log(age);
    
  switch (displayOption) {
    case "info":
      alert(person[0].firstName + " is a " + person[0].gender + ", who is " + age + " years old , and is " + person[0].height + " tall")
      break;
    case "family":

      if (person.spouse != null) {
        alert(person[0].firstName + " has a spouse with the id of " + person[0].spouse + ", and parents with the id's of " + person[0].parents[0] + " and " + person[0].parents[1])
      } else {
        alert(person[0].firstName + " has no spouse :'(");

      }
      break;
    case "descendants":
      let descendantArray = [];
      let descendantString = descendantArray.join("");

      findDescendants(person, people.length)
      function findDescendants(person, count) {
        if (count > 0) {
          if (people[count].parents.length > 0) {
            if (people[count].parents[0] == person.id || people[count].parents[1] == person.id) {
              descendantArray.push(people[count].id)
              return getName(people[count].id, count - 1)
            }
          }
        }
      }

      alert(person.name + " has " + descendantArray.length + " descendants. (" + descendantString + " )")
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      break; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
    var firstName = promptFor("What is the person's first name?", chars);
  
    var lastName = promptFor("What is the person's last name?", chars);
  
  var foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByTrait(people) {
  let chooseTraitOne = promptFor("What is persons the first trait you know? (gender, dob, height, weight, eyecolor, or occupation)", chars)
  let chooseTraitTwo = promptFor("What is persons the second trait you know? (gender, dob, height, weight, eyecolor, or occupation)", chars)
  let firstTrait;
  let secondTrait;

  switch (chooseTraitOne) {
    case "gender":
      firstTrait = promptFor("What is the persons gender?", chars)
      break;
    case "dob":
      firstTrait = promptFor("What is the persons date of birth?", chars)
      break;
    case "height":
      firstTrait = promptFor("What is the persons height?", chars)
      break;
    case "weight":
      firstTrait = promptFor("What is the persons weight?", chars)
      break;
    case "eyeColor":
      firstTrait = promptFor("What is the persons eye color?", chars)
      break;
    case "occupation":
      firstTrait = promptFor("What is the persons occupation?", chars)
      break;
    default:
      return "not a valid input";
  }

  switch (chooseTraitTwo) {
    case firstTrait:
      alert("You've already chosen this trait")
    case "gender":
      secondTrait = promptFor("What is the persons gender?", chars)
      break;
    case "dob":
      secondTrait = promptFor("What is the persons date of birth?", chars)
      break;
    case "height":
      secondTrait = promptFor("What is the persons height?", chars)
      break;
    case "weight":
      secondTrait = promptFor("What is the persons weight?", chars)
      break;
    case "eyeColor":
      secondTrait = promptFor("What is the persons eye color?", chars)
      break;
    case "occupation":
      secondTrait = promptFor("What is the persons occupation?", chars)
      break;
    default:
      alert("Not a valid input, restarting program :)");
      return app(people);
  }

  var foundTrait = people.filter(function (person) {
    if (person.gender === firstTrait && person.occupation === secondTrait) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundTrait;
}


// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}



function familyFinder(people) {
  let idTransform = people.filter(function (person) {
    if (person.gender === firstTrait && person.occupation === secondTrait) {
      return true;
    }
    else {
      return false;
    }
  })
}

