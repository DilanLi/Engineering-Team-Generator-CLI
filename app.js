const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,

//start by creating a deafault team manager
createManager();
const teamMembers = [];
const idNumbers = [];


//function to create manager
function createManager(){
    console.log("Let's build your team!")
inquirer
  .prompt([
    {
      type: "input",
      message: "What is your team manager's name?",
      name: "name"
    },
    {
      type: "input",
      message: "What is your manager's id?",
      name: "id"
    //   validate: function (answer) {
    //       if (typeof answer === number) {
    //         console.log("is number");
    //         return true;
    //     } else {
    //         console.log("Please make sure your id is a number.")
    //         return false;
    //     }
    // }
  },

    {
      type: "input",
      message: "What is your manager's email?",
      name: "email",
      validate: function (email) {
  
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if (valid) {
            return true;
        } else {
            console.log("  Please enter a valid email")
            return false;
        }
    }
    },
    
    {
      type: "input",
      message: "What is your manager's office number?",
      name: "officeNumber"
    }
  ])
// and to create objects for each team member (using the correct classes as blueprints!)
.then( response => {
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
    teamMembers.push(manager);
    idNumbers.push(response.id);
    addEmployee();
  });

}

// prompt to check what type of employee role user would like to add
function addEmployee(){
  inquirer
  .prompt([
    {
      type: "list",
      message: "What kind of team member would you like to add?",
      name: "role",
      choices: [
          "Engineer",
          "Intern",
          "I do not want to add any more team members"
      ]
    }
  ])
// and to create objects for each team member (using the correct classes as blueprints!)
.then( response => {
    switch(response.role) {
    case "Engineer":
        addEngineer();
        break;
    case "Intern":
        addIntern();
        break;
    case "I do not want to add any more team members":
        console.log(teamMembers);
        fs.writeFile("output.html", render(teamMembers), function(err){
            if (err) {
                return console.log(err);
              }            
        });
        break;
    }
  });
}


//function to build an engineer
function addEngineer(){
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your engineer's name?",
          name: "name"
        },
        {
          type: "input",
          message: "What is your engineer's id?",
          name: "id"
        //   validate: function (userIdNumber) {    
        //     if (typeof userIdNumber === number) {
        //       for (i = 0; i < idNumbers.length; i++){
        //         id !== idNumbers[i];
        //         return true;
        //       }
        //     } else {
        //         console.log("Please make sure your id is a number and has not been taken already.")
        //         return false;
        //     }
        // }
    
        },
        {
          type: "input",
          message: "What is your engineer's email?",
          name: "email",
          validate: function (email) {
  
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    
            if (valid) {
                return true;
            } else {
                console.log("  Please enter a valid email")
                return false;
            }
        }    
        },
        {
          type: "input",
          message: "What is your engineer's GitHub account?",
          name: "github"
        }
      ])
    // and to create objects for each team member (using the correct classes as blueprints!)
    .then( response => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        teamMembers.push(engineer);
        console.log("Engineer successfully added!")
        addEmployee();
      });
    
}

//function to build an intern
function addIntern(){
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id"
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "email",
        validate: function (email) {
  
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  
          if (valid) {
              return true;
          } else {
              console.log(".  Please enter a valid email")
              return false;
          }
      }
  
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "school"
      }
    ])
  // and to create objects for each team member (using the correct classes as blueprints!)
  .then( response => {
      const intern = new Intern(response.name, response.id, response.email, response.school);
      teamMembers.push(intern);
      console.log("Intern successfully added!");
      addEmployee();
    });

}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
