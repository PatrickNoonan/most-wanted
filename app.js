"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people) {
  let displayPeopleOption = promptFor("Would you like to see a list of available names? Enter 'yes' or 'no'", yesNo).toLowerCase();
  if (displayPeopleOption == "yes"){
  displayPeople(people);
  }
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch (searchType) {
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(foundPerson, people);
      break;
    case 'no':
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


    if (!person[0]) {
        alert("Could not find that individual.");
        return app(people); // restart
    }
    if (person.length > 1) {
        alert("More than one person was found with these traits. The list of people that match these traits are ")
        for (let i = 0; i < person.length; i++) {
            alert(person[i].firstName + ' ' + person[i].lastName);
        };
        return app(people);

    }
    var displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', 'immediate family', or 'descendants'? Type the option you want or 'restart' or 'quit'",chars);
    let currentYear = new Date().getFullYear();

    let justYear = person[0].dob.split('/');
    let age = currentYear - justYear[2];






    switch (displayOption) {
        case "immediate family":
            //checks for parents of person and gives name
            let immedParentsArray = people.filter(function (el) {
                if (el.id == person[0].parents[0] || el.id == person[0].parents[1]) {
                    return true;
                } else {
                    return false
                }
            });
                    if (immedParentsArray.length > 0){
                        for (let i = 0; i < immedParentsArray.length; i++) {
                            alert(immedParentsArray[i].firstName + " " + immedParentsArray[i].lastName + " is the parent of " + person[0].firstName + " " + person[0].lastName + ".")
                            }
                        } else { alert(person[0] + " has no surviving parents.")};
                
            


            //checks for children of person and gives name
            let immedChildrenArray = people.filter(function (el) {
                if (el.parents[0] == person[0].id || el.parents[1] == person[0].id) {
                    return true;
                } else {
                    return false
                }
            });
                if (immedChildrenArray.length > 0) {
                    for (let i = 0; i < immedChildrenArray.length; i++) {
                        alert(immedChildrenArray[i].firstName + " " + immedChildrenArray[i].lastName + " is the child of " + person[0].firstName + " " + person[0].lastName + ".")
                    }
                    } else { alert(person[0] + " has no surviving children." )}
            

            //checks for spouse of person and gives name
            let immedSpouseArray = people.filter(function (el) {
                if (el.spouse == person[0].id) {
                    return true;
                } else {
                    return false
                }
            }); if (immedSpouseArray.length > 0) {
                    for (let i = 0; i < immedChildrenArray.length; i++) {
                        alert(immedSpouseArray[i].firstName + " " + immedSpouseArray[i].lastName + " is the spouse of " + person[0].firstName + " " + person[0].lastName + ".")
                    }
                } else { alert(person[0] + " has no surviving spouses.") }
            
            
            
         break;

    case "info":
      alert(person[0].firstName + person[0].lastName + " is a " + person[0].gender + ", who is " + age + " years old , and is " + person[0].height + " inches tall, aswell as an eye color of " + person[0].eyeColor + " and a weight of " + person[0].weight);
      break;
    case "family":

      if (person[0].currentSpouse != null && person[0].parents.length == 2) {
        alert(person[0].firstName + " " + person[0].lastName + " has a spouse with the id of " + person[0].currentSpouse + ", and parents with the id's of " + person[0].parents[0] + " and " + person[0].parents[1]);
      } else if (person[0].currentSpouse != null && person[0].parents.length == 1) {
        alert(person[0].firstName + " " + person[0].lastName + " has a spouse with the id of " + person[0].currentSpouse + ", and a parent with the id of " + person[0].parents[0]);
      } else if (person[0].currentSpouse != null && person[0].parents.length == 0) {
        alert(person[0].firstName + " " + person[0].lastName + " has a spouse with the id of " + person[0].currentSpouse + ", and the parents are unknown");
      } else if (person[0].currentSpouse == null && person[0].parents.length == 2) {
        alert(person[0].firstName + " " + person[0].lastName + " has parents with the id's of " + person[0].parents[0] + " and " + person[0].parents[1] + ", but has no spouse :( poor " + person[0].firstName + ".");
      } else if (person[0].currentSpouse == null && person[0].parents.length == 1) {
        alert(person[0].firstName + " " + person[0].lastName + " has parents with the id's of " + person[0].parents[0] + ", but has no spouse :( poor " + person[0].firstName + ".");
      } else if (person[0].currentSpouse == null && person[0].parents.length == 0) {
        alert(person[0].firstName + " " + person[0].lastName + " has unknown parents, and has no spouse. :( Poor " + person[0].firstName + ".");
      }
      break;
    case "descendants":
      let peopleToCheck = [person[0]];
      let allDescendants = [];

      findChildren(peopleToCheck[0], peopleToCheck.length);

      function findChildren(personChecking, count) {

        if (count > 0) {

          let childrenArray = people.filter(function (el) {
            if (el.parents[0] == personChecking.id || el.parents[1] == personChecking.id) {
              return true;
            } else {
              return false;
            }
          });

          for (let i = 0; i < childrenArray.length; i++) {
            peopleToCheck.push(childrenArray[i])
          }

          allDescendants.push(personChecking.firstName + " " + personChecking.lastName);
          count = peopleToCheck.length;
          peopleToCheck.shift();

          return findChildren(peopleToCheck[0], count - 1);
        } else {
          alert(allDescendants[0] + "'s family tree is: " + allDescendants.join(", ") + ".");
        }
      }
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {

  var firstName = promptFor("What is the person's first name?", chars);
    firstName = justCapsFirst(firstName);
  var lastName = promptFor("What is the person's last name?", chars);
    lastName = justCapsFirst(lastName);

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
    chooseTraitOne = justLow(chooseTraitOne)
    
    let chooseTraitTwo = promptFor("What is persons the second trait you know? (gender, dob, height, weight, eyecolor, or occupation)", chars)
    chooseTraitTwo = justLow(chooseTraitTwo)
    
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
    case "eyecolor":
      firstTrait = promptFor("What is the persons eye color?", chars)
          
          firstTrait = capC(firstTrait);
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
          
          secondTrait = capC(secondTrait);
          break;
    case "occupation":
      secondTrait = promptFor("What is the persons occupation?", chars)
          break;
    default:
      alert("Not a valid input, restarting program :)");
      return app(people);
  }

  var foundTrait = people.filter(function (person) {
    if (person[chooseTraitOne] === firstTrait && person[chooseTraitTwo] === secondTrait) {
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
  //seems unnecessary?
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  //personInfo += "Age: " + person.age + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";

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
  if (input.match(/^[a-z0-9\/]+$/i)) {
    return true; // default validation only
  } else {
    let invalidCharSwitch = prompt("You have entered invalid characters, would you like to try again? (yes = try again, no = restart program)")
    switch (invalidCharSwitch) {
      case 'no':
        app(people); // restart app
        break;
      case 'yes':
        return;
      default:
        app(people); // restart app
        break;
    }
  }
}

function justCapsFirst(input) {
    let justLow = input.toLowerCase()
    let firstCap = justLow.charAt(0).toUpperCase() + justLow.slice(1);
    return firstCap;
};


function capC(input) {
    let split = input.split('');
    split.splice(3, 1, 'C')
    let joined = split.join('');
    return joined
}

function justLow(input) {
    let lowC =  input.toLowerCase()
    if (lowC === "eyecolor") {
        return capC(lowC)
    } else {
        return lowC
    }
}